"use client";

import React, { useCallback, useEffect } from "react";
import Churras from "../shared/icons/churras";
import { useAddBbqModal } from "@/components/home/add-bbq-modal";
import { useSignInModal } from "../layout/sign-in-modal";
import { useSession } from "next-auth/react";

export default function CardAddBbq() {
  const { AddBbqModal, setShowAddBbqModal } = useAddBbqModal();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log(status);
      setShowSignInModal(true);
    }
  }, [status, setShowSignInModal]);

  const handleOpenModal = useCallback(() => {
    if (status !== "unauthenticated") setShowAddBbqModal(true);
    else setShowSignInModal(true);
  }, [setShowAddBbqModal, setShowSignInModal, status]);

  return (
    <div
      onClick={() => handleOpenModal()}
      style={{ backgroundColor: "#F1F1F1" }}
      className="relative col-span-1 cursor-pointer  overflow-hidden  bg-white shadow-md hover:shadow-lg"
    >
      <SignInModal />
      <AddBbqModal />
      <div className="mt-10 flex items-center justify-center">
        {" "}
        <div
          className="rounded-full p-5"
          style={{
            backgroundColor: "#FFD836",
            color: "#00000066",
          }}
        >
          <Churras />
        </div>
      </div>
      <div className=" mx-auto max-w-md p-10 text-center ">
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-xl font-bold text-transparent md:text-3xl md:font-normal">
          <p className="mt-3 font-bold font-semibold tracking-[-0.02em]">
            Adicionar Churras
          </p>
        </h2>
      </div>
    </div>
  );
}
