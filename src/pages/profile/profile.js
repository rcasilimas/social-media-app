import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header/header'
import './profile.scss';
import Title from '../../components/title/title';
import Card from '../../components/card/Card';
import CustomButton from '../../components/custom-button/custom-button';
import PostSection from '../../components/post-section/post-section';
import { toggleReauthWindow } from '../../redux/actions/user';

const ProfilePage = ({match, currentUser, users, turnOnReauthMode}) => {
    const [headerIsHidden, setHeaderIsHidden] = useState(true);
    const handleScroll = async () => {
        let position = document.getElementById("container").scrollTop;
        if (position <= 40) {
            setHeaderIsHidden(true)
        } else {
            setHeaderIsHidden(false)
        }
        };
    
      useEffect(() => {
        document.getElementById("container").addEventListener('scroll', handleScroll);
        document.getElementById("container").scrollTo(0,0);
    
        return () => {
          document.getElementById("container").removeEventListener('scroll', () => handleScroll);
          };
      }, []);

      if (!currentUser) {
        return (
        <div className='tc'>
        <Title noPic={true} />
        <h1>Loading</h1>
        </div>
        )
    }

    const profileId = match.params.profileId;

    if (profileId === currentUser.id) {
        const editHandler = async () => {
            turnOnReauthMode('edit')
        }
        const deleteHandler = async () => {
            turnOnReauthMode('delete')
        }
        return (
            <div className='tc'>
                <Header profilePage={true} hidden={headerIsHidden} />
                <Title noPic={true} />
                <Card 
                    key={currentUser.id}
                    robotId={currentUser.robotId}
                    id={currentUser.id}
                    name={currentUser.name}
                    email={currentUser.email}
                    phone={currentUser.phone} />
                <div className='button-row'>
                    <CustomButton onClick={editHandler} inverted>Edit</CustomButton>
                    <CustomButton onClick={deleteHandler} inverted>Delete</CustomButton>
                </div>
                <PostSection profileId={profileId} />
            </div>
        )
    }

    const selectedUser = users.find(user => user.id === profileId)
    
    return (
        <div className='tc'>
            <Header profilePage={true} hidden={headerIsHidden} />
            <Title noPic={true} />
            <Card 
                key={selectedUser.id}
                robotId={selectedUser.robotId}
                id={selectedUser.id}
                name={selectedUser.name}
                email={selectedUser.email}
                phone={selectedUser.phone} />
            <PostSection profileId={profileId} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        users: state.user.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        turnOnReauthMode: (mode) => dispatch(toggleReauthWindow(mode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);