import React, { Component } from "react";
import Layout from "../../components/layouts";
import Campaign from "../../ethereum/campaign";
import { Button, Grid, Paper } from "@material-ui/core";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/contributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      address: props.query.address,
    };
  }

  render() {
    const {
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager,
      address,
    } = this.props;
    return (
      <Layout>
        <Grid container>
          <Grid item md="12">
            <h1>Campaign Details</h1>
          </Grid>
          <Grid item md="6">
            <Grid container spacing={3} style={{ textAlign: "center" }}>
              <Grid item md="6">
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    width: "250px",
                    height: "129px",
                    backgroundColor: "lightpink",
                    overflowWrap: "break-word",
                  }}
                >
                  <h3>{manager}</h3>
                  <p style={{ fontSize: "20px" }}>Manager for this campaign</p>
                </Paper>
              </Grid>
              <Grid item md="6">
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    width: "250px",
                    backgroundColor: "lightpink",
                  }}
                >
                  <h3>{minimumContribution}</h3>
                  <p style={{ fontSize: "20px" }}>
                    Minimum contribution for campaign
                  </p>
                </Paper>
              </Grid>
              <Grid item md="6">
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    width: "250px",
                    height: "129px",
                    backgroundColor: "lightpink",
                  }}
                >
                  <h3>{requestsCount}</h3>
                  <p style={{ fontSize: "20px" }}>Number of requests</p>
                </Paper>
              </Grid>
              <Grid item md="6">
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    width: "250px",
                    height: "129px",
                    backgroundColor: "lightpink",
                  }}
                >
                  <h3>{approversCount}</h3>
                  <p style={{ fontSize: "20px" }}>Number of Approvers</p>
                </Paper>
              </Grid>
              <Grid item md="3"></Grid>
              <Grid item md="6">
                <Paper
                  elevation={3}
                  style={{
                    padding: "10px",
                    width: "250px",
                    height: "129px",
                    backgroundColor: "lightpink",
                  }}
                >
                  <h3>{web3.utils.fromWei(balance, "ether")}</h3>
                  <p style={{ fontSize: "20px" }}>Campaign Balance(ether)</p>
                </Paper>
              </Grid>
              <Grid item md="10">
                <Link route={`/campaigns/${this.props.address}/requests`}>
                  <Button variant="contained" color="primary">
                    View Requests
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md="6">
            <ContributeForm address={address} />
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
