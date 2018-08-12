import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Account from '../../ethereum/account';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import ContributeForm from '../../components/ContributeForm';

class AccountShow extends Component {
  static async getInitialProps(props) {
    const account = Account(props.query.address);

    const summary = await account.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
    };
  }

  renderCards() {
    const {
      balance,
      owner,
      minimumContribution,
    } = this.props;

    const items = [
      {
        header: owner,
        meta: 'Address of fund administrator',
        description:
          'The administrator created this account',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description:
          'The balance is how much money this account has.'
      }
    ];

    return <Card.Group items={items} />;
  }


  render() {
    console.log(this.props.address)
    console.log(this.props.minimumContribution)
    console.log(this.props.balance)
    return (
      <Layout>
        <h3>Account Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default AccountShow;
