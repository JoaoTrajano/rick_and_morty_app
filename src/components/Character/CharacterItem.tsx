import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { Status } from "../Status";
import Button from "@mui/material/Button";

export const CharacterItem = ({ props }: any) => {
  return (
    <>
      <CardMedia
        component="img"
        image={prop.image}
        style={{ width: "34%", height: "40vh" }}
      />
      <CardContent style={{ width: "100%", padding: 3 }}>
        <Typography gutterBottom variant="h5" component="div">
          {prop.name}
        </Typography>
        <Status status={prop.status} species={prop.species} />
        <Typography gutterBottom variant="body2" component="div">
          <p>
            <strong> Localização:</strong> {prop.location.name}
          </p>
          <p>Total de Episódios: {prop.episode.length}</p>
          <Button
            size="small"
            variant="contained"
            onClick={async () => {
              // setOpen(!open);
              const singleCharacter = await listSingleCharacter(prop.id);
              setCharacter(singleCharacter.value.character);
            }}
          >
            Saber mais
          </Button>
        </Typography>
      </CardContent>
    </>
  );
};
