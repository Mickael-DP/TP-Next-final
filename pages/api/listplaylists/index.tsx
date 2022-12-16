import { Playlist, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Playlist[]>
) {
  const playlists = (await prisma.playlist.findMany()) as Playlist[];

  if (!playlists) {
    res.status(404).end();
    return;
  }
  res.status(200).json(playlists);
}