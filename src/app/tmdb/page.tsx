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

const TMDB = async () => {
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
              <Button>See more</Button>
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
        <Trending />
      </section>
      <section>
        <Popular />
      </section>
    </div>
  );
};

const Trending = async () => {
  const trending = await TMDBApi.Trending.All();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <TrendingUp className="mr-2" />
          Trending
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Carousel>
          <CarouselContent>
            {trending.results.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

const Popular = async () => {
  const x = await TMDBApi.BothPopular();
  // combine them
  console.log(x);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <Star className="mr-2" />
          Popular
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <Carousel>
          <CarouselContent>
            {x.map((item) => (
              <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3">
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
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default TMDB;
