import React from 'react';
import {connect} from 'react-redux';
import deleteButton from '../../img/delete.svg'
import './post.scss';
import { deletePost } from '../../redux/actions/posts';

const Post = ({ name, content, userId, postId, robotId, date, myProfile, deletePost }) => {
    const options = {
        dateStyle: 'short'
    }
    const newDate = date.toDate().toLocaleString('en-US', options)

    const deleteHandler = () => {
        deletePost(postId, userId)
    }

    if (myProfile) {
        return (
            <div className='post-container'>
                <div className='post-left-container'>
                    <div className='post-image-container'>
                        <img alt='robots' src={`https://robohash.org/${robotId}?size=200x200`} />
                    </div>
                    <div className='post-text-container'>
                        <h2>{name}</h2>
                        <p>{content}</p>
                    </div>
                </div>
                <div className='post-date-container'>
                    <p>{newDate}</p>
                    <div onClick={deleteHandler} className='delete-container'>
                        <img src={deleteButton} alt='delete button' />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='post-container'>
            <div className='post-left-container'>
                <div className='post-image-container'>
                    <img alt='robots' src={`https://robohash.org/${robotId}?size=200x200`} />
                </div>
                <div className='post-text-container'>
                    <h2>{name}</h2>
                    <p>{content}</p>
                </div>
            </div>
            <div className='post-date-container'>
                <p>{newDate}</p>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deletePost: (postId, userId) => dispatch(deletePost(postId, userId))
    }
}

export default connect(null, mapDispatchToProps)(Post);