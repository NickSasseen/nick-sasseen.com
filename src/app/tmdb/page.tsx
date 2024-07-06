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

const TMDB = async () => {
  const popular = await TMDBApi.BothPopular();
  console.log("popular", popular);

  const [movies, tv] = popular;
  const [topOne, ...theRest] = movies.results;

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
            <CardTitle>Search</CardTitle>
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
      <div>Trending</div>
      <div>Popular</div>
    </div>
  );
};

export default TMDB;
