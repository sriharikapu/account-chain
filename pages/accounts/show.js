import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Account from '../../ethereum/account';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';
import ContributeForm from '../../components/ContributeForm';

class AccountShow extends Component {

  state = {percent:0};

  static async getInitialProps(props) {
    const account = Account(props.query.address);
    const owner = await account.methods.owner().call();
    
    const summary = await account.methods.getSummary().call();
    
    return {
      owner:owner,
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1]
    };
  }

   async componentWillMount() {
    const {
      balance,
      address
    } = this.props;

     const account = Account(address);
     const accounts = await web3.eth.getAccounts();
     var my_contribution = await account.methods.contributers(accounts[0]).call();
     // console.log("user address: " + accounts)
      let percent = 0;
      if(parseInt(balance) > 0){
        let contibution_percent = (my_contribution / parseInt(balance)) * 100;
        percent = web3.utils.fromWei(my_contribution, 'ether')+" ("+contibution_percent.toString() + "%)";
      }
      this.setState({percent:percent});
   }

   renderCards() {
    const {
      balance,
      owner,
      minimumContribution
    } = this.props;

    

    const items = [
      {
        header: owner,
        meta: 'Address of fund Trader',
        description:
          'The Trader created this account',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(minimumContribution, 'ether'),
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much wei'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Account Balance (ether)',
        description:
          'The balance is how much money this account has.'
      },
      {
        header: this.state.percent,
        meta: 'My contribution',
        description:
          'This balance is how much you have contributed with profits.'
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
