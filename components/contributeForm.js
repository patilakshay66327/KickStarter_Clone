import react, { Component } from "react";
import {
  TextField,
  Button,
  Grid,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Message } from "semantic-ui-react";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false, value: "" });
  };

  render() {
    return (
      <Grid container spacing={2}>
        <Grid item md="12">
          <h2>Contribute to this Campaign!!!!</h2>
        </Grid>
        <Grid item md="12">
          <TextField
            label="Amount to Contribute"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">ether</InputAdornment>
              ),
            }}
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
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
            <Button onClick={this.onSubmit} variant="contained" color="primary">
              Contribute
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

export default ContributeForm;
