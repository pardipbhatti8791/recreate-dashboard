import styled from 'styled-components';

const PlanCardStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* align-items: center; */
  background: #fff;
  position: relative;
 
      .mainCard{
        text-align: center;
        padding: 0px 0px 8px 0px;
        margin: auto;
        width: 100%;
        max-width: 250px;
        min-height: 450px;
        border: 1px solid gray;
        /* &:hover {
          border: 1px solid #e8e8e8;
          .cardAction{
            color:  #fff;
            background: blue;
          }
        } */
        .ant-card-head-title {
          padding: 10px 0px 0px 0px;
        }
        .header-light-text{
            color: #fff;
            .sub-title{
              font-size: 15px;
            }
        }
        .isoCardText{
          display: inherit;
        }
        .amount {
            font-size: 25px;
        }
        
        button.cardAction{
            height: 50px;
            width: 90%;
            color:  #fff;
            background: blue;
          
          &:disabled {
              width: 100%;
              background: transparent;
              color: #969696;
              border: none;
          }
        }
        span{
          span.cardAction{
              height: 50px;
              width: 90%;
              background: transparent;
              &:hover {
                  background: transparent;
                  color: #969696;
                  border: none;
                }
              button{
                height: 50px;
                width: 100%;
                &:disabled {
                    width: 100%;
                    background: transparent;
                    color: #969696;
                    border: none;
                }
                &:hover {
                  background: transparent;
                  color: #969696;
                  border: none;
                }
              }
              /* &:hover {
                height: 50px;
                width: 90%;
              } */
              
            }
  
        }
        .Pay{
            border: 1px solid #d43f3a;
            height: 50px;
            width: 90%;
            color:  #fff;
            background: #d9534f;
            &:disabled {
                background: transparent;
                color: #969696;
                border: none;
            }
        }
        .isoCardTitle{
          font-weight: 700;
          width: 100%;
          margin-bottom: 8px;
          float: left;
        }
        .isoCardSubTitle{
          font-weight: 500;
          width: 100%;
          margin-bottom: 4px;
          float: left;
        }
        .ant-card-actions{
          background: white;
          border: none;
        }
      }
  
`;

export default (PlanCardStyleWrapper);
