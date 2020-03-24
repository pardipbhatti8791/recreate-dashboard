import React, { PureComponent } from 'react';
import { Card, Typography, Button, Tooltip } from 'antd';
import PlanCardStyleWrapper from './PlanCard.style';

const { Title, Text } =  Typography;

export default class extends  PureComponent{
    getToolTipText = (text) => {
        switch (text) {
            case 'Current Plan':
                return 'Current active plans';
            case 'Payment Pending':
                return 'Payment pending! Click for the payment';
            default:
                return 'Click to subscribe plan';
        }
    }
  render() {
    const { title, amount, amountPreText, amountPostText, children, cardDiscription1, cardDiscription2, cardDiscription3, isActive, buttonText, buttonClick, loadingPlanId, id } = this.props; 
    return (
        <PlanCardStyleWrapper>
            <Card
                headStyle={{
                    background: isActive ? '#2034b3' : 'gray'
                }}
                hoverable
                title={
                        <React.Fragment>
                            <Text className="header-light-text">{title}</Text>
                            <Title level={4} style={{marginTop: 0}} className="header-light-text amount">
                                <span className="sub-title">{amountPreText}</span>{amount}<span className="sub-title">{amountPostText}</span>
                            </Title>
                        </React.Fragment>
                        }
                bodyStyle={{minHeight: 300}}
                className="mainCard"
                actions={[
                    <React.Fragment>
                        <Tooltip
                            placement="top"
                            title={this.getToolTipText(buttonText)}
                        >
                            <Button
                                className={buttonText === 'Payment Pending' ? 'Pay' : "cardAction"}
                                type="primary"
                                onClick={(e) => buttonClick(buttonText)}
                                disabled={isActive}
                                loading={loadingPlanId === id}
                                >
                                {loadingPlanId === id ? 'Loading...' : buttonText}
                            </Button>
                        </Tooltip>
                    </React.Fragment>,
                ]}
            >
                <Text className="isoCardText">{cardDiscription1}</Text>
                <Text className="isoCardText">{cardDiscription2}</Text>
                <Text className="isoCardText">{cardDiscription3}</Text>
                <div>
                    <p>
                        {children}
                    </p>
                </div>
            </Card>
      </PlanCardStyleWrapper>
    );
  }
}
