import React from 'react';
import './title.scss';
import titleimg from '../../img/titleimg.png'

const Title = ({noPic}) => {

    return (
        <div className='title-container'>
            <h1 className='title f1'>RoboFriends</h1>
            {noPic ? null : <img className='title-img' src={titleimg} />}
        </div>
    )
}

export default Title;