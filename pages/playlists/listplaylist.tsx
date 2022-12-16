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
import { Playlist } from 'models';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { fetchListPlaylists } from 'services/api/tmdb';
import classes from './classes.module.css';

type Props = {
	playlists: Playlist[];
};

export default function ListPlaylistPage({ playlists }: Props) {
	const pageTitle = `Ma bibliothèque - My Movies`;
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<Typography variant='h1'>Ma bibliothèque</Typography>

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
								Description
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{playlists.map((playlist) => (
							<TableRow
								key={playlist.id}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								className={classes.row}
								onClick={() => {
									router.push(`/playlists/${playlist.id}`);
								}}>
								<TableCell align='center'>{playlist.id}</TableCell>
								<TableCell align='center'>{playlist.name}</TableCell>
								<TableCell align='center'>{playlist.description}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const playlists = await fetchListPlaylists();
	return {
		props: {
			playlists,
		},
	};
};
