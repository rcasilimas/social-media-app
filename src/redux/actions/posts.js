import { FETCH_POSTS_PENDING, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS, SUBMIT_POST_PENDING, SUBMIT_POST_SUCCESS, SUBMIT_POST_FAILURE } from '../constants/posts';
import firebase, { submitPostToFirebase, firestore, convertPostsSnapshotToMap } from '../../firebase/firebase';

export const fetchPosts = () => dispatch => {
    dispatch({
        type: FETCH_POSTS_PENDING
    })

    const posts = firestore.collection("posts");
    posts.onSnapshot(async snapshot => {
        const postsMap = convertPostsSnapshotToMap(snapshot)
        postsMap.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds)
        try {
            dispatch({
                type: FETCH_POSTS_SUCCESS,
                payload: postsMap
            })
        } catch (error) {
            dispatch({
                type: FETCH_POSTS_FAILURE, 
                payload: error
            })
        }
    })

}

export const submitPost = (text, userId, name, robotId) => async dispatch => {
    dispatch({
        type: SUBMIT_POST_PENDING
    })
    try {
        await submitPostToFirebase(text, userId, name, robotId)
        dispatch({ type: SUBMIT_POST_SUCCESS })
    } catch (error) {
        dispatch({ type: SUBMIT_POST_FAILURE, payload: error})
    }
}

export const deletePost = (postId, userId) => async () => {
    try {
        await firestore.collection('posts').doc(`${postId}`).delete()
        const postRef = firestore.collection('users').doc(`${userId}`)
    } catch (error) {
        console.log('trouble deleting', error)
    }
}