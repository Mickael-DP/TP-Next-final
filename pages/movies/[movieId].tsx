import { AlertProps, Button, IconButton, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import MovieCard from 'components/MovieCard';
import { LocalStoragePlaylist, Movie } from 'models';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { fetchMovie } from 'services/api/tmdb';

type Props = {
	movie: Movie;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
	props,
	ref
) {
	return (
		<MuiAlert
			elevation={6}
			ref={ref}
			variant='filled'
			{...props}
		/>
	);
});

export default function MoviePage({ movie }: Props) {
	const [openNotif, setOpenNotif] = React.useState(false);
	const [backgroundColor, setBackgroundColor] = useState<"success" | "error">();
  const [message, setMessage] = useState<string>();
	const pageTitle = `${movie.title} - My Movies`;

	function addMovieToPlaylist(): void {
		const playlistStr = window.localStorage.getItem('playlist');

		const playlist: LocalStoragePlaylist = playlistStr
			? JSON.parse(playlistStr)
			: { movies: [] };
		const existingMovie = playlist.movies.find((m) => m.id === movie.id);
		if (existingMovie){
      setMessage("Ce film est déjà dans votre playlist");
      setBackgroundColor("error");
      setOpenNotif(true);
      return;
    } else {
      setMessage("Ce film a été ajouté à votre playlist");
      setBackgroundColor("success");
      setOpenNotif(true);
    }

		const updatedPlaylist = {
			...playlist,
			movies: [...playlist.movies, movie],
		};

		window.localStorage.setItem('playlist', JSON.stringify(updatedPlaylist));
		setOpenNotif(true);
	}

	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenNotif(false);
	};

	const action = (
		<React.Fragment>
			<Button
				color='secondary'
				size='small'
				onClick={handleClose}>
				UNDO
			</Button>
			<IconButton
				size='small'
				aria-label='close'
				color='inherit'
				onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<Button onClick={addMovieToPlaylist}>Ajouter à la playlist</Button>
      <Snackbar
        open={openNotif}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={backgroundColor} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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
		fallback: 'blocking',
	};
};
