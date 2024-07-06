import React from "react";
import TMDBApi from "./api";

const TMDB = async () => {
  const popular = await TMDBApi.BothPopular();
  console.log("popular", popular);

  const [movies, tv] = popular;
  const [topOne, ...theRest] = movies.results;
  return (
    <div className="space-y-4">
      <section className="flex items-center justify-center">
        <div className="card bg-base-100 image-full max-w-full sm:max-w-5xl shadow-xl">
          <figure>
            <img
              src={TMDBApi.GetBackdropImage(topOne.backdrop_path)}
              alt={topOne.title}
            />
          </figure>

          <div className="card-body justify-end">
            <h2 className="card-title">{topOne.title}</h2>
            <p className="flex-grow-0 line-clamp-2 sm:line-clamp-3">
              {topOne.overview}
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">See more</button>
            </div>
          </div>
        </div>
      </section>

      <div>Search</div>
      <div>Trending</div>
      <div>Popular</div>
    </div>
  );
};

export default TMDB;
