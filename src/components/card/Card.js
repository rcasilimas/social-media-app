import React from 'react';

const Card = ({ name, email, phone, robotId, userId, clickHandler }) => {

  const clicked = () => {
    clickHandler(userId)
  }

  return (
    <div onClick={clicked} style={{cursor: 'pointer'}} className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${robotId}?size=200x200`} />
      <div>
        <h2>{name}</h2>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Card;
