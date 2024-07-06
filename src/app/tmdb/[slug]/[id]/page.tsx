import { redirect } from "next/navigation";
import React from "react";

const Details = ({ params: { slug, id } }) => {
  if (!["movie", "tv"].includes(slug)) {
    redirect("/not-found");
  }
  const isMovie = slug === "movie";

  return (
    <div>
      Details
      <p>slug: {slug}</p>
      <p>id: {id}</p>
      <p>isMovie: {isMovie ? "true" : "false"}</p>
    </div>
  );
};

export default Details;
