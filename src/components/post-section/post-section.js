import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './post-section.scss';
import Scroll from '../scroll/Scroll';
import PostList from '../post-list/post-list';
import PostBox from '../post-box/post-box';
import { fetchPosts } from '../../redux/actions/posts';

const PostSection = ({ fetchPosts, profileId }) => {
    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
            <div className='post-section'>
                <h1>POSTS</h1>
                <Scroll>
                    <PostBox />
                    <PostList profileId={profileId} />
                </Scroll>
            </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}

export default connect(null, mapDispatchToProps)(PostSection);