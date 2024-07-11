import { redirect } from "next/navigation";
import React from "react";
import TMDBApi from "../../api";
import { getRuntime } from "../../utils";
import { Button } from "@/components/ui/button";
import { Film, LightbulbIcon, Text, Tv, UsersIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";
import { CarouselCard } from "../../page";
import InfoCard from "../../components/info-card";

const Details = async ({ params: { slug, id } }) => {
  // build out type specific things
  let details: any;
  let isMovie: boolean;
  let isTvSeries: boolean;
  let castTitle: string;
  switch (slug) {
    case "movie":
      details = await TMDBApi.Movies.Details(parseInt(id));
      isMovie = true;
      isTvSeries = false;
      castTitle = "Top Billed Cast";
      break;

    case "tv":
      details = await TMDBApi.TvSeries.Details(parseInt(id));
      isMovie = false;
      isTvSeries = true;
      castTitle = "Series Cast";
      break;

    default:
      redirect("/not-found");
  }

  console.log(details);

  const {
    // common
    backdrop_path,
    belongs_to_collection,
    credits: { cast, crew },
    genres,
    poster_path,
    title,
    overview,
    recommendations,
    runtime,
    tagline,
    // movie
    release_date,
    // tv
    name,
    first_air_date,
    number_of_seasons,
  } = details;

  const releaseYr = (release_date as string)?.split("-")[0];
  const firstAirYr = (first_air_date as string)?.split("-")[0];

  return (
    <main className="space-y-4">
      <section className="-mx-2">
        <Hero backdropPath={backdrop_path} posterPath={poster_path} />
      </section>

      <section className="sm:hidden">
        <InfoCard
          title={
            <div className="flex w-full items-center justify-between">
              <h2 className="font-bold text-xl">
                {title ?? name}
                <span className="font-light ml-1">
                  ({releaseYr ?? firstAirYr})
                </span>
              </h2>

              <span className="text-base">
                {isMovie ? getRuntime(runtime) : `${number_of_seasons} seasons`}
              </span>
            </div>
          }
          icon={isMovie ? <Film /> : <Tv />}
        >
          <div className="flex flex-wrap">
            {genres.map((genre) => (
              <div className="flex-1 p-1">
                <Button variant="outline" size="sm" className="w-full">
                  {genre.name}
                </Button>
              </div>
            ))}
          </div>
        </InfoCard>
      </section>

      <section className="sm:hidden">
        <InfoCard title="Overview" icon={<Text />}>
          <div className="space-y-2">
            <p className="font-light italic">{tagline}</p>
            <p>{overview}</p>
          </div>
        </InfoCard>
      </section>

      <section>
        <InfoCard title={castTitle} icon={<UsersIcon />}>
          <DaisyCarousel>
            {cast
              .filter((c) => !!c.profile_path)
              .map((c) => (
                <DaisyCarouselItem key={c.id} className="basis-44">
                  <Card>
                    <CardContent className="relative p-0">
                      <img
                        className="rounded-lg"
                        src={TMDBApi.GetPosterImage(c.profile_path)}
                      />
                      <div className="absolute flex flex-wrap bottom-0 w-full px-2 pb-1 bg-gray-700/90 font-semibold rounded-b-lg">
                        <span className="basis-full">{c.name}</span>
                        <span className="font-light text-xs">
                          {c.character}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </DaisyCarouselItem>
              ))}
          </DaisyCarousel>
        </InfoCard>
      </section>

      {belongs_to_collection && (
        <section>
          <div className="relative">
            <img
              className="rounded-lg"
              src={TMDBApi.GetBackdropImage(
                belongs_to_collection.backdrop_path
              )}
            />

            <div className="absolute flex flex-col justify-center top-0 w-full h-full bg-slate-900/80 p-4 rounded-lg">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl">
                  Part of the {belongs_to_collection.name}
                </h2>
                <Button>View the collection</Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {recommendations && (
        <section>
          <CarouselCard
            title="Recommendations"
            icon={<LightbulbIcon className="mr-2" />}
            pagedResults={recommendations}
          />
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
