"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, User } from "lucide-react";
import React, { useEffect, useState } from "react";

enum LocalStorageOptions {
  Players = "players",
}

enum Actions {
  AddPlayer,
  Minus,
  Plus,
  Reset,
}

const PuttPutt = () => {
  const [players, setPlayers] = useState<{ [name: string]: number }>({});
  const [newPlayerName, setNewPlayerName] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem(LocalStorageOptions.Players);
    if (storage) {
      setPlayers(JSON.parse(storage));
    }
  }, []);

  const handleStateChange = (action: Actions, key?: string) => {
    setPlayers((previousPlayers) => {
      let newValue: { [name: string]: number } = previousPlayers;

      switch (action) {
        case Actions.AddPlayer:
          if (newPlayerName) {
            // add new player
            newValue = {
              ...previousPlayers,
              [newPlayerName]: 0,
            };
            // clear input
            setNewPlayerName("");
          }
          break;

        case Actions.Minus:
          if (key) {
            newValue = {
              ...previousPlayers,
              [key]: Math.max(players[key] - 1, 0),
            };
          }
          break;

        case Actions.Plus:
          if (key) {
            newValue = {
              ...previousPlayers,
              [key]: players[key] + 1,
            };
          }
          break;

        case Actions.Reset:
          newValue = {};
          break;

        default:
          break;
      }

      action === Actions.Reset && localStorage.removeItem(LocalStorageOptions.Players);
      action !== Actions.Reset &&
        localStorage.setItem(LocalStorageOptions.Players, JSON.stringify(newValue));

      return newValue;
    });
  };

  return (
    <div className="flex flex-col justify-between min-h-svh">
      <div>
        <form
          className="flex w-full items-center space-x-2 px-2 my-4"
          onSubmit={(e) => {
            e.preventDefault();
            setNewPlayerName(e.currentTarget.value);
          }}
        >
          <Input
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter a name"
          />
          <Button
            className="flex space-x-2"
            size="sm"
            onClick={() => handleStateChange(Actions.AddPlayer)}
          >
            <User />
            <span>Add Player</span>
          </Button>
        </form>

        <div className="grid grid-cols-2">
          {Object.keys(players).map((p, i) => (
            <div key={i} className="text-center m-4">
              <h2 className="uppercase text-2xl font-bold">{p}</h2>

              <div className="flex justify-center h-16 mb-2">
                <Button
                  className="basis-1/2 m-1 h-full"
                  onClick={() => handleStateChange(Actions.Minus, p)}
                  disabled={players[p] === 0}
                >
                  <Minus />
                </Button>

                <Button
                  className="basis-1/2 m-1 h-full"
                  onClick={() => handleStateChange(Actions.Plus, p)}
                >
                  <Plus />
                </Button>
              </div>

              <h3 className="uppercase text-xl font-bold">Total: {players[p]}</h3>
            </div>
          ))}
        </div>
      </div>

      <Button variant="destructive" onClick={() => handleStateChange(Actions.Reset)}>
        Reset
      </Button>
    </div>
  );
};

export default PuttPutt;
