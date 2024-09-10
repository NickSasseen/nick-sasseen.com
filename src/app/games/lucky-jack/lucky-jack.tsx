"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LOCAL_STORAGE } from "@/shared/local-storage";
import { BellIcon, CherryIcon, CitrusIcon, CloverIcon, CrownIcon, GrapeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Symbols = {
  King: "King",
  Seven: "Seven",
  Bell: "Bell",
  Clover: "Clover",
  Grapes: "Grapes",
  Cherries: "Cherries",
  Lemon: "Lemon",
};

type Jackpot = { symbol: any; ThreeCardJackpot: number; FourCardJackpot: number };

const Points: {
  [name: string]: Jackpot;
} = {
  [Symbols.King]: {
    symbol: <CrownIcon className="text-green-200" />,
    ThreeCardJackpot: 7000,
    FourCardJackpot: 10000,
  },
  [Symbols.Seven]: {
    symbol: <h1 className="text-2xl font-extrabold font-serif text-red-800">7</h1>,
    ThreeCardJackpot: 6000,
    FourCardJackpot: 8000,
  },
  [Symbols.Bell]: {
    symbol: <BellIcon className="text-yellow-500" />,
    ThreeCardJackpot: 5000,
    FourCardJackpot: 7000,
  },
  [Symbols.Clover]: {
    symbol: <CloverIcon className="text-green-700" />,
    ThreeCardJackpot: 4000,
    FourCardJackpot: 6000,
  },
  [Symbols.Grapes]: {
    symbol: <GrapeIcon className="text-red-400" />,
    ThreeCardJackpot: 3000,
    FourCardJackpot: 5000,
  },
  [Symbols.Cherries]: {
    symbol: <CherryIcon className="text-red-700" />,
    ThreeCardJackpot: 2000,
    FourCardJackpot: 4000,
  },
  [Symbols.Lemon]: {
    symbol: <CitrusIcon className="text-yellow-400" />,
    ThreeCardJackpot: 1000,
    FourCardJackpot: 3000,
  },
};

const DEFAULT_PLAYERS = {
  Nick: 0,
  Lindsy: 0,
};

function LuckyJack() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [players, setPlayers] = useState<{ [name: string]: number }>(DEFAULT_PLAYERS);

  useEffect(() => {
    const storage = localStorage.getItem(LOCAL_STORAGE.LuckyJack);
    setPlayers(!!storage ? JSON.parse(storage) : DEFAULT_PLAYERS);
  }, []);

  // anytime the scores change, update localStorage
  useEffect(() => {
    if (players !== DEFAULT_PLAYERS) {
      localStorage.setItem(LOCAL_STORAGE.LuckyJack, JSON.stringify(players));
    }
  }, [players]);

  const addPointsToCurrentPlayer = (pts: number) => {
    setPlayers((prev) => ({
      ...prev,
      [current]: players[current] + pts,
    }));
    setOpen(false);
  };

  const handleOpenChange = (open: boolean, name: string) => {
    setOpen(open);
    setCurrent(name);
  };

  const reset = (e: any) => {
    setPlayers(DEFAULT_PLAYERS);
  };

  return (
    <div className="flex flex-col flex-1 p-4 space-y-4">
      <div className="grid grid-cols-2 flex-1 items-start">
        {Object.keys(players).map((playerName) => (
          <AlertDialog
            key={playerName}
            open={open}
            onOpenChange={(open) => handleOpenChange(open, playerName)}
          >
            <AlertDialogTrigger>
              <Card className="m-4">
                <CardHeader>
                  <CardTitle>{playerName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h1 className="text-2xl font-mono">
                    {Number(players[playerName]).toLocaleString()}
                  </h1>
                </CardContent>
              </Card>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogTitle className="hidden"></AlertDialogTitle>
              <Table>
                <TableCaption>Choose a winning symbol</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Symbol</TableHead>
                    <TableHead className="text-center">3 Card Jackpot</TableHead>
                    <TableHead className="text-center">4 Card Jackpot</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {Object.keys(Points).map((p) => {
                    return (
                      <TableRow key={p}>
                        <TableCell className="flex items-center justify-center">
                          {Points[p].symbol}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            onClick={() => addPointsToCurrentPlayer(Points[p].ThreeCardJackpot)}
                          >
                            {Points[p].ThreeCardJackpot}
                          </Button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="outline"
                            onClick={() => addPointsToCurrentPlayer(Points[p].FourCardJackpot)}
                          >
                            {Points[p].FourCardJackpot}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <AlertDialogDescription></AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Reset</Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="flex items-center">
          <span className="flex-1">Are you sure?</span>
          <div className="space-x-4">
            <AlertDialogAction onClick={reset}>Yes</AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default LuckyJack;
