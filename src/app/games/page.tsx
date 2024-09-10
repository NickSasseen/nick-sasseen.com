"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CrownIcon,
  CloverIcon,
  BellIcon,
  GrapeIcon,
  CherryIcon,
  CitrusIcon,
  LandPlotIcon,
  TrophyIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import LuckyJack from "./lucky-jack/lucky-jack";
import PuttPutt from "./putt-putt/putt-putt";

const gameOptions = [
  {
    value: "lucky-jack",
    header: (
      <div className="flex items-center justify-center space-x-2">
        <CrownIcon className="text-green-200" />
        <CloverIcon className="text-green-800" />
        <BellIcon className="text-yellow-500" />
        <h1 className="text-2xl font-bold">Lucky Jack</h1>
        <GrapeIcon className="text-red-400" />
        <CherryIcon className="text-red-800" />
        <CitrusIcon className="text-yellow-300" />
      </div>
    ),
  },
  {
    value: "putt-putt",
    header: (
      <div className="flex items-center justify-center space-x-2">
        <LandPlotIcon />
        <h1 className="text-2xl font-bold">Putt putt</h1>
        <TrophyIcon className="text-yellow-500" />
      </div>
    ),
  },
];

function Games() {
  const [game, setGame] = useState<string>();

  return (
    <div className="flex flex-col w-full min-h-svh p-2">
      <Select value={game} onValueChange={(e) => setGame(e)}>
        <SelectTrigger className="">
          <SelectValue placeholder="Choose a game..." />
        </SelectTrigger>

        <SelectContent>
          {gameOptions.map((g) => (
            <SelectItem key={g.value} value={g.value}>
              {g.header}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator className="my-4"></Separator>

      <div className="flex-1">
        {game === "lucky-jack" && <LuckyJack></LuckyJack>}
        {game === "putt-putt" && <PuttPutt></PuttPutt>}
      </div>
    </div>
  );
}

export default Games;
