import React, { ChangeEvent, useEffect, useState } from "react";

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
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import { CustomCardContent } from "./style";
import { Characters } from "../Characters";
import { Status } from "../Status";
import { Modal } from "../Modal";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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

const QUERY_KEY = "listAllCharacters";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "rgb(39, 43, 51)",
    },
    primary: {
      main: "#90caf9",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

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

  const [species, setSpecie] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<boolean>(false);

  const options = [
    { name: "Todos", value: "" },
    { name: "Vivo", value: "alive" },
    { name: "Morto", value: "dead" },
  ] as Options[];

  const optionsGender = [
    { name: "Todos", value: "" },
    { name: "Fêmea", value: "female" },
    { name: "Macho", value: "male" },
    { name: "Sem Gênero", value: "genderless" },
    { name: "unknown", value: "unknown" },
  ] as Options[];

  const { data, error } = useQuery({
    enabled: true,
    queryKey: [
      QUERY_KEY,
      { page, name, species, gender, type, status: option },
    ],
    queryFn: async (): Promise<ApiResponse> =>
      await listAllCharacters({
        page,
        name,
        species,
        gender,
        type,
        status: option,
      }),
    retry: 0,
  });

  const resetStates = () => {
    setSpecie("");
    setGender("");
    setName("");
    setType("");
    setOption("");
  };

  if (error) {
    resetStates();
    toast.error("Personagem não encontrado!", {
      position: "top-left",
      theme: "dark",
    });
  }

  useEffect(() => {
    if (name !== "") setPage(1);
  }, [name]);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  const handleChangeSelectGender = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  const characters = data?.value?.characters as CardCharacterProps[];
  const count = (data as any)?.metadata
    ? (data as any)?.metadata?.metadata?.count
    : 10;

  return (
    <Grid container spacing={4} padding={4}>
      <Grid item xs={12}>
        <InputLabel id="demo-simple-select-label">
          <span style={{ color: "white" }}>
            Total de personagens cadastrados: {count}
          </span>
        </InputLabel>
      </Grid>
      <ThemeProvider theme={darkTheme}>
        <Grid container spacing={4} padding={4}>
          <Grid item xs={3}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              color="info"
              value={option}
              variant="outlined"
              onChange={handleChangeSelect}
              fullWidth
            >
              {options.map((option) => (
                <MenuItem value={option.value}>{option.name}</MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel id="demo-simple-select-label">Gênero</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              color="info"
              value={gender}
              variant="outlined"
              onChange={handleChangeSelectGender}
              fullWidth
            >
              {optionsGender.map((option) => (
                <MenuItem value={option.value}>{option.name}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            label="Nome"
            variant="outlined"
            color="info"
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            label="Especie"
            variant="outlined"
            color="info"
            onChange={(event) => setSpecie(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="standard-basic"
            label="Tipo"
            variant="outlined"
            color="info"
            onChange={(event) => setType(event.target.value)}
            fullWidth
          />
        </Grid>
      </ThemeProvider>
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
              count={count === 6 ? 1 : count}
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
