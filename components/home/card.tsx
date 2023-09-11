"use client";

import React, { useCallback } from "react";
import Guests from "../shared/icons/guests";
import Money from "../shared/icons/money";
import Link from "next/link";
import { Barbecue, Guest } from "@prisma/client";

export default function Card({
  barbecue,
  guests,
}: {
  barbecue: Barbecue;
  guests: Guest[];
}) {
  const dateFormated = new Date(barbecue.date).toLocaleDateString("pt-BR");

  const totalPay = useCallback(() => {
    const guestsPrice = guests?.reduce((acc, guest) => {
      if (guest?.payment) return acc + guest?.price;
      return acc;
    }, 0);
    return guestsPrice;
  }, [guests]);

  return (
    <Link href={`${barbecue.id}/guests`}>
      <div
        className={`relative col-span-1 mb-10  cursor-pointer 
      overflow-hidden bg-white shadow-md hover:shadow-lg`}
      >
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
        <div className="mx-auto max-w-md p-10">
          <h2 className="flex-end flex justify-between">
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
    </Link>
  );
}
