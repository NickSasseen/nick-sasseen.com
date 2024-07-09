import React from "react";
import TMDBApi from "./api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Search, Star, TrendingUp } from "lucide-react";
import { log } from "console";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";

const TMDB = async () => {
  const trending = await TMDBApi.Trending.All();
  const popular = await TMDBApi.MovieLists.Popular();
  const [topOne, ...theRest] = popular.results;

  // server actions
  async function search(formData: FormData) {
    "use server";
    // get form value
    const searchTerm = formData.get("searchTerm");
    if (searchTerm) {
      // navigate to search page
      redirect(`tmdb/search?q=${searchTerm}`);
    }
  }

  return (
    <div className="space-y-2">
      <section className="flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>{topOne.title}</CardTitle>
            <CardDescription className="line-clamp-2 sm:line-clamp-3">
              {topOne.overview}
            </CardDescription>
            <CardContent className="p-0">
              <img
                className="rounded-lg"
                src={TMDBApi.GetBackdropImage(topOne.backdrop_path)}
                alt={topOne.title}
              />
            </CardContent>

            <CardFooter className="justify-end p-0 pt-4">
              <Button asChild>
                <Link href={`/tmdb/movie/${topOne.id}`}>See more</Link>
              </Button>
            </CardFooter>
          </CardHeader>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex">
              <Search className="mr-2" />
              Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={search}>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  name="searchTerm"
                  placeholder="Enter something"
                />
                <Button type="submit">Search</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>

      <section>
        <CarouselCard
          title="Trending"
          icon={<TrendingUp className="mr-2" />}
          pagedResults={trending}
        />
      </section>
      <section>
        <CarouselCard
          title="Popular"
          icon={<Star className="mr-2" />}
          pagedResults={popular}
        />
      </section>
    </div>
  );
};

const CarouselCard = ({ title, icon, pagedResults }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <DaisyCarousel>
          {pagedResults.results.map((item) => (
            <DaisyCarouselItem className="basis-36 sm:basis-56">
              <Link href={`/tmdb/${item.title ? "movie" : "tv"}/${item.id}`}>
                <Card>
                  <CardContent className="p-0">
                    <img
                      className="rounded-t-lg"
                      src={TMDBApi.GetPosterImage(item.poster_path)}
                      alt={item.title ?? item.name}
                    />
                  </CardContent>
                  <CardFooter className="p-2">
                    {item.title ?? item.name}
                  </CardFooter>
                </Card>
              </Link>
            </DaisyCarouselItem>
          ))}
        </DaisyCarousel>
      </CardContent>
    </Card>
  );
};

export default TMDB;
