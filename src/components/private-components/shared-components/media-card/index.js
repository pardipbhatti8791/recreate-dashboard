import React from 'react';
import DesignStyleWrapper from './media-card.style';
import { Typography, Card }  from 'antd';
import VideoCamImgIcon from '../../../../images/film.svg';
import PhotoIcon from '../../../../images/landscape.svg';
import PlayIcon from '../../../../images/play.svg';
import MenuIcon from '../../../../images/menu.svg';
import { HeartFilled } from '@ant-design/icons';
const { Text } = Typography;


const MediaCard = ({title, description, playIcon, thumbnail}) => {
    const thumb = thumbnail && thumbnail !== '' ? thumbnail : 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';
    return(
        <DesignStyleWrapper >
                <Card
                    hoverable
                    className="media-card"
                    style={{ width: '100%', borderRadius: 4, height: 250 }}
                    bodyStyle={{background: `url(${thumb.replace('upload/', 'upload/q_auto:low/')})`,  backgroundPosition: 'center', backgroundSize: 'contain', height: '100%', borderRadius: 5}}
                >
                    <div>
                <img className="left-cam-icon" alt="example" src={playIcon ? VideoCamImgIcon : PhotoIcon } />
                <img className="right-pencil-icon" alt="example" src={MenuIcon} />
                {playIcon && <img className="center-play-icon" alt="example" src={PlayIcon} width={55} />}
                <div className="card-bottom-left-bar">
                    <div className="heart-ratings"><HeartFilled style={{ marginRight: 3 }} /><Text className="text-white ">698</Text></div>
                    <Text className="text-white" strong ellipsis>{title}</Text>
                    <Text className="text-white tagline" ellipsis>{description}</Text>
                </div>
                <div className="card-bottom-right-bar"></div>
            </div>
            </Card>
        </DesignStyleWrapper>
    )
}

export default MediaCard;