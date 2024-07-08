import { redirect } from "next/navigation";
import React from "react";
import TMDBApi from "../../api";
import { Separator } from "@/components/ui/separator";
import { getRuntime } from "../../utils";
import { Button } from "@/components/ui/button";
import { PlaySquareIcon } from "lucide-react";

const Details = async ({ params: { slug, id } }) => {
  if (!["movie", "tv"].includes(slug)) {
    redirect("/not-found");
  }
  const isMovie = slug === "movie";
  const details = isMovie ? await TMDBApi.Movies.Details(parseInt(id)) : null;

  console.log(details);

  const {
    backdrop_path,
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

  return (
    <>
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
          <Button variant="ghost" size="sm">
            <PlaySquareIcon className="mr-2 h-4 w-4" /> Play trailer
          </Button>

          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>

        <div className="space-y-2">
          <p className="font-light italic">{tagline}</p>
          <h2 className="font-bold text-xl">Overview</h2>
          <p>{overview}</p>
        </div>
      </section>
      <div>
        Details
        <p>slug: {slug}</p>
        <p>id: {id}</p>
        <p>isMovie: {isMovie ? "true" : "false"}</p>
      </div>
    </>
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
