import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import './header.scss'
import { signOut } from '../../redux/actions/user';
import { auth } from '../../firebase/firebase';

const Header = ({hidden, signOut, currentUser, profilePage, editing, reauth}) => {
    if (editing || reauth) {
        return null;
    }
    
    const signOutHandler = async () => {
        try {
            await auth.signOut()
            signOut()
        } catch (error) {
            console.log('error signing out', error)
        }
    }

    if (profilePage) {
        return (
            <div style={{height: '63px'}}>
                <div className={(!hidden) ? "hidden" : 'header-container'}>
                    <Link className='profile-link' to='/home'>Go Back</Link>
                    <Link className='sign-out-link' to='/' onClick={signOutHandler}>Sign Out</Link>
                </div>
                <div className={(hidden) ? "hidden" : 'sticky-header-container'}>
                    <Link className='profile-link' to='/home'>Go Back</Link>
                    <Link className='sign-out-link' to='/' onClick={signOutHandler}>Sign Out</Link>
                </div>
            </div>
        )
    }


    return (
        <div style={{height: '63px'}}>
            <div className={(!hidden) ? "hidden" : 'header-container'}>
                <Link className='profile-link' to={`/profile/${currentUser.id}`}>My Profile</Link>
                <Link className='sign-out-link' to='/' onClick={signOutHandler}>Sign Out</Link>
            </div>
            <div className={(hidden) ? "hidden" : 'sticky-header-container'}>
                <Link className='profile-link' to={`/profile/${currentUser.id}`}>My Profile</Link>
                <Link className='sign-out-link' to='/' onClick={signOutHandler}>Sign Out</Link>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        editing: state.user.editing,
        reauth: state.user.reauth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);