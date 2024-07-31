import { redirect } from "next/navigation";
import React from "react";
import TMDBApi from "../../api";
import { getRuntime } from "../../utils";
import { Button } from "@/components/ui/button";
import { Film, LibrarySquare, LightbulbIcon, Text, Tv, UsersIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";
import InfoCard from "../../components/info-card";
import Link from "next/link";
import { Dialog, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import CollectionDialogButton from "../../components/collection-dialog-button";
import { Metadata, ResolvingMetadata } from "next";
import CastMemberDialogCard from "../../components/cast-member-dialog-card";

export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const { slug, id } = params;

  // fetch data
  const item =
    slug === "movie"
      ? await TMDBApi.Movies.Details(parseInt(id))
      : await TMDBApi.TvSeries.Details(parseInt(id));
  const title = item.name ?? item.title;

  return {
    title,
  };
}

const Details = async ({ params: { slug, id } }) => {
  // build out type specific things
  let details: any;
  let isMovie: boolean = false;
  let isTvSeries: boolean = false;
  let castTitle: string;
  switch (slug) {
    case "movie":
      details = await TMDBApi.Movies.Details(parseInt(id));
      isMovie = true;
      castTitle = "Top Billed Cast";
      break;

    case "tv":
      details = await TMDBApi.TvSeries.Details(parseInt(id));
      isTvSeries = true;
      castTitle = "Series Cast";
      break;

    default:
      redirect("/not-found");
  }

  const {
    // common
    backdrop_path,
    belongs_to_collection,
    credits: { cast, crew } = { cast: [], crew: [] },
    genres = [],
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
  console.log(cast);

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
            <div className="flex w-full items-start justify-between">
              <p className="font-bold text-xl">
                {title ?? name}
                {(isMovie || isTvSeries) && (
                  <span className="font-light ml-1">({releaseYr ?? firstAirYr})</span>
                )}
              </p>

              <span className="text-base shrink-0">
                {isMovie && getRuntime(runtime)}
                {isTvSeries && `${number_of_seasons} seasons`}
              </span>
            </div>
          }
          icon={isMovie ? <Film /> : isTvSeries ? <Tv /> : <LibrarySquare />}
        >
          <div className="flex flex-wrap">
            {genres.map((genre) => (
              <div key={genre.id} className="flex-1 p-1">
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
                  <CastMemberDialogCard id={c.id} name={c.name} character={c.character} />
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
              src={TMDBApi.GetBackdropImage(belongs_to_collection.backdrop_path)}
            />

            <div className="absolute flex flex-col justify-center top-0 w-full h-full bg-slate-900/80 p-4 rounded-lg">
              <div className="space-y-2">
                <h2 className="font-bold text-2xl">Part of the {belongs_to_collection.name}</h2>
                <CollectionDialogButton collectionId={belongs_to_collection.id} />
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
      <img className="w-full h-auto opacity-50" src={backdropPath} />
      {/* all the other info */}
      <div className="flex absolute w-full top-0 right-0 bottom-0">
        <div className="flex basis-1/3 items-center p-2">
          <img className="rounded-lg" src={posterPath} />
        </div>
        <div className="flex-1"></div>
      </div>
    </figure>
  );
};

const CarouselCard = ({ title, icon, pagedResults }) => {
  return (
    <InfoCard title={title} icon={icon}>
      <DaisyCarousel>
        {pagedResults.results.map((item) => (
          <DaisyCarouselItem key={item.id} className="basis-36 sm:basis-6">
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

export default Details;
