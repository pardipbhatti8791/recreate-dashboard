import React, { Component } from 'react';
// import PlanCard from './plans/planCard';
// import { Card, Col, Row, Typography, Button, Divider, Input, Switch, Badge, message } from 'antd';
import { connect } from 'react-redux';
// import { ArrowLeftOutlined } from '@ant-design/icons';
import SubscriptionStyleWrapper from './Subscription.style';
// import subscriptionActions from '../../redux/subscription/actions';
// import authActions from '../../redux/auth/actions';
import Billing from './user-details';

// const { Text, Title } = Typography;
class Subscription extends Component {
  state = {
    showSubscription: true,
    loadingPlanId: null,
    selectedPlanId: null
  }
  componentDidMount = () => {
    // this.props.getPlans();
    // this.props.getSubscription();
  }

  componentWillUpdate = (nextProps) => {
    // if (this.state.selectedPlanId && nextProps.subscriptionData.plans !== this.props.subscriptionData.plans) {
    //   const subscribed = nextProps.subscriptionData.plans.find(plan => !!plan.subscription);
    //   this.openCheckout(subscribed.subscription.id, subscribed);
    // }

    // if (nextProps.subscriptionData.payment && (nextProps.subscriptionData.payment !== this.props.subscriptionData.payment)) {
    //   let paymentResponse = nextProps.subscriptionData.payment;
    //   if (paymentResponse && paymentResponse.hasOwnProperty('data')) {
    //     message.success(paymentResponse.message);
    //     this.props.getPlans();
    //     this.props.getSubscription();
    //   }
    //   else if (!paymentResponse.hasOwnProperty('data') && paymentResponse.hasOwnProperty('message')) {
    //     message.error(paymentResponse.message);
    //   }
    // }
  }
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }
  switchView = () => {
    this.setState({
      showSubscription: !this.state.showSubscription,
    })
  }

  redirectToDash = () => {
    const { history } = this.props;
    history.push('/dashboard');
  }

  getPlanText = (index) => {
    // const activeIndex = this.props.subscriptionData.plans.findIndex(x => x.subscription !== null);
    // if (index == activeIndex && this.props.subscriptionData.plans[activeIndex].subscription.status === 'created') {
    //   return 'Payment Pending';
    // }
    // if (index == activeIndex) {
    //   return 'Current Plan';
    // }
    // if (index < activeIndex) {
    //   return 'Downgrade';
    // }
    // else {
      return "Upgrade"
    // }
  }
  requestToActive = (planId, text, plan) => {
    if (text === 'Payment Pending') {
      return this.openCheckout(plan.subscription.id, plan);
    }
    this.setState({ selectedPlanId: plan })
    this.props.changePlan({ plan: planId });
  }

  openCheckout = (subscription_id, plan) => {
    
  };

  render() {
    // const { subscriptionData, profile } = this.props;
    // if (this.props.subscriptionData.isLoadingPlans) {
    //   return (
    //     <Loader />
    //   );
    // }
    return (
      <SubscriptionStyleWrapper>
          <Billing />
        {/* {this.state.showSubscription ?
          <Billing
            switchView={this.switchView}
            redirectToDash={this.redirectToDash}
          /> : */}
          {/* <div className="subscription-container">
            <Row type="flex" gutter={20}>
              <Col span={8} xs={5} sm={5} md={8}>
                <ArrowLeftOutlined onClick={this.switchView} className="back-icon" />
              </Col>
              <Col span={8} xs={16} sm={16} md={8}>
                <Title level={4}>Select the plan that fits your needs</Title>
              </Col>
              <Col span={8} xs={0} sm={0} md={8}>
              </Col>
            </Row>
            <Row type="flex" gutter={20}>
            <PlanCard
                title="FREE"
                amount="0"
                amountPreText="$"
                cardDiscription1="3 Social profiles"
                cardDiscription2="30 Schedule Messages"
                cardDiscription3="1 user"
                buttonText="Downgrade"
            />
              {/* {subscriptionData.plans.map((plan, index) => <Col key={plan.id} span={6} xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 20 }}>
                <PlanCard
                  id={plan.id}
                  title={plan.name.toUpperCase()}
                  amount={plan.amount}
                  amountPreText="$"
                  cardDiscription1={plan.description}
                  loadingPlanId={subscriptionData.loadingPlanId}
                  isActive={plan.subscription && plan.subscription_status === "active"}
                  buttonText={this.getPlanText(index)}
                  buttonClick={(text) => this.requestToActive(plan.id, text, plan)}
                />
              </Col>)} */}
              {/* <Col span={6}>
                  <PlanCard
                    title="FREE"
                    amount="0"
                    amountPreText="$"
                    cardDiscription1="3 Social profiles"
                    cardDiscription2="30 Schedule Messages"
                    cardDiscription3="1 user"
                    buttonText="Downgrade"
        />
              </Col> 
            </Row>
          </div> */}
        {/* } */}
      </SubscriptionStyleWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // subscriptionData: state.subscriptionPlans,
    // profile: state.Auth.userdata
  }
}

const mapDispatchToProps = {
//   getPlans: subscriptionActions.getSubscriptionPlans,
//   changePlan: subscriptionActions.changeSubscriptionPlan,
//   getSubscription: subscriptionActions.getActiveSubscription,
//   savePaymentData: subscriptionActions.savePaymentData,
  // geProfile: authActions.getUserDetails,
}
export default connect(mapStateToProps, mapDispatchToProps)(Subscription)