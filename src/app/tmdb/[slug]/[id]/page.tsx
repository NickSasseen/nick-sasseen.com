import { redirect } from "next/navigation";
import React from "react";
import TMDBApi from "../../api";
import { Separator } from "@/components/ui/separator";
import { getRuntime } from "../../utils";
import { Button } from "@/components/ui/button";
import { PlaySquareIcon } from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Details = async ({ params: { slug, id } }) => {
  if (!["movie", "tv"].includes(slug)) {
    redirect("/not-found");
  }
  const isMovie = slug === "movie";
  const details = isMovie ? await TMDBApi.Movies.Details(parseInt(id)) : null;
  console.log(details);

  const {
    backdrop_path,
    belongs_to_collection: {
      id: collectionId,
      name: collectionName,
      poster_path: collectionPoster,
      backdrop_path: collectionBackdrop,
    },
    credits: { cast, crew },
    genres,
    poster_path,
    title,
    name,
    overview,
    release_date,
    runtime,
    tagline,
  } = details;
  const releaseYr = (release_date as string).split("-")[0];
  // console.log(cast);

  return (
    <main className="space-y-4">
      <section className="-mx-2">
        <Hero backdropPath={backdrop_path} posterPath={poster_path} />
      </section>

      <section className="sm:hidden space-y-3">
        <h2 className="flex justify-center p-2 font-bold text-xl">
          {title}
          <span className="font-light ml-1">({releaseYr})</span>
        </h2>

        <div className="flex flex-wrap justify-center">
          <span>{release_date}</span>
          <div className="w-px bg-white/50 mx-2" />
          <span>{getRuntime(runtime)}</span>
          <div className="w-px bg-white/50 mx-2" />
          <Link href={""} className="flex item-center">
            <PlaySquareIcon className="mr-2" size={20} />
            <span>Play trailer</span>
          </Link>

          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>

        <div className="space-y-2">
          <p className="font-light italic">{tagline}</p>
          <h2 className="font-bold text-xl">Overview</h2>
          <p>{overview}</p>
        </div>
      </section>

      <section>
        <div className="divider divider-start text-xl font-bold">
          Top Billed Cast
        </div>
        <Carousel>
          <CarouselContent>
            {cast
              .filter((c) => !!c.profile_path)
              .map((c) => (
                <CarouselItem key={c.id} className="basis-44">
                  <Card>
                    <CardContent className="relative p-0">
                      <img
                        className="round-lg"
                        src={TMDBApi.GetPosterImage(c.profile_path)}
                      />
                      <div className="absolute bottom-0 w-full px-2 pb-1 bg-white/80 text-slate-950 font-semibold">
                        <span>{c.name}</span>
                        <br />
                        <span className="font-light">{c.character}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>

      {collectionId && (
        <section>
          <div className="relative">
            <img src={TMDBApi.GetBackdropImage(collectionBackdrop)} />

            <div className="absolute flex flex-col justify-center top-0 w-full h-full bg-slate-900/80 p-4">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl">
                  Part of the {collectionName}
                </h2>
                <Button>View the collection</Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

const Hero = ({ backdropPath, posterPath }) => {
  return (
    <figure className="relative">
      <img
        className="w-full h-auto opacity-50"
        src={TMDBApi.GetBackdropImage(backdropPath)}
      />
      {/* all the other info */}
      <div className="flex absolute w-full top-0 right-0 bottom-0">
        <div className="flex basis-1/3 items-center p-2">
          <img
            className="rounded-lg"
            src={TMDBApi.GetPosterImage(posterPath)}
          />
        </div>
        <div className="flex-1"></div>
      </div>
    </figure>
  );
};

export default Details;
