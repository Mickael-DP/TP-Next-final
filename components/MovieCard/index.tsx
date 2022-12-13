import { Box, Card, CardContent, Rating, Typography } from "@mui/material";
import Image from "next/image";
import { Movie } from "models";

import classes from "./classes.module.css";
import { getImage } from "services/api/tmdb";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const imgSrc = getImage(movie.poster_path);

  return (
    <Card>
      <CardContent className={classes.root}>
        <Box className={classes.imageWrapper}>
          <Image
            src={imgSrc}
            alt={`poster ${movie.title}`}
            width={267}
            height={400}
          />
        </Box>
        <Box className={classes.content}>
          <Rating
            defaultValue={movie.vote_average}
            precision={0.25}
            max={10}
            size="large"
            readOnly
          />
          <Typography gutterBottom variant="h5" component="div" mt={3}>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.overview}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={3}>
            Date de sortie : {movie.release_date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Titre original : {movie.original_title} - VO :{" "}
            {movie.original_language}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Popularité : {movie.popularity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Évaluation : {movie.vote_average}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Votes : {movie.vote_count}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

