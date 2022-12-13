import { Button } from "@mui/material";
import MovieCard from "components/MovieCard";
import MoviesList from "components/Playlist";
import { LocalStoragePlaylist, Movie } from "models";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { fetchMovie } from "services/api/tmdb";

type Props = {
    playlist: LocalStoragePlaylist;

};

export default function PlaylistPage({ playlist }: Props) {

    const pageTitle = `${playlist.name} - My Movies`;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <MoviesList movies={playlist.movies} />
    </>
  );
}
