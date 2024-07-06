import React from "react";

const SearchPage = ({ searchParams }) => {
  console.log(searchParams);
  const { q: query } = searchParams;

  return (
    <div>
      Search page
      <p>searchTerm: {query}</p>
    </div>
  );
};

export default SearchPage;
