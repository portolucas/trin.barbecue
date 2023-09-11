import CardGuests from "@/components/guests/card-guests";
import Title from "@/components/home/title";
import prisma from "@/lib/prisma";
import { Barbecue, Guest } from "@prisma/client";

export default async function Page({
  params,
}: {
  params: { barbecueId: string };
}) {
  async function getBarbecue() {
    if (params.barbecueId) {
      const barbecue = await prisma.barbecue
        .findUnique({
          where: {
            id: params.barbecueId,
          },
          include: {
            guests: true,
          },
        })
        .then((barbecue) => (barbecue = barbecue))
        .catch((err) => {
          console.log(err);
          return undefined;
        });
      return barbecue;
    }
  }

  const barbecue: (Barbecue & { guests: Guest[] }) | undefined | null =
    await getBarbecue();

  return (
    <>
      <Title>Agenda de Churras</Title>
      <div className="my-10 grid w-full max-w-screen-xl animate-fade-up justify-center gap-5 px-5 xl:px-0">
        {barbecue && (
          <CardGuests
            key={barbecue.id}
            barbecue={barbecue}
            guests={barbecue.guests}
          />
        )}
      </div>
    </>
  );
}
