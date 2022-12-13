import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { SearchMoviesResult } from "../../models";
import classes from "./classes.module.css";

type Props = {
  searchResult: SearchMoviesResult;
};

export default function SearchResult({ searchResult }: Props) {
  const router = useRouter();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className={classes.tableCell}>
              ID
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              Titre
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              Évaluation
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              Nb de votes
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              Popularité
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
              Date de sortie
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResult.results.map((movie) => (
            <TableRow
              key={movie.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className={classes.row}
              onClick={() => {
                router.push(`/movies/${movie.id}`);
              }}
            >
              <TableCell align="center">{movie.id}</TableCell>
              <TableCell align="center">{movie.title}</TableCell>
              <TableCell align="center">{movie.vote_average}</TableCell>
              <TableCell align="center">{movie.vote_count}</TableCell>
              <TableCell align="center">{movie.popularity}</TableCell>
              <TableCell align="center">{movie.release_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
