import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export type CardCharacterProps = {
  name: string;
  status: string;
  species: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  episode: {
    name: string;
    url: string;
  }[];
};

export type Props = {
  props: CardCharacterProps[];
};
export const CardCharacter = ({ props }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        columnGap: "32px",
        rowGap: "32px",
      }}
    >
      {props &&
        props.map((prop) => {
          return (
            <Card sx={{ maxWidth: "32%", minHeight: "64vh" }}>
              <CardMedia
                component="img"
                alt="green iguana"
                image={prop.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {prop.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {prop.status} - {prop.species}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Localização: {prop.location.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  Total de Episódios: {prop.episode.length}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};
