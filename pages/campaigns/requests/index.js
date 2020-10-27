import React, { Component } from "react";
import Layout from "../../../components/layouts";
import { Button, Grid } from "@material-ui/core";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import { Table } from "semantic-ui-react";
import RenderRows from "../../../components/renderRows";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);

    const requestCount = await campaign.methods.getRequestCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );


    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RenderRows
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <Grid container>
          <Grid item md="5">
            <h1>Requests</h1>
          </Grid>
          <Grid item md="2">
            <Link route={`/campaigns/${this.props.address}/requests/new`}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ margin: "10%", float: "right" }}
              >
                Add Request
              </Button>
            </Link>
          </Grid>
          <Grid item md="12">
            <Table>
              <Header>
                <Row>
                  <HeaderCell style={{ paddingLeft: "15px", fontSize: "25px" }}>
                    Id
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Description
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Amount
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Recepient
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Approval Counts
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Approve
                  </HeaderCell>
                  <HeaderCell style={{ paddingLeft: "80px", fontSize: "25px" }}>
                    Finalize
                  </HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
          </Grid>
          <Grid item md="12">
            found {this.props.requestCount} requests.
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default RequestIndex;
