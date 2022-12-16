import { Movie, SearchMoviesResult } from '../../models';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchMovies(search: string): Promise<SearchMoviesResult> {
	return fetch(
		`${baseUrl}/search/movie?api_key=${apiKey}&language=fr-FR&query=${search}&page=1&include_adult=false`
	).then(async (res) => await res.json()) as Promise<SearchMoviesResult>;
}

export async function fetchMovie(id: number): Promise<Movie> {
	return fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=fr-FR`).then(
		async (res) => {
			if (res.status >= 400) throw new Error();
			return await res.json();
		}
	) as Promise<Movie>;
}

export async function fetchPlaylist(playlistId: number) {
	const result = await fetch(`http://localhost:3000/api/playlist`, {
		method: 'POST',
		body: JSON.stringify({ playlistId }),
	})
		.then((res) => {
			return res.json();
		})
		.catch((err) => {
			console.error(err);
		});

	return result;
}

export async function fetchListPlaylists() {
  const result = await fetch(`http://localhost:3000/api/listplaylists`, {
    method: 'GET',
  }).then ((res) => {
    return res.json();
  }).catch((err) => {
    console.error(err);
  });
  return result;
}




export function getImage(path: string) {
	return `https://image.tmdb.org/t/p/w500/${path}`;
}
