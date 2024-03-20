import React, { ChangeEvent, useState } from "react";

import { listAllCharacters } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../../services/type";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { CustomCardContent } from "./style";
import { Characters } from "../Characters";
import { Status } from "../Status";
import { Modal } from "../Modal";

export type CardCharacterProps = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: {
    name: string;
    url: string;
  }[];
};

export type Options = {
  name: string;
  value: string;
};

export default function CardCharacter() {
  const [character, setCharacter] = useState<CardCharacterProps>({
    id: 0,
    name: "",
    status: "",
    species: "",
    image: "",
    gender: "",
    origin: {
      name: "",
      url: "",
    },
    location: {
      name: "",
      url: "",
    },
    episode: [{ name: "", url: "" }],
  });
  const [search, setSearch] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);

  const options = [
    { name: "Todos", value: "" },
    { name: "Vivo", value: "alive" },
    { name: "Morto", value: "dead" },
  ] as Options[];

  const { data } = useQuery({
    enabled: true,
    queryKey: ["listAllCharacters", { page, name: search, status: option }],
    queryFn: async (): Promise<ApiResponse> =>
      await listAllCharacters({ page, name: search, status: option }),
  });

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };
  const characters = data?.value?.characters as CardCharacterProps[];
  const count = (data as any)?.metadata
    ? (data as any)?.metadata?.metadata?.count
    : 10;

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <InputLabel id="demo-simple-select-label">
          <span style={{ color: "#e3e3e3 " }}>
            Total de personagens cadastrados: {count}
          </span>
        </InputLabel>
      </Grid>
      <Grid item xs={3}>
        <TextField
          id="standard-basic"
          label="Pesquise por NOME"
          variant="outlined"
          color="info"
          onChange={(event) => setSearch(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={3}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          color="info"
          value={option}
          onChange={handleChangeSelect}
          fullWidth
        >
          {options.map((option) => (
            <MenuItem value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <CustomCardContent container>
          <Characters
            characters={characters}
            handleChange={{
              openModal: setOpen,
              handleSetCharacter: setCharacter,
            }}
          />
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
              setCharacter({
                id: 0,
                name: "",
                status: "",
                species: "",
                image: "",
                gender: "",
                origin: {
                  name: "",
                  url: "",
                },
                location: {
                  name: "",
                  url: "",
                },
                episode: [{ name: "", url: "" }],
              });
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card
              sx={{
                width: "100%",
                height: "100%",
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
                image={character.image}
                style={{ width: "100%", height: "64vh", objectFit: "cover" }}
              />
              <Typography gutterBottom variant="h5" component="div">
                {character.name}
                <Status status={character.status} species={character.species} />
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
                      <strong> Localização:</strong> {character.location.name}
                    </p>
                    <p>Total de Episódios: {character.episode.length}</p>
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    <p>
                      <strong> Genêro:</strong> {character.gender}
                    </p>
                  </Typography>
                </div>
                <div>
                  <Typography gutterBottom variant="body2" component="div">
                    <p>
                      <strong> Origem:</strong> {character.origin.name}
                    </p>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Modal>
        </CustomCardContent>
      </Grid>
    </Grid>
  );
}
