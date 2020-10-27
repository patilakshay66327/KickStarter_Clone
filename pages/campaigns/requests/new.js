import React, { Component } from "react";
import { Button, Grid, TextField, CircularProgress } from "@material-ui/core";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Message } from "semantic-ui-react";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/layouts";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recepient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recepient } = this.state;

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recepient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Grid container spacing={3}>
          <Grid item md="5">
            <h1>Create a Request</h1>
          </Grid>
          <Grid item md="5">
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <Button
                size="large"
                variant="text"
                color="primary"
                style={{ margin: "15px" }}
              >
                back
              </Button>
            </Link>
          </Grid>
          <Grid item md="12">
            <TextField
              variant="outlined"
              label="Description"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Grid>
          <Grid item md="12">
            <TextField
              variant="outlined"
              label="Value in ether"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Grid>
          <Grid item md="12">
            <TextField
              variant="outlined"
              label="Recipient"
              value={this.state.recepient}
              onChange={(e) => this.setState({ recepient: e.target.value })}
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
                color="primary"
                variant="contained"
                size="large"
              >
                Create Request
              </Button>
            )}
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default RequestNew;
