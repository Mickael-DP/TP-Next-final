import { Button } from "@mui/material";
import MovieCard from "components/MovieCard";
import { LocalStoragePlaylist, Movie } from "models";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { fetchMovie } from "services/api/tmdb";

type Props = {
  movie: Movie;
};

export default function MoviePage({ movie }: Props) {
  const pageTitle = `${movie.title} - My Movies`;

  function addMovieToPlaylist(): void {
    const playlistStr = window.localStorage.getItem("playlist");

    const playlist: LocalStoragePlaylist = playlistStr
      ? JSON.parse(playlistStr)
      : { movies: [] };
    const existingMovie = playlist.movies.find((m) => m.id === movie.id);
    if (existingMovie) return;

    const updatedPlaylist = {
      ...playlist,
      movies: [...playlist.movies, movie],
    };

    window.localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <Button onClick={addMovieToPlaylist}>Ajouter à la playlist</Button>
      <MovieCard movie={movie} />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const movieId = context.params?.movieId;

//   if (!movieId || !Number(movieId) || Array.isArray(movieId)) {
//     return { notFound: true };
//   }

//   const movie = await fetchMovie(+movieId);

//   return {
//     props: {
//       movie,
//     },
//   };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  const movieId = context.params?.movieId;

  if (!movieId || !Number(movieId) || Array.isArray(movieId)) {
    return { notFound: true };
  }

  const movie = await fetchMovie(+movieId);

  return {
    props: {
      movie,
    },
    revalidate: 24 * 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
