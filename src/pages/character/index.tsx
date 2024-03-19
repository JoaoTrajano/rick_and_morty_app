import { CardCharacter } from "../../components";
import { useListAllCharacters } from "../../services/character";

export const Character = () => {
  const { data } = useListAllCharacters({});
  const characters = (data as any)?.value?.characters;

  return <CardCharacter props={characters} />;
};
