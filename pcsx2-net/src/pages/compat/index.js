import React from 'react';
import MaterialTable from 'material-table';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { createTheme, ThemeProvider } from '@mui/material';
import compatData from "/data/compat/data.json";

import styles from './index.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function CompatibilityTable() {
  return (
    <div className="row mt-2">
      <div className="col">
        <ThemeProvider theme={darkTheme}>
          <MaterialTable
            columns={[
              {
                title: 'Title',
                field: "title"
              },
              {
                title: 'Serial',
                field: "serial"
              },
              {
                title: 'CRC',
                field: "crc"
              },
              {
                title: 'Region',
                field: "region"
              },
              {
                title: 'Status',
                field: "status"
              },
              {
                title: 'Last Tested Version',
                field: "last_tested_version"
              },
              {
                title: 'Last Tested Date',
                field: "last_tested_date"
              },
              {
                title: 'Wiki Link',
                field: "wiki_link"
              },
              {
                title: 'Forum Link',
                field: "forum_link"
              }
            ]}
            data={compatData}
            title="Decompilation Tracker"
            options={{
              search: true,
              exportButton: true,
              sorting: true,
              pageSize: 25
            }}
            isLoading={false}
          /></ThemeProvider>
      </div>
    </div>
  );
}

export default function Compatiblity() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="Compatibility"
      description="Find out how well your PlayStation 2 games will run on PCSX2 and if there are any associated issues">
      <main>
        <CompatibilityTable/>
      </main>
    </Layout>
  );
}
