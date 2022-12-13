import { Box } from "@mui/material";
import SearchBar from "components/SearchBar";
import Link from "next/link";

export default function Header() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mx={4}
    >
      <h1>My movies</h1>
      <Link href="/playlists/creation">Voir la playlist</Link>
      <SearchBar />
    </Box>
  );
}
