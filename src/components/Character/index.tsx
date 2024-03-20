import { Card } from "./style";
import { CharacterItem } from "./CharacterItem";

export const Character = ({ data }: any) => {
  return (
    <Card>
      {data &&
        data.map((dataItem) => {
          return <CharacterItem props={dataItem} />;
        })}
    </Card>
  );
};
