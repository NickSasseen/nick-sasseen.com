import React from "react";
import SearchCard from "../components/search-card";
import TMDBApi from "../api";
import TabResults from "./tab-results";
import { PagedResponse } from "../models/paged-response";

const SearchPage = async ({ searchParams }) => {
  const { q: query } = searchParams;

  const [movies, tv] = await Promise.all([
    await TMDBApi.Search.Movie(query),
    await TMDBApi.Search.Tv(query),
  ]);

  const results = [
    { value: "movie", title: "Movies", search: movies },
    { value: "tv", title: "TV Shows", search: tv },
  ];

  return (
    <>
      {/* type ahead search input */}

      {/* label */}

      <TabResults results={results} />
    </>
  );
};

export default SearchPage;
