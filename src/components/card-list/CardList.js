import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '../card/Card';

const CardList = ({ robots, isPending, error, history }) => {

  const clickHandler = (clickedUserId) => {
    history.push(`./profile/${clickedUserId}`)
  }

  return (
    isPending ? <h1>Loading</h1> : (
      <div>
        {
          robots.map((user, i) => {
            return (
              <Card
                clickHandler={clickHandler}
                key={i}
                userId={robots[i].id}
                robotId={robots[i].robotId}
                name={robots[i].name}
                email={robots[i].email}
                phone={robots[i].phone}
                />
            );
          })
        }
      </div>
  )
  );
}

const mapStateToProps = state => {
  return {
    isPending: state.user.isPending,
    error: state.user.error
  }
}

export default withRouter(connect(mapStateToProps)(CardList));