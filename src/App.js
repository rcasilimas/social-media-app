import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInPage from './pages/sign-in/sign-in'
import SignUpPage from './pages/sign-up/sign-up'
import HomePage from './pages/home/home';
import ProfilePage from './pages/profile/profile';
import EditPage from './pages/edit/edit';
import PasswordPage from './pages/password/password'
import ReauthPage from './pages/reauth/reauth';
import {requestUsers} from './redux/actions/user';
import {fetchPosts} from './redux/actions/posts';
import { auth, createUserProfileDocument } from './firebase/firebase'
import { setCurrentUser } from './redux/actions/user';
import './App.css';

const App = ({currentUser, setCurrentUser, onRequestUsers, fetchPosts}) => {
  

  useEffect(() => {
    onRequestUsers()
    fetchPosts()
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }, [fetchPosts, onRequestUsers, setCurrentUser])


  return (
    <div id='container'>
      <ReauthPage />
      <EditPage />
      <Switch>
        <Route exact path='/' render={() => currentUser ? <Redirect to='/home' /> : <SignInPage />} />
        <Route exact path='/signin' render={() => currentUser ? <Redirect to='/home' /> : <SignInPage />} />
        <Route exact path='/signup' render={() => currentUser ? <Redirect to='/home' /> : <SignUpPage />} />
        <Route exact path='/password' render={() => currentUser ? <Redirect to='/home' /> : <PasswordPage />} />
        <Route path='/home'  render={() => !currentUser ? <Redirect to='/signin' /> : <HomePage />} />
        <Route path={`/profile/:profileId`} component={ProfilePage} />
      </Switch>
    </div>
  )
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  fetchPosts: () => dispatch(fetchPosts()),
  onRequestUsers: () => dispatch(requestUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);