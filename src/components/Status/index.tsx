import { Typography } from "@mui/material";
import { SmallCircle } from "./style";

export type StatusProps = {
  status: string;
  species: string;
};
export const Status = ({ status, species }: StatusProps) => {
  return (
    <Typography
      variant="body2"
      component="div"
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: 8,
      }}
    >
      <SmallCircle color={status === "Alive" ? "green" : "red"} />
      <div>{status}</div>
      <div>-</div>
      <div>
        <span>{species}</span>
      </div>
    </Typography>
  );
};
