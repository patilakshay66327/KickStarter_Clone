import React, { Component } from "react";
import Layout from "../../components/layouts";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Message } from "semantic-ui-react";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Grid container spacing={2}>
            <Grid item md="12">
              <h1>Create a Campaign</h1>
            </Grid>
            <Grid item md="12">
              <TextField
                label="Minimum Contribution"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">Wei</InputAdornment>
                  ),
                }}
                value={this.state.minimumContribution}
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
              />
            </Grid>
            <Grid item md="12">
              <Message
                error
                content={this.state.errorMessage}
                style={{ color: "red" }}
              />
            </Grid>
            <Grid item md="12">
              {this.state.loading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={this.onSubmit}
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Layout>
    );
  }
}

export default CampaignNew;
