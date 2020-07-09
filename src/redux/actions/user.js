import { SET_CURRENT_USER, SIGN_OUT, REQUEST_USERS_FAILED, TOGGLE_REAUTH_WINDOW, REQUEST_USERS_PENDING, REQUEST_USERS_SUCCESS, DELETE_USER, TOGGLE_EDIT_MODE } from '../constants/user';
import firebase, { firestore, convertUsersSnapshotToMap, auth } from '../../firebase/firebase';

export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    payload: user
})

export const signOut = () => {
    return ({
        type: SIGN_OUT
     })
}

export const requestUsers = () => (dispatch) => {
    dispatch({
        type: REQUEST_USERS_PENDING
    })

    const users = firestore.collection("users");
    users.onSnapshot(async snapshot => {
      const usersMap = convertUsersSnapshotToMap(snapshot)
      try {
          dispatch({ type: REQUEST_USERS_SUCCESS, payload: usersMap})
      } catch (error) {
          dispatch({ type: REQUEST_USERS_FAILED, payload: error})
      }
    })
}

export const toggleEditMode = (mode) => dispatch => {
        dispatch({
            type: TOGGLE_EDIT_MODE,
            payload: mode
        })
}

export const editUserInfo = (userId, phone, email) => async () => {
    try {
        const userRef = firestore.collection('users').doc(`${userId}`);
        await auth.currentUser.updateEmail(email);
        userRef.update({
            email,
            phone
        })
    } catch (error) {
        console.log('trouble editing user', error)
    }
}

export const exchangeRobots = (userId, filteredPostIds) => async () => {
    try {
        const generateRobotId = (len, arr) => {
            let robotId = ''
            for (let i = len; i > 0; i--) {
              robotId += arr[Math.floor(Math.random() * arr.length)];
            }
            return robotId
          }
        const robotId = generateRobotId(20, '12345abcde');
        const userRef = firestore.collection('users').doc(`${userId}`);
        userRef.update({
            robotId
        })
        for (let i = 0; i < filteredPostIds.length; i++) {
            const postRef = firestore.collection('posts').doc(`${filteredPostIds[i]}`);
            postRef.update({
               "postedBy.robotId": robotId
            })
        }
    } catch (error) {
        console.log('trouble exchanging robots', error)
    }
}

export const deleteUser = (currentUser) => async dispatch => {
    try {
        const { id, posts } = currentUser;
        for (const i in posts) {
            await firestore.collection('posts').doc(`${i}`).delete()
        }
        await firestore.collection('users').doc(`${id}`).delete()
        await auth.currentUser.delete()
        dispatch({ type: DELETE_USER })
    } catch (error) {
        console.log('error deleting user', error)
    }
}

export const toggleReauthWindow = (mode) => dispatch => {
    dispatch({
        type: TOGGLE_REAUTH_WINDOW,
        payload: mode
    })
}

export const reauthUser = (email, password) => async () => {
    try {
        const user = auth.currentUser
        const credential = firebase.auth.EmailAuthProvider.credential(email, password)
        user.reauthenticateWithCredential(credential)
    } catch (error) {
        console.log(error)
    }
}