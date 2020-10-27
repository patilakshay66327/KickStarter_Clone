import react, { Component } from "react";
import factory from "../ethereum/factory";
import Layout from "../components/layouts";
import {
  Button,
  Grid,
  Card,
  CardActions,
  Typography,
  Paper,
} from "@material-ui/core";
import { Link } from "../routes";

class CampaignIndex extends Component {
  // this function is nextjs funtion to get the initial data
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return (
        <Card
          elevation="3"
          style={{ paddingTop: "15px", paddingLeft: "15px", marginTop: "10px" }}
        >
          <Typography variant="h5">{address}</Typography>
          <CardActions>
            <Link route={`/campaigns/${address}`}>
              <Button color="primary">View Campaigns</Button>
            </Link>
          </CardActions>
        </Card>
      );
    });

    return (
      <Paper elevation="1" style={{ padding: "20px" }}>
        {items}
      </Paper>
    );
  }

  render() {
    return (
      <Layout>
        <Grid container>
          <Grid items md="12">
            <h1>Open Campaigns</h1>
          </Grid>
          <Grid items md="12">
            {this.renderCampaigns()}
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignIndex;
