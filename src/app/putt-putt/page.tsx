"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, User } from "lucide-react";
import React, { useState } from "react";

const PuttPutt = () => {
  const [players, setPlayers] = useState<{ [name: string]: number }>({});
  const [newPlayerName, setNewPlayerName] = useState("");

  const addPlayer = () => {
    // add new player
    setPlayers((prev) => ({
      ...prev,
      [newPlayerName]: 0,
    }));
    // clear input
    setNewPlayerName("");
  };

  const minus = (key: string) => {
    setPlayers((prev) => ({
      ...prev,
      [key]: Math.max(players[key] - 1, 0),
    }));
  };
  const plus = (key: string) => {
    setPlayers((prev) => ({
      ...prev,
      [key]: players[key] + 1,
    }));
  };

  return (
    <>
      <div className="flex w-full items-center space-x-2 my-4">
        <Input
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder="Enter a name"
        />
        <Button className="flex space-x-2" size="sm" onClick={addPlayer}>
          <User />
          <span>Add Player</span>
        </Button>
      </div>

      <div className="grid grid-cols-2">
        {Object.keys(players).map((p) => (
          <div className="text-center m-4">
            <h2 className="uppercase text-2xl font-bold">{p}</h2>

            <div className="flex justify-center h-16 mb-2">
              <Button
                className="basis-1/2 m-1 h-full"
                onClick={() => minus(p)}
                disabled={players[p] === 0}
              >
                <Minus />
              </Button>

              <Button className="basis-1/2 m-1 h-full" onClick={() => plus(p)}>
                <Plus />
              </Button>
            </div>

            <h3 className="uppercase text-xl font-bold">Total: {players[p]}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default PuttPutt;
