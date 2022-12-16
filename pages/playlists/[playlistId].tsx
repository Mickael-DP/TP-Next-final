import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { LocalStoragePlaylist, Movie } from 'models';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { fetchMovie, fetchPlaylist} from 'services/api/tmdb';
import classes from './classes.module.css';

type Props = {
	playlist: LocalStoragePlaylist;
  movies: Movie[];
};

export default function PlaylistPage({ playlist, movies }: Props) {
	const pageTitle = `${playlist.name} - My Movies`;
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<Typography variant='h1'>{playlist.name}</Typography>
			<Typography>{playlist.description}</Typography>

			<TableContainer
				className={classes.root}
				component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell
								align='center'
								className={classes.tableCell}>
								ID
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Titre
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Évaluation
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Nb de votes
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Popularité
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Date de sortie
							</TableCell>
							<TableCell
								align='center'
								className={classes.tableCell}>
								Action
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{movies.map((movie) => (
							<TableRow
								key={movie.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								className={classes.row}
								onClick={() => {
									router.push(`/movies/${movie.id}`);
								}}>
								<TableCell align='center'>{movie.id}</TableCell>
								<TableCell align='center'>{movie.title}</TableCell>
								<TableCell align='center'>{movie.vote_average}</TableCell>
								<TableCell align='center'>{movie.vote_count}</TableCell>
								<TableCell align='center'>{movie.popularity}</TableCell>
								<TableCell align='center'>{movie.release_date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const playlistId = context.params?.playlistId;
  console.log(playlistId);
	if (!playlistId || !Number(playlistId)) {
		return {
			notFound: true,
		};
	}
	const playlist = await fetchPlaylist(+playlistId);
	const moviesId = playlist.movies.map(async (movie: Movie) => {
		let getMovie = (await fetchMovie(movie.id)) as Movie;
		return getMovie;
	});
	const movies = await Promise.all(moviesId);
	return {
		props: {
			playlist,
      movies,
		},
	};
};
