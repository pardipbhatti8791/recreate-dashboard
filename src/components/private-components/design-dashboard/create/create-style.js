import styled from 'styled-components';

export const DesignStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* align-items: center; */
  background: #fff;
  position: relative;
  .main-search-input{
    width: 500px;
  }
  .isoDesignJumbotronWrapper{
    text-align: center;
    height:300px;
    background-color:#6c757d;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .isoJumbotronTitile{
    color:#fff;
    font-size: 35px;
    font-weight: 600;
  }
  .isoJumbotronSubTitile{
    color:#fff;
  }
  .isoDesignContentWrapper{
    padding: 50px;
    .titleText{
      float:left;
      font-size: 15px;
      font-weight: 500;
    }
    .seeAllText{
      float:right;
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
    }
    .seeall-btn{
      display: flex;
      text-align: center;
      flex-direction: column;
      line-height: 20px;
    }
    .isoDesignCardWrapper{
      .mainCard{
        text-align: center;
        padding: 40px 0px 8px 0px;
        margin: auto;
        width: 100%;
        max-width: 300px;
        border: 1px solid transparent;
        &:hover {
          border: 1px solid #e8e8e8;
          .cardAction{
            color:  #fff;
            background: blue;
          }
        }
        .cardAction{
          padding: 5px 20% 5px 20%;
          background: transparent;
          border: 1px solid #e8e8e8;
          color:  rgba(0, 0, 0, 0.65);
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
    }
    .slick-prev, .slick-next {
      color: #5c5c5c !important;
      font-size: 12px !important;
    }
    .media-container{
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      }
      .boxConatiner{
        width: 200px !important;
        float: left;
        text-align: center;
        margin: 11px;
        &:hover{
          cursor: pointer;
        }
      }
      .isoDesignVideoBox{
          display: flex;
          justify-content: center;
          width: 200px;
          height: 200px;
          display: grid;
          text-align: center;
          vertical-align: middle;
          border: 1px solid #d5d5d5;
          align-content: center;
          font-size: 48px;
          color: #adadad;
          margin-bottom: 10px;
          margin-right: 10px;
          background-color: rgba(0,0,0,.2) !important;
          border-radius: 4px;
          &:hover{
            box-shadow: 5px 4px 10px grey;
          }
        }

        .emptyContent{
          border: none;
          background: none;
          font-size: 20px;
          .roundedIcon{
            margin: auto;
          }
          .iconText{
            font-size: 14px;
          }
        }
      .alice-carousel{
        width: 90%;
      }
      button{
        margin: auto;
      }
      .onlyRightBtn{
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 0px;
        margin-right: 0px;
      }
  }

`;

