import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
    },
    take: 1,
  });

  return [
    {
      url: "https://trin-bbq.vercel.app",
      lastModified: new Date(),
    },
    ...users.map((user) => ({
      url: `https://trin-bbq.vercel.app/${user.id}`,
      lastModified: new Date(),
    })),
  ];
}
