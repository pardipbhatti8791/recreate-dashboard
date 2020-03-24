import styled from 'styled-components';

const MediaCardStyleWrapper = styled.div`
  width: 100%;
  .ant-card-hoverable:hover {
    -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.34);
    box-shadow: 0 2px 8px rgba(0, 0, 0, .34);
    }
  .media-card{
   position: relative;
   overflow:hidden;
   &:before{
     position:absolute;
     content:"";
     left:0;
     top:0;
     width:100%;
     height:100%;
     background:rgba(0,0,0,.2);
   }
    .ant-card-body{
      .left-cam-icon{
        position: absolute;
        width: 20px;
        top: 12px;
        left: 12px;
      }
      .right-pencil-icon{
        position: absolute;
        width: 20px;
        top: 12px;
        right: 12px;
      }
      .center-play-icon{
        position: absolute;
        width: 55px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: block;
        margin: auto;
      }
      .card-bottom-left-bar{
        position: absolute;
        bottom: 5px;
        left: 12px;
        display: flex;
        flex-direction: column;
      }
      .text-white{
        color: #fff;
        width: 200px;
      }
      .tagline{
        font-size: 12px;
      }
      .heart-ratings{
        display: flex;
        align-items: center;
        color: #fff;
      }
      .card-bottom-right-bar {
        background: #fff;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        right: 12px;
        position: absolute;
        bottom: 10px;
      }
    }
  }
`;

export default MediaCardStyleWrapper;