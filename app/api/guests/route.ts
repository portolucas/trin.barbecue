import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { name, email, price, barbecueId } = body;

  try {
    await prisma.guest.create({
      data: {
        name,
        email,
        price,
        barbecue: {
          connect: {
            id: barbecueId,
          },
        },
      },
    });
    return NextResponse.json({}, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
