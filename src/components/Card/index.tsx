import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { listAllCharacters, listSingleCharacter } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../services/type";
import { Status } from "../Status";
import { Pagination, Stack } from "@mui/material";

import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Alterando a largura do modal
  height: 600, // Alterando a altura do modal
  bgcolor: "rgb(39, 43, 51);",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CardCharacter() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);
  const [character, setCharacter] = useState<any>();

  const { data } = useQuery({
    enabled: true,
    queryKey: ["listAllCharacters", { page }],
    queryFn: async (): Promise<ApiResponse> =>
      await listAllCharacters({ page }),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const characters = (data as any)?.value?.characters;
  const count = (data as any)?.metadata
    ? (data as any)?.metadata.metadata.count
    : 10;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "100vh",
      }}
    >
      {characters &&
        characters.map((prop: any) => {
          return (
            <Card
              sx={{
                width: "40%",
                height: "40vh",
                backgroundColor: "rgba(0, 0, 0, 0.32)",
                color: "rgb(245, 245, 245)",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 2)",
              }}
              style={{
                display: "flex",
                columnGap: 16,
              }}
              key={prop.id}
            >
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
                      setOpen(!open);
                      const singleCharacter = await listSingleCharacter(
                        prop.id
                      );
                      setCharacter(singleCharacter.value.character);
                    }}
                  >
                    Saber mais
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      <Stack spacing={2} py={4}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </Stack>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setCharacter({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card
            sx={{
              width: "100%", // Aumentando a largura do card dentro do modal
              height: "100%", // Aumentando a altura do card dentro do modal
              backgroundColor: "rgba(0, 0, 0, 0.32)",
              color: "rgb(245, 245, 245)",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 2)",
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              columnGap: 16,
            }}
          >
            <CardMedia
              component="img"
              image={character?.image}
              style={{ width: "100%", height: "64vh", objectFit: "cover" }}
            />
            <Typography gutterBottom variant="h5" component="div">
              {character?.name}
              <Status status={character?.status} species={character?.species} />
            </Typography>
            <CardContent
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                padding: 3,
              }}
            >
              <div>
                <Typography gutterBottom variant="body2" component="div">
                  <p>
                    <strong> Localização:</strong> {character?.location?.name}
                  </p>
                  <p>Total de Episódios: {character?.episode?.length}</p>
                </Typography>
                <Typography gutterBottom variant="body2" component="div">
                  <p>
                    <strong> Genêro:</strong> {character?.gender}
                  </p>
                </Typography>
              </div>
              <div>
                <Typography gutterBottom variant="body2" component="div">
                  <p>
                    <strong> Origem:</strong> {character?.origin?.name}
                  </p>
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
