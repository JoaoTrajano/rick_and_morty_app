import { Button, CardMedia, Typography } from "@mui/material";
import { CustomCardItemContent, CardItem } from "./style";
import { Status } from "../Status";
import { listSingleCharacter } from "../../services";
import { CardCharacterProps } from "../Card";

export type CharactersProps = {
  characters: CardCharacterProps[];
  handleChange: {
    openModal: (data: boolean) => void;
    handleSetCharacter: (data: any) => void;
  };
};

export const Characters = ({ characters, handleChange }: CharactersProps) => {
  return (
    <>
      {characters &&
        characters.map((character) => {
          return (
            <CustomCardItemContent item xs={4} key={character.id}>
              <CardMedia
                component="img"
                image={character.image}
                style={{ width: "34%", height: "40vh" }}
              />
              <CardItem>
                <Typography gutterBottom variant="h5" component="div">
                  {character.name}
                </Typography>
                <Status status={character.status} species={character.species} />
                <Typography gutterBottom variant="body2" component="div">
                  <p>
                    <strong> Localização:</strong> {character.location.name}
                  </p>
                  <p>Total de Episódios: {character.episode.length}</p>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={async () => {
                      handleChange.openModal(true);
                      const singleCharacter = await listSingleCharacter(
                        String(character.id)
                      );
                      handleChange.handleSetCharacter(
                        singleCharacter.value.character
                      );
                    }}
                  >
                    Saber mais
                  </Button>
                </Typography>
              </CardItem>
            </CustomCardItemContent>
          );
        })}
    </>
  );
};
