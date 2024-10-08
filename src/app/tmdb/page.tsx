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
import { redirect } from "next/navigation";
import { Search, Skull, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";
import InfoCard from "./components/info-card";
import SearchCard from "./components/search-card";

const TMDB = async () => {
  const trending = await TMDBApi.Trending.All();
  const popular = await TMDBApi.MovieLists.Popular();
  const horrorMovies = await TMDBApi.Discover.Movie({ with_genres: "27" });
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
              <img className="rounded-lg" src={topOne.backdrop_path} alt={topOne.title} />
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
        <SearchCard />
      </section>

      {[
        { title: "Trending", icon: <TrendingUp />, data: trending },
        { title: "Popular", icon: <Star />, data: popular },
        {
          title: <span className="text-red-800">Horror</span>,
          icon: <Skull className="text-red-800" />,
          data: horrorMovies,
        },
      ].map(({ title, icon, data }, index) => (
        <section key={index}>
          <CarouselCard title={title} icon={icon} pagedResults={data} />
        </section>
      ))}
    </div>
  );
};

const CarouselCard = ({ title, icon, pagedResults }) => {
  return (
    <InfoCard title={title} icon={icon}>
      <DaisyCarousel>
        {pagedResults.results.map((item) => (
          <DaisyCarouselItem key={item.id} className="basis-36 sm:basis-56">
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
    </InfoCard>
  );
};

export default TMDB;
