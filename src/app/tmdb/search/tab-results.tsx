"use client";

import React from "react";
import { PagedResponse } from "../models/paged-response";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type TabResultsProps = {
  results: { value: string; title: string; search: PagedResponse<any> }[];
};

const TabResults = ({ results }: TabResultsProps) => {
  return (
    <Tabs className="w-full" defaultValue={results[0].value}>
      <TabsList className={`flex flex-nowrap w-full justify-start overflow-scroll mb-4`}>
        {results.map((result, index) => (
          <TabsTrigger key={index} value={result.value} className="basis-40 shrink-0 space-x-4">
            <span>{result.title}</span>
            <Badge className="border-slate-100" variant="outline">
              {result.search.total_results}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>

      {results.map((result, index) => (
        <TabsContent key={index} value={result.value} className="space-y-4">
          {result.search.results.map((item) => {
            switch (result.value) {
              case "movie":
              case "tv":
                return (
                  <Link
                    href={`/tmdb/${result.value}/${item.id}`}
                    key={item.id}
                    className="flex border rounded-lg"
                  >
                    <div className="basis-1/4">
                      <img className="rounded-l-lg" src={item.poster_path} />
                    </div>

                    <div className="flex-1 flex flex-col justify-between p-4">
                      <div className="flex space-x-2 items-center">
                        <h2 className="font-bold">{item.title ?? item.name}</h2>

                        <span className="font-light text-sm">
                          ({(item.release_date ?? item.first_air_date).split("-")[0]})
                        </span>
                      </div>

                      <p className="text-sm line-clamp-3">{item.overview}</p>
                    </div>
                  </Link>
                );

              default:
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
