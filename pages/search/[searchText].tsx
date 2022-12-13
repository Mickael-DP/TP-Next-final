import SearchResult from "components/SearchResult";
import { SearchMoviesResult } from "models";
import { GetServerSideProps } from "next";
import { fetchMovies } from "services/api/tmdb";

type Props = {
  searchResult: SearchMoviesResult;
};

export default function SearchPage({ searchResult }: Props) {
  return <SearchResult searchResult={searchResult} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchText = context.params?.searchText;

  if (!searchText || Array.isArray(searchText)) {
    return { notFound: true };
  }

  const searchResult = await fetchMovies(searchText);

  return { props: { searchResult } };
};
