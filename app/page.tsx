import Card from "@/components/home/card";
import CardAddBbq from "@/components/home/card-add-bbq";
import Title from "@/components/layout/title";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Barbecue, Guest } from "@prisma/client";
import { useSignInModal } from "@/components/layout/sign-in-modal";

export default async function Home() {
  const session = await getServerSession(authOptions);

  async function getBarbecues() {
    if (session?.user?.id) {
      const barbecues = await prisma.barbecue
        .findMany({
          where: {
            ownerId: session?.user?.id,
          },
          include: {
            guests: true,
          },
        })
        .then((barbecues) => barbecues)
        .catch((err) => {
          console.log(err);
          return undefined;
        });
      return barbecues;
    }
  }

  const barbecues: (Barbecue & { guests: Guest[] })[] | undefined =
    await getBarbecues();

  return (
    <>
      <Title>Agenda de Churras</Title>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {!session}
        {barbecues?.map((barbecue) => (
          <Card
            key={barbecue.id}
            barbecue={barbecue}
            guests={barbecue.guests}
          />
        ))}
        <CardAddBbq />
      </div>
    </>
  );
}
