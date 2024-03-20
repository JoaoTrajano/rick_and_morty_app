import styled from "styled-components";
import Card from "@mui/material/Card";
import { CardContent } from "@mui/material";

export const CustomCardItemContent = styled(Card)`
  width: 40%;
  height: 40vh;
  background-color: rgba(0, 0, 0, 0.32);
  color: rgb(245, 245, 245);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  column-gap: 16px;
`;

export const CardItem = styled(CardContent)`
  width: "100%";
  padding: 3;
`;
