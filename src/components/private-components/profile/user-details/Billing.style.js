import styled from 'styled-components';

const BillingStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 20px;
  align-items: center; 
  background: #fff;
  position: relative;
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
  .plans-circular-disc{
    height:5px;
    width: 5px;
    border-radius: 50%;
    background: #2c4bff;
    float: left;
    margin: 5px;
  }
  .label-with-circle{
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }
  .billing-title{
    padding-top: 20px;
    // margin-left:10px;
  }
  .titles {
    font-size: 20px;
    font-weight: 500;

  }
  .text-plain {
    font-size: 14px;
  }
  .small {
    font-size: 12px;
  }
  .text-plain-button {
    font-size: 14px;
  }
  .cancel-subscription {
    margin-left: 10px;
    margin-top: 10px;
  }
  .download-btn{
    margin-left: 10px;
  }
  @media only screen and (max-width: 356px) {
    .cancel-subscription {
      margin-left: 0px;
    }
    margin: 0px;
    max-width: 100%
  }
  @media only screen and (max-width: 561px) {
    .label-bill-input{
      padding-right: 0px;
    }
    .input1{
      margin-bottom:0px !important;
      margin-left:0px !important;
    }
    .download-btn{
      margin-left: 0px;
    }
    .text-plain-button{
      margin-left: 0px !important;
    }
  }
  @media only screen and (max-width: 992px) {
  .text-plain {
    margin-bottom:10px;
    // margin-left:10px;
  }
   .text-plain-button {
    margin-bottom:10px;
    margin-left:10px;
  } 
  .input1{
    margin-bottom:10px;
    margin-left:25px;
  }
  .input {
    margin-bottom:10px;
  }
}
  .label-bill-input{
    padding-right: 20px;
  }
  .faded-text{
    opacity: 0.6;
  }
  /* .switch{
    margin: 0px 10px;
  } */
  button: {
    border-radius: 0px !important;
  }
  .bold{
    font-weight: 500;
  }
  .block-end{
    margin-bottom: 20px;
  }
  .background-primary:not([disabled]){
    background: #2c4bff !important;
  }
  input{
    margin: 0px;
  }
  .blue-tick{
    color: #2c4bff;
    margin-right: 5px;
    font-size: 12px;
  }
  .ant-card-body {
    padding: 24px;
  }
  .fields-label{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  .upgrade-btn-text{
    color: #40bdc2;
  }
  .danger-txt{
    color: #d43f3a;
  }
  .input-sub{
    max-width: 90%;
  }
`;

export default (BillingStyleWrapper);