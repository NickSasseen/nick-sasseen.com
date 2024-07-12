import React from "react";
import SearchCard from "../components/search-card";

const SearchPage = ({ searchParams }) => {
  const { q: query } = searchParams;

  return (
    <>
      <SearchCard term={query} typeAhead />
    </>
  );
};

export default SearchPage;
