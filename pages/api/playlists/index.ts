// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Playlist, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type CreatePlaylistParams = {
  name?: string;
  description?: string;
  movieIds: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist>
) {
  if (req.method === "POST") {
    const playlist = JSON.parse(req.body) as CreatePlaylistParams;

    const { name, description, movieIds } = playlist;

    const createdPlaylist = await prisma.playlist.create({
      data: {
        name,
        description,
        movies: {
          connectOrCreate: movieIds.map((id) => ({
            where: { id },
            create: { id },
          })),
        },
      },
    });

    res.status(200).json(createdPlaylist);
  }
}
