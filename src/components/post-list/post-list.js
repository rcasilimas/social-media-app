import React from 'react';
import { connect } from 'react-redux';
import './post-list.scss';
import Post from '../post/post';

const PostList = ({isPending, posts, error, profileId, users, currentUser}) => {

    
    if (profileId) {

        if(profileId === currentUser.id) {
            let profilePosts = [];
            for (const i in currentUser.posts) {
                currentUser.posts[i].postId = i
                profilePosts.push(currentUser.posts[i])
            }
            profilePosts.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds)
            return (
                isPending ? <h1>Loading</h1> : (
                    <div>
                        {profilePosts.map((post, i) => {
                            return (
                                <Post 
                                    key={i}
                                    date={post.createdAt}
                                    userId={currentUser.id}
                                    robotId={currentUser.robotId}
                                    postId={post.postId}
                                    name={currentUser.name}
                                    content={post.content}
                                    myProfile={true}
                                />
                            )
                        })}
                    </div>
                )
            )
        }

        const selectedUser = users.find(user => user.id === profileId);
        let profilePosts = [];
        for (const i in selectedUser.posts) {
            profilePosts.push(selectedUser.posts[i])
        }
        profilePosts.sort((a,b) => b.createdAt.seconds - a.createdAt.seconds)
        return (
            isPending ? <h1>Loading</h1> : (
                <div>
                    {profilePosts.map((post, i) => {
                        return (
                            <Post 
                                key={i}
                                date={post.createdAt}
                                robotId={selectedUser.robotId}
                                userId={selectedUser.id}
                                name={selectedUser.name}
                                content={post.content}
                            />
                        )
                    })}
                </div>
            )
        )
    }


    return (
        isPending ? <h1>Loading</h1> : (
            <div>
                {posts.map((user, i) => {
                    return (
                        <Post 
                            key={i}
                            date={posts[i].createdAt}
                            robotId={posts[i].postedBy.robotId}
                            userId={posts[i].postedBy.userId}
                            name={posts[i].postedBy.name}
                            content={posts[i].content}
                        />
                    )
                })}
            </div>
        )
    )
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
        posts: state.posts.posts,
        isPending: state.posts.isPending,
        error: state.posts.error,
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(PostList);