import { Suspense, lazy } from "react";

import { CircularProgress } from "@mui/material";
const CardCharacter = lazy(() => import("../../components/Card"));

export const Character = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CardCharacter />
    </Suspense>
  );
};
