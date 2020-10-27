import React from "react";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "../routes";

export default () => {
  return (
    <Grid container>
      <AppBar position="static">
        <Toolbar>
          <Link route="/">
            <a
              style={{
                flexGrow: "1",
                textDecoration: "none",
                color: "white",
                fontSize: "20px",
              }}
            >
              KickstartClone
            </a>
          </Link>
          <Link route="/campaigns/new">
            <Button
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
            >
              Create Campains
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};
