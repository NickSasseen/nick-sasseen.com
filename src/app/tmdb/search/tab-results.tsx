"use client";

import React from "react";
import { PagedResponse } from "../models/paged-response";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type TabResultsProps = {
  results: { value: string; title: string; search: PagedResponse<any> }[];
};

const TabResults = ({ results }: TabResultsProps) => {
  return (
    <Tabs className="w-full" defaultValue={results[0].value}>
      <TabsList
        className={`flex flex-nowrap w-full justify-start overflow-scroll`}
      >
        {results.map((result, index) => (
          <TabsTrigger
            key={index}
            value={result.value}
            className="basis-40 shrink-0 space-x-4"
          >
            <span>{result.title}</span>
            <Badge className="border-slate-100" variant="outline">
              {result.search.total_results}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      {results.map((result, index) => (
        <TabsContent
          key={index}
          value={result.value}
          className="grid grid-cols-1 space-y-4 p-4"
        >
          {result.search.results.map((item) => {
            if (result.value === "movies") {
              return (
                <div key={item.id} className="border rounded-lg">
                  {item.title}
                </div>
              );
            } else {
              return (
                <div key={item.id} className="border rounded-lg">
                  {item.name}
                </div>
              );
            }
          })}
        </TabsContent>
      ))}
    </Tabs>
  );
};

const SwitchCard = ({ type, item }) => {
  switch (type) {
    case "Movies":
      return <MovieCard movie={item} />;

    default:
      break;
  }
};

const MovieCard = ({ movie }) => (
  <>
    <div className="flex border text-lg">{movie.title}</div>
  </>
);

export default TabResults;
