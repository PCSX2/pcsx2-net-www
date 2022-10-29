import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import compatData from "/data/compat/data.min.json";
import { Table, Grid, Tooltip, Badge, Link,Input } from '@nextui-org/react';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ForumIcon from '@mui/icons-material/Forum';

import styles from './index.module.css';

export default function Downloads() {
  return (
    <Layout
      title="Compatibility"
      description="Find out how well your PlayStation 2 games will run on PCSX2 and if there are any associated issues">
      <main>
        <Grid.Container gap={2}>
          <Grid xs={12} md={6}>
            Hello
          </Grid>
          <Grid xs={12} md={6}>
            World
          </Grid>
        </Grid.Container>
      </main>
    </Layout>
  );
}
