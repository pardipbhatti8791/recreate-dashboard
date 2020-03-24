import React from 'react';
import { Row, Col }  from 'antd';

const responsiveWidth  = () => {
    let windowWidth = window.innerWidth;
    if(windowWidth > 1416){ // xxl
        return "20%"
    }else if(windowWidth < 1416 && windowWidth > 1100){ // xl
        return "25%"
    }else if(windowWidth < 1100 && windowWidth > 900){ // md
        return "33%"
    }else if(windowWidth < 900 && windowWidth > 500){ // sm
        return "50%"
    }else if(windowWidth < 500){ // xsm
        return "100%"
    }
  }
  const colStyles = {
    flexBasis: "19%",
    width: responsiveWidth(),
    float: 'left',
    padding: 20
  };
function Banner({banners}) {
    return( <Row>
        {banners.map((banner, i) => (
            <Col key={'grid'+i} style={colStyles}>
                {banner}
            </Col>
       
        ))}
        </Row>
    )
}

export default Banner;
