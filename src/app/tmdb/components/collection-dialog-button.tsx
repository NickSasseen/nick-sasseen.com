"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Film, LibrarySquare, Text } from "lucide-react";
import TMDBApi from "../api";
import useCollection from "../hooks/useCollection";
import InfoCard from "./info-card";
import { DaisyCarousel, DaisyCarouselItem } from "@/components/daisy/carousel";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const CollectionDialogButton = ({ collectionId }) => {
  const { loading, collection } = useCollection(collectionId);

  if (loading) return;
  console.log(collection);

  const { name, backdrop_path, poster_path, overview, parts } = collection;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View collection</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-full overflow-scroll rounded-lg bg-slate-950">
        <DialogTitle className="flex items-center">
          <LibrarySquare className="mr-2" />
          {name}
        </DialogTitle>

        <figure className="relative">
          <img className="w-full h-auto opacity-50" src={backdrop_path} />
          {/* all the other info */}
          <div className="flex absolute w-full top-0 right-0 bottom-0">
            <div className="flex basis-1/3 items-center p-2">
              <img className="rounded-lg" src={poster_path} />
            </div>
            <div className="flex-1"></div>
          </div>
        </figure>

        <InfoCard title="Overview" icon={<Text />}>
          {overview}
        </InfoCard>

        <InfoCard title="Movies" icon={<Film />}>
          <DaisyCarousel>
            {parts.map((p) => (
              <DaisyCarouselItem key={p.id} className="basis-36 sm:basis-56">
                <Link href={`/tmdb/${p.title ? "movie" : "tv"}/${p.id}`}>
                  <Card className="rounded-lg">
                    <CardContent className="p-0">
                      <img
                        className="rounded-lg"
                        src={TMDBApi.GetPosterImage(p.poster_path)}
                        alt={p.title ?? p.name}
                      />
                    </CardContent>
                  </Card>
                </Link>
              </DaisyCarouselItem>
            ))}
          </DaisyCarousel>
        </InfoCard>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CollectionDialogButton;
