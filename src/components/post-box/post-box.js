import React, { useState} from 'react';
import {connect} from 'react-redux'
import './post-box.scss';
import CustomButton from '../custom-button/custom-button';
import { submitPost } from '../../redux/actions/posts';

const PostBox = ({user, submitPost}) => {
    const [postContent, setPostContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            await submitPost(postContent, user.id, user.name, user.robotId);
            setPostContent('')
        } catch (error) {
            console.log(error, 'trouble submitting post')
        }
    }

    const handleChange = (event) => {
        setPostContent(event.target.value)
    }

    return (
        <div className='post-box-container'>
            <form onSubmit={handleSubmit} className='post-box-form'>
                <input 
                    required
                    className='post-box ba b--green bg-lightest-blue'
                    type='post'
                    value={postContent}
                    placeholder='Tell us something interesting...'
                    onChange={handleChange}
                />
                <CustomButton inverted type='submit' value='submit'>Post</CustomButton>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitPost: (text, userId, name, robotId) => dispatch(submitPost(text, userId, name, robotId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);