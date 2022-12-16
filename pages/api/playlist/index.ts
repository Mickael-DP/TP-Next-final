import { Playlist, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist>
) {
  if (req.method === "POST") {
    const { playlistId } = JSON.parse(req.body) as { playlistId: number };

    const playlist = await prisma.playlist.findFirst({
      where: { id: Number(playlistId) },
      include: { movies: true },
    });

    if (!playlist) {
      res.status(404).end();
      return;
    }
    res.status(200).json(playlist);
  }
}
