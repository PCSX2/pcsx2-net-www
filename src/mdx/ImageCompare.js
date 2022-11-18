import React from 'react';
import { Grid } from "@nextui-org/react";

export default function ImageCompare({ children, left, right, altLeft, altRight }) {
  return (
    <Grid.Container gap={1} style={{marginBottom: "1em"}}>
      <Grid xs={6}>
        <img src={left} loading="lazy" alt={altLeft ?? ""} />
      </Grid>
      <Grid xs={6}>
        <img src={right} loading="lazy" alt={altRight ?? ""} />
      </Grid>
    </Grid.Container>
  );
}
