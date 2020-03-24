import React, { Component } from 'react';
import { Card, Col, Row , Typography, Button, Divider, Input, Form, Avatar } from 'antd';
import { connect } from 'react-redux';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
// import { createBrowserHistory } from "history";
// import subscriptionActions from '../../redux/subscription/actions';
// import authActions from '../../redux/auth/actions';
import BillingStyleWrapper from './Billing.style';
// import visa from '../../image/visa.png';
const { Text,Title } = Typography;


class Billing extends Component {
    state = {
        displayProfile:{},
        profile: {

        },
        isEditable: false,
        checkDisabled: true
    } 
    componentDidMount = () => {
        // this.props.form.validateFields();
        // this.props.geProfile();
        // this.setState({
        //     displayProfile:this.props.profile
        // });
    }
    toggleEditable = () => {
        this.setState({
            isEditable: !this.state.isEditable
        });
    }

    handleChangeInput = (e) => {
        const { profile } = this.state;
        profile[e.target.name] = e.target.value;
        this.setState({
            profile
        });
        this.updateDisabled();
    }

    saveChanges = value => {
        console.log(value)
    };

    updateDisabled  = () => {
        this.setState({
            checkDisabled: false
        });
    }

  render() {
    // const { subscriptionData } = this.props;
    const { profile, isEditable , displayProfile } = this.state;
    // const { activePlan } = subscriptionData;
    // const activPlanData =  activePlan && activePlan[0] && activePlan[0] !== undefined ? activePlan[0] : {};
    return (
        <BillingStyleWrapper>
            <Form onFinish={this.saveChanges}>
                <Button onClick={this.props.redirectToDash}>
                    <ArrowLeftOutlined /> Back to Dashboard 
                </Button>
                <Title className="billing-title titles" level={4}>Your Roman <span>&#8546;</span> Account</Title>
            <div>
            <Row type="flex" justify="space-around" >
                    <Col span={12}>
                        <Row type="flex" justify="end">
                            <Col span={24} sm={24}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> <Text className="text-plain" >Viral Parmar</Text>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Email</Text>
                                    {isEditable ? <Form.Item>
                                                    <Input type="email" className="input-sub" />
                                            </Form.Item>:
                                    <Text className="text-plain" >{displayProfile.email}</Text>}
                                </div>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Phone Number</Text>
                                    {isEditable ? <Form.Item>
                                                   <Input name="phone_number" className="input-sub" type="number" />
                                                </Form.Item>: <Text className="text-plain" >{profile.phone_number}</Text>}
                                </div>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Gender</Text>
                                    {/* {isEditable ? <Input className="input-sub" type="text" value={profile.gender} onChange={this.handleChangeInput} name="gender" /> :  */}
                                    <Text className="text-plain" >{profile.gender}</Text>
                                    {/* } */}
                                </div>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Country</Text>
                                    {/* {isEditable ? 
                                    <Input className="input-sub" type="text" value={profile.country} onChange={this.handleChangeInput} name="country" /> : */}
                                    <Text className="text-plain" >India</Text>
                                    {/* } */}
                                </div>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >State</Text>
                                    {/* {isEditable ?
                                    <Input className="input-sub" type="text" value={profile.state} onChange={this.handleChangeInput} name="state" />:  */}
                                    <Text className="text-plain" >Bangalore</Text>
                                    {/* } */}
                                </div>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Language</Text>
                                    {/* {isEditable ? <Input className="input-sub" type="text" value={profile.language} onChange={this.handleChangeInput} name="language" /> :  */}
                                    <Text className="text-plain" >English</Text>
                                    {/* } */}
                                </div>
                            </Col>
                            <Col span={24}>
                                <div className="fields-label" >
                                    <Text className="text-plain small" >Time Zone</Text>
                                    {/* {isEditable ? <Input className="input-sub" type="text" value={profile.timezone} onChange={this.handleChangeInput} name="timezone" /> :  */}
                                    <Text className="text-plain" >(+5:30) IST (Asia/Kolkata)</Text>
                                    {/* } */}
                                </div>
                            </Col>
                        </Row>
                    </Col>
            
                    <Col  span={12}>
                        <Row type="flex" justify="end">
                        <Button onClick={this.toggleEditable} type="primary" className="background-primary" >
                                {isEditable ? 'Cancel' : 'Edit'}
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </div>
                <Divider />
                <Row type="flex" justify="space-around" align="middle">
                    <Col lg={{ span: 12}} md={{span:18}} sm={{span:24}} >
                            <div className="label-with-circle"> 
                                <div className="plans-circular-disc">
                                </div>
                                <Text className="text-plain" >Billing Cycle </Text>
                            </div>
                            <Row type="flex">
                                <Col span={23} >
                                    <div className="background-primary" style={{padding: '4px 15px', color: '#fff'}} >
                                        <Text level={4} className="titles" style={{color: '#fff'}} >kjk</Text>
                                    </div>
                                </Col>
                                <Col span={24} >
                                    <div style={{marginTop: 30}}>
                                        <Text className="text-plain" >Next Billing Cycle: 
                                        {/* {activPlanData && activPlanData.status === "active" ? activPlanData.ended_at : <Text className="text-plain danger-txt">Plan is not initiated</Text>}  */}
                                        </Text>
                                    </div>
                                </Col>
                                <Col span={24} style={{marginTop: 30}} >
                                <Button type="link" onClick={this.props.switchView} > 
                                {/* {activPlanData && activPlanData.status === "active" ? <Text className="text-plain bold upgrade-btn-text" >UPGRADE PLAN</Text> : <Text className="text-plain bold danger-txt" >PAYMENT PENDING</Text>} */}
                                
                                </Button>
                                </Col>
                            </Row>
                    </Col>
                    <Col lg={{ span: 12}} md={{span:18}} sm={{span:24}}  >
                        <div className="label-with-circle"> 
                            <div className="plans-circular-disc">
                            </div>
                            <Text className="text-plain">Plans & Usage Info </Text>
                        </div>
                        <Card style={{ width: 'auto', maxwidth: 410}}>
                        <Row>
                            <Col span={12}><CheckOutlined className="blue-tick" /><Text className="text-plain">3 Users</Text></Col>
                            <Col span={12}><CheckOutlined className="blue-tick" /><Text className="text-plain">Bulk content scheduling</Text></Col>
                            <Col span={12}><CheckOutlined className="blue-tick" /><Text className="text-plain">20 social profiles</Text></Col>
                            <Col span={12}><CheckOutlined className="blue-tick" /><Text className="text-plain">Team assignments</Text></Col>
                            <Col span={12}><CheckOutlined className="blue-tick" /><Text className="text-plain">Customized analytics view</Text></Col>
                        </Row>
                        </Card>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={24}>
                            <Text className="text-plain bold">Current Usage</Text>
                            </Col>
                            <Col span={24}>
                                <Text className="text-plain"><span className="bold">13/25</span> social accounts</Text>
                            </Col>
                            <Col span={24}>
                                <Text className="text-plain"><span className="bold">1/6</span> Users</Text>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                    <Row type="flex">
                    <Col span={8} sm={24} xs={24} lg={8}> 
                        {/* <img src={visa} /> */}
                    </Col>
                    <Col span={6} sm={24} xs={24} lg={6}>
                    <Button type="link" onClick={this.props.switchView} style={{marginTop:80}} > <Text className="text-plain bold upgrade-btn-text" >+Change or Add Payment Method</Text></Button>
                    </Col>
                    </Row>

                    
                <Divider />
                <Row type="flex" justify="space-between">
                    <Col span={24}>
                        <Title level={4} className="titles" >Invoices & Billing Information</Title>
                        <Text className="text-plain faded-text">See and get billing information</Text>
                    </Col>
                    <Col span={15} sm={15} xs={24}>
                        <Text className="text-plain bold" >$99</Text><br />
                        <Text className="text-plain bold" >Name</Text><br />
                        <Text className="text-plain faded-text" >Payment on jan 16, 2020</Text>
                    </Col>
                    <Col span={9} sm={9} xs={24}>
                        <Button className="text-plain-button" >View Invoice</Button>
                        <Button className="text-plain download-btn">Download Receipt</Button>
                    </Col>
                    <Col span={15} sm={15} xs={24}>
                        <Text className="text-plain bold" >$38.03</Text><br />
                        <Text className="text-plain bold" >Name</Text><br />
                        <Text className="text-plain faded-text" >Payment on jan 16, 2020</Text>
                    </Col>
                    <Col span={9} sm={9} xs={24}>
                        <Button className="text-plain-button" >View Invoice</Button>
                        <Button className="text-plain download-btn">Download Receipt</Button>
                    </Col>
                    <Divider />
                    <Col span={24}>
                    <Row type="flex" justify="end">
                        
                    <Button htmlType="submit" disabled={!this.state.isEditable} type="primary" className="background-primary" >
                            Save Changes
                        </Button>
                    </Row>
                    </Col>
                </Row>
            </Form>
        </BillingStyleWrapper>
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
    // editUser: authActions.editUserDetails,
    // geProfile: authActions.getUserDetails,
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Billing);