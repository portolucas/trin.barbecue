import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  const { name, description, date, ownerId, observation } = body;

  try {
    await prisma.barbecue.create({
      data: {
        name,
        description,
        date,
        observation,
        owner: {
          connect: {
            id: ownerId,
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
