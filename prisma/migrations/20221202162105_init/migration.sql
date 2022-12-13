-- CreateTable
CREATE TABLE "Playlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "_MovieToPlaylist" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MovieToPlaylist_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MovieToPlaylist_B_fkey" FOREIGN KEY ("B") REFERENCES "Playlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToPlaylist_AB_unique" ON "_MovieToPlaylist"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToPlaylist_B_index" ON "_MovieToPlaylist"("B");
