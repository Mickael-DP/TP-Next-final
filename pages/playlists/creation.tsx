import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import MoviesList from 'components/Playlist';
import { LocalStoragePlaylist } from 'models';
import React from 'react';

export default function PlaylistCreationPage() {
	const [playlist, setPlaylist] = React.useState<LocalStoragePlaylist>({
		movies: [],
	});

	const [playlistName, setPlaylistName] = React.useState<string>('');
	const [playlistDescription, setPlaylistDescription] = React.useState<string>('');

	React.useEffect(() => {
		const playlistStr = window.localStorage.getItem('playlist');
		if (!playlistStr) return;

		const playlistValue = JSON.parse(playlistStr) as LocalStoragePlaylist;
		setPlaylist(playlistValue);
	}, []);

	if (playlist.movies.length === 0) return <p>Pas de films</p>;

	return (
		<>
			<Box>
				<h1>Création de playlist</h1>
				<TextField
					id='outlined-basic'
					label='Nom de la playlist'
					variant='outlined'
					onChange={(e) => {setPlaylistName(e.target.value)}}
				/>
				<TextField multiline
					id='outlined-basic'
					label='Description'
					variant='outlined'
					onChange={(e) => {setPlaylistDescription(e.target.value)}}
				/>
			</Box>
			<Button
				onClick={async () => {
					const response = await fetch('http://localhost:3000/api/playlists', {
						method: 'POST',
						body: JSON.stringify({
							movieIds: playlist.movies.map((movie) => movie.id),
							name: playlistName,
							description: playlistDescription,
						}),
					});
					const savedPlaylist = await response.json();
					console.log(savedPlaylist);
				}}>
				Sauvegarder la playlist
			</Button>
			<MoviesList
				movies={playlist.movies}
				setPlaylist={setPlaylist}
			/>
			;
		</>
	);
}
