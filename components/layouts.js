import React from "react";
import Header from "./header";
import Head from "next/head";
import { Grid } from "@material-ui/core";

export default (props) => {
  return (
    <Grid container>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <Grid item md="12">
        <Header />
      </Grid>
      <Grid item md="12">
        {props.children}
      </Grid>
    </Grid>
  );
};
