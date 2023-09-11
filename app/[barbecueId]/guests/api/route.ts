import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { barbecueId, guestId, payment } = body;

  try {
    await prisma.barbecue.update({
      where: { id: barbecueId },
      data: {
        guests: {
          update: {
            where: { id: guestId },
            data: { payment },
          },
        },
      },
    });
  } catch (error) {
    return NextResponse.error();
  }

  try {
    const bbqGuests = await prisma.guest.findMany({
      where: {
        barbecueId,
      },
    });
    return NextResponse.json({ bbqGuests });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(req: Request) {
  const barbecueId = req.url.split("?")[1].split("=")[1];

  try {
    const bbqGuests = await prisma.guest.findMany({
      where: {
        barbecueId,
      },
    });
    return NextResponse.json({ bbqGuests });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { guestId } = body;
  try {
    const res = await prisma.guest.delete({
      where: {
        id: guestId,
      },
    });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
