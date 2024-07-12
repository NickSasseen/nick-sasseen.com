"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import z from "zod";
import TMDBApi from "../api";
import { PagedResponse } from "../models/paged-response";

type SearchCardProps = {
  term?: string;
  typeAhead?: boolean;
};

const SearchCard = ({ term, typeAhead }: SearchCardProps) => {
  const [searchTerm, setSearchTerm] = useState(term);
  const { toast } = useToast();
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast({
        variant: "destructive",
        title: "Forget something? A search term is required",
      });
      return;
    }
    router.push(`/tmdb/search?q=${searchTerm}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex">
          <Search className="mr-2" />
          Search
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              name="searchTerm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter something"
            />
            <Button type="submit">Search</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
