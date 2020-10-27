import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import { Button } from "@material-ui/core";
import Campaign from "../ethereum/campaign";

class RenderRows extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods
      .approveRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approversCount } = this.props;
    return (
      <Row disabled={request.complete}>
        <Cell
          style={{ paddingLeft: "15px", fontSize: "20px", textAlign: "center" }}
        >
          {id}
        </Cell>
        <Cell
          style={{ paddingLeft: "70px", fontSize: "20px", textAlign: "center" }}
        >
          {request.description}
        </Cell>
        <Cell
          style={{ paddingLeft: "70px", fontSize: "20px", textAlign: "center" }}
        >
          {web3.utils.fromWei(request.value, "ether")}
        </Cell>
        <Cell
          style={{ paddingLeft: "70px", fontSize: "20px", textAlign: "center" }}
        >
          {request.recipient}
        </Cell>
        <Cell
          style={{ paddingLeft: "70px", fontSize: "20px", textAlign: "center" }}
        >
          {request.approvalCount}/{approversCount}
        </Cell>
        <Cell
          style={{ paddingLeft: "80px", fontSize: "20px", textAlign: "center" }}
        >
          {request.complete ? null : (
            <Button
              variant="outlined"
              style={{ color: "green", border: "1px solid green" }}
              onClick={this.onApprove}
            >
              Approve
            </Button>
          )}
        </Cell>
        <Cell
          style={{ paddingLeft: "80px", fontSize: "20px", textAlign: "center" }}
        >
          {request.complete ? null : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onFinalize}
            >
              Finalize
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RenderRows;
