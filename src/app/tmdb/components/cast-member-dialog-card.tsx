"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Clapperboard, Popcorn, Text, TvMinimal, UserSquare } from "lucide-react";
import InfoCard from "./info-card";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import usePerson from "../hooks/usePerson";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import TMDBApi from "../api";

const CastMemberDialogCard = ({ id, name, character }) => {
  const { loading, person } = usePerson(id);
  const [showAll, setShowAll] = useState(false);

  if (loading || !person) return;

  const {
    biography,
    profile_path,
    movie_credits: { cast: movies },
    tv_credits: { cast: tv_shows },
  } = person;
  console.log(person);

  let personalInfo = [
    { title: "Known For", value: person.known_for_department },
    {
      title: "Known Credits",
      value: person.movie_credits?.cast?.length + person.tv_credits?.cast?.length,
    },
    {
      title: "Place of Birth",
      value: person.place_of_birth,
    },
  ];
  if (person.birthday) {
    personalInfo.push({
      title: "Birthday",
      value: new Date(person.birthday).toLocaleDateString(),
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card>
          <CardContent className="relative p-0">
            <img className="rounded-lg" src={profile_path} />
            <div className="absolute flex flex-wrap bottom-0 w-full px-2 pb-1 bg-gray-700/90 font-semibold rounded-b-lg">
              <span className="basis-full">{name}</span>
              <span className="font-light text-xs">{character}</span>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-full overflow-scroll rounded-lg bg-slate-950">
        <DialogTitle className="flex items-center">
          <UserSquare className="mr-2" />
          {name}
        </DialogTitle>

        <div className="flex justify-center">
          <div className="basis-1/3">
            <img className="rounded-lg" src={profile_path} />
          </div>

          <div className="flex-1 space-y-2 px-3">
            <h3 className="text-lg font-bold">Personal Info</h3>

            <div className="flex flex-wrap">
              {personalInfo.map((group) => (
                <div className="basis-1/2 pb-2" key={group.title + group.value}>
                  <p className="font-semibold text-sm">{group.title}</p>
                  <p className="text-xs">{group.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <InfoCard title="Biography" icon={<Text />}>
          <div className="space-y-2">
            <span className={!showAll ? "line-clamp-6" : ""}>{biography}</span>
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setShowAll(!showAll)}>
                {showAll ? "See less" : "See more"}
              </Button>
            </div>
          </div>
        </InfoCard>

        {(movies || tv_shows) && (
          <div className="max-w-sm">
            <InfoCard title="Credits" icon={<Clapperboard />}>
              <Tabs defaultValue="movies" className="w-full">
                <TabsList className="w-full">
                  {movies && (
                    <TabsTrigger className="flex-1 space-x-2" value="movies">
                      <span>Movies</span>
                      <Popcorn className="w-4" />
                      <Badge variant="outline">{movies.length}</Badge>
                    </TabsTrigger>
                  )}
                  {tv_shows && (
                    <TabsTrigger className="flex-1 space-x-2" value="tv">
                      <span>TV Shows</span>
                      <TvMinimal className="w-4" />
                      <Badge variant="outline">{tv_shows.length}</Badge>
                    </TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="movies">
                  <CarouselCard results={movies} />
                </TabsContent>
                <TabsContent value="tv">
                  <CarouselCard results={tv_shows} />
                </TabsContent>
              </Tabs>
            </InfoCard>
          </div>
        )}
        {/* 
        <InfoCard title="Movies" icon={<Film />}>
          <DaisyCarousel>
            {parts.map((p) => (
              <DaisyCarouselItem key={p.id} className="basis-36 sm:basis-56">
                <Link href={`/tmdb/${p.title ? "movie" : "tv"}/${p.id}`}>
                  <Card className="rounded-lg">
                    <CardContent className="p-0">
                      <img
                        className="rounded-lg"
                        src={TMDBApi.GetPosterImage(p.poster_path)}
                        alt={p.title ?? p.name}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </DaisyCarouselItem>
            ))}
          </DaisyCarousel>
        </InfoCard> */}

        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CarouselCard = ({ results }) => {
  return (
    <DaisyCarousel>
      {results.map((item) => (
        <DaisyCarouselItem key={item.id} className="basis-32 sm:basis-6">
          <Link href={`/tmdb/${item.title ? "movie" : "tv"}/${item.id}`}>
            <Card className="rounded-lg">
              <CardContent className="p-0">
                <img
                  className="rounded-lg"
                  src={TMDBApi.GetPosterImage(item.poster_path)}
                  alt={item.title ?? item.name}
                />
              </CardContent>
            </Card>
          </Link>
        </DaisyCarouselItem>
      ))}
    </DaisyCarousel>
  );
};

export default CastMemberDialogCard;
