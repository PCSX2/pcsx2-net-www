import React from "react";

export default function Image({ children, cols, src, alt }) {
  return (
    <Grid.Container style={{ marginBottom: "1em" }}>
      <Grid xs={12} md={Math.min(12, cols ?? 12)}>
        <img src={src} loading="lazy" alt={alt ?? ""} />
      </Grid>
    </Grid.Container>
  );
}
