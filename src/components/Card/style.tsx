import { Box as BoxMaterialUI, Card as CardMaterialUI } from "@mui/material";
import styled from "styled-components";

export const CardContent = styled.div`
  position: absolute;
  top: "50%";
  left: "50%";
  transform: "translate(-50%, -50%)";
  width: 600;
  height: 600;
  bgcolor: "rgb(39, 43, 51)";
  border: "2px solid #000";
  boxshadow: 24;
  pt: 2;
  px: 4;
  pb: 3;
`;

export const Card = styled(CardMaterialUI)`
  width: 40%;
  height: 40vh;
  barckground-color: rgba(0, 0, 0, 0.32);
  color: rgb(245, 245, 245);
  boxshadow: 0px 2px 4px rgba(0, 0, 0, 2);
  display: flex;
  columngap: 16;
`;

export const Box = styled(BoxMaterialUI)`
  position: absolute;
  top: "50%";
  left: "50%";
  transform: "translate(-50%, -50%)";
  width: 600;
  height: 600;
  bgcolor: "rgb(39, 43, 51)";
  border: "2px solid #000";
  boxshadow: 24;
  pt: 2;
  px: 4;
  pb: 3;
`;
