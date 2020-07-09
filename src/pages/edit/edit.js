import React, {useState, useEffect} from 'react';
import exitButton from '../../img/delete.svg'
import FormInput from '../../components/form-input/form-input';
import {connect} from 'react-redux';
import './edit.scss';
import CustomButton from '../../components/custom-button/custom-button';
import { editUserInfo, exchangeRobots, toggleEditMode, requestUsers } from '../../redux/actions/user';

const EditPage = ({currentUser, editUser, exchangeRobots, editing, turnOffEditMode, onRequestUsers}) => {
    const [userDetails, setUserDetails] = useState({email: '', phone: ''})
    const [editMode, setEditMode] = useState(false);
    const { phone, email } = userDetails;

    useEffect(() => {
        if(currentUser) {
        setUserDetails({email: currentUser.email, phone: currentUser.phone})
        onRequestUsers()
        }
    }, [currentUser, onRequestUsers])
    
    useEffect(() => {
        if(editing) {
            setEditMode(true)
        }
    }, [editing])

    if(!currentUser) {
        return null;
    }

    const exitPage = () => {
        turnOffEditMode()
        setEditMode(false)
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({...userDetails, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await editUser(currentUser.id, phone, email)
            exitPage()
        } catch (error) {
            console.log(error, 'error editing user');
        }
    }

    const changeRobotId = () => {
        let filteredPosts = [];
        for (const i in currentUser.posts) {
            filteredPosts.push(i)
        }
        exchangeRobots(currentUser.id, filteredPosts)
    }

    return (
        <div className='edit-page-background' style={{display: (editMode) ? 'flex' : 'none'}}>
            <div className='edit-popup'>
                <div className='exit-container'>
                    <img onClick={exitPage} style={{height: '25px', width: '20px'}} alt='exit' src={exitButton} />
                </div>
                <h2>EDIT PROFILE</h2>
                <img alt='your robot' src={`https://robohash.org/${currentUser.robotId}?size=150x150`} />
                <CustomButton onClick={changeRobotId} inverted>Exchange Your Robot</CustomButton>
                <form onSubmit={handleSubmit} className='edit-form' >
                    <FormInput 
                        edit
                        name="phone" 
                        type="phone" 
                        value={phone} 
                        label="Phone Number"
                        handleChange={handleChange} 
                        required 
                    /> 
                        <FormInput 
                        edit
                        name="email" 
                        type="email" 
                        value={email} 
                        label="Email"
                        handleChange={handleChange} 
                        required 
                    />
                    <CustomButton type="submit" value="submit">Submit</CustomButton>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser,
        editing: state.user.editing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editUser: (userId, phone, email) => dispatch(editUserInfo(userId, phone, email)),
        exchangeRobots: (userId, filteredPostIds) => dispatch(exchangeRobots(userId, filteredPostIds)),
        turnOffEditMode: () => dispatch(toggleEditMode(false)),
        onRequestUsers: () => dispatch(requestUsers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPage);