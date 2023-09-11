"use client";

import React, { useCallback, useEffect } from "react";
import Guests from "../shared/icons/guests";
import Money from "../shared/icons/money";
import { Barbecue, Guest } from "@prisma/client";
import { useAddGuestsModal } from "@/components/guests/add-guests-modal";
import { Button } from "@mui/material";

export default function Card({
  barbecue,
  guests,
}: {
  barbecue: Barbecue;
  guests: Guest[];
}) {
  const [guestsState, setGuests] = React.useState<Partial<Guest[]>>(
    sortGuests(guests),
  );
  const { AddGuestsModal, setShowAddGuestsModal } = useAddGuestsModal();
  const dateFormated = new Date(barbecue.date).toLocaleDateString("pt-BR");

  function sortGuests(guests: Guest[]) {
    return guests.sort((a: Guest, b: Guest) => a.name.localeCompare(b.name));
  }

  async function changeGuestPayment(
    guestId: string | undefined,
    payment: boolean,
  ) {
    const index = guestsState?.findIndex((guest) => guest?.id === guestId);
    const newState = [...guestsState];
    newState[index] = { ...newState[index], payment } as Guest;
    setGuests(newState);

    try {
      const newGuests = await fetch("/[barbecueId]/guests/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barbecueId: barbecue.id,
          guestId,
          payment,
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (newGuests.bbqGuests.length === guestsState.length)
        setGuests(sortGuests(newGuests.bbqGuests));
    } catch (err) {
      console.log(err);
    }
  }

  const getGuests = useCallback(async () => {
    const guests = await fetch(`/[barbecueId]/guests/api?id=${barbecue.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    setGuests(sortGuests(guests.bbqGuests));
  }, [barbecue.id]);

  const totalPay = useCallback(() => {
    const guestsPrice = guestsState?.reduce((acc, guest) => {
      if (guest?.payment) return acc + guest?.price;
      return acc;
    }, 0);
    return guestsPrice;
  }, [guestsState]);

  return (
    <div className="relative col-span-1 mb-10 overflow-hidden bg-white shadow-md">
      <div className="flex">
        <AddGuestsModal barbecueId={barbecue.id} callback={getGuests} />
        <div className="mx-auto max-w-md p-10 text-center">
          <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-left font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
            <p className="text-bold font-bold tracking-[-0.02em]">
              {dateFormated}
            </p>
            <p className="mt-3 font-bold font-semibold tracking-[-0.02em]">
              {barbecue.name}
            </p>
          </h2>
        </div>
        <div className="mx-auto mt-5 max-w-md p-10">
          <h2 className="flex-end justify-between">
            <div className="flex">
              <Guests />
              <p className="font-size ml-3  -translate-y-1 text-left text-xl">
                {guests.length}
              </p>
            </div>
            <div className="flex">
              <Money />
              <p className="ml-3 -translate-y-1 text-left text-xl">{`R$ ${totalPay()}`}</p>
            </div>
          </h2>
        </div>
      </div>
      <div className="grid divide-y divide-[#E5C231] p-10">
        <Button
          onClick={() => setShowAddGuestsModal(true)}
          variant="contained"
          type="button"
          style={{
            color: "white",
            backgroundColor: "#998220",
            marginTop: 10,
          }}
        >
          Adicionar convidado
        </Button>
      </div>

      <div className="grid divide-y divide-[#E5C231] pb-10 pl-10 pr-10">
        {guestsState?.map((guest) => {
          return (
            <div key={guest?.id}>
              <input
                style={{
                  backgroundImage: "none",
                  borderColor: "#998220",
                  color: "#FFD836",
                }}
                checked={guest?.payment}
                id={guest?.id}
                type="radio"
                className="cursor-pointer"
                onClick={(e) => changeGuestPayment(guest?.id, !guest?.payment)}
              />
              <span
                className="ml-4 animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:leading-[2rem]"
                style={{
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
              >
                {guest?.name}
              </span>
              <span
                className={`flex-end float-right ml-4 animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-bold tracking-[-0.02em]  opacity-0 drop-shadow-sm md:leading-[2rem] ${
                  guest?.payment && "line-through"
                }`}
                style={{
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
              >
                {`R$ ${guest?.price}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
