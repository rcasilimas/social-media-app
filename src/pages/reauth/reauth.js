import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import exitButton from '../../img/delete.svg'
import FormInput from '../../components/form-input/form-input';
import {connect} from 'react-redux';
import './reauth.scss';
import CustomButton from '../../components/custom-button/custom-button';
import { toggleReauthWindow, reauthUser, deleteUser, toggleEditMode } from '../../redux/actions/user';

const ReauthPage = ({currentUser, reauth, turnOffReauthMode, reauthUser, turnOnEditMode, deleteUser, history}) => {
    const [userPassword, setUserPassword] = useState('')
    const [reauthMode, setReauthMode] = useState(false);
    
    useEffect(() => {
        if(reauth) {
            setReauthMode(true)
        }
    }, [reauth])

    if(!currentUser) {
        return null;
    }

    const exitPage = () => {
        turnOffReauthMode()
        setReauthMode(false)
    }


    const handleChange = (event) => {
        setUserPassword(event.target.value)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await reauthUser(currentUser.email, userPassword)
            if (reauth === 'edit') {
                exitPage()
                turnOnEditMode()
            } else {
                exitPage()
                const confirm = window.confirm("Are you sure you want to delete your robot? There is no turning back!")
                if(confirm) {
                    deleteUser(currentUser)
                    history.push('/signin')
                }
            }
        } catch (error) {
            console.log(error, 'error reauthing user');
        }
    }

    return (
        <div className='reauth-page-background' style={{display: (reauthMode) ? 'flex' : 'none'}}>
            <div className='reauth-popup'>
                <div className='exit-container'>
                    <img onClick={exitPage} style={{height: '25px', width: '20px'}} alt='exit' src={exitButton} />
                </div>
                <h2>Confirm Password</h2>
                <form onSubmit={handleSubmit} className='reauth-form' >
                    <FormInput 
                        edit
                        name="password" 
                        type="password" 
                        value={userPassword} 
                        label="Password"
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
        reauth: state.user.reauth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reauthUser: (email, password) => dispatch(reauthUser(email, password)),
        deleteUser: (currentUser) => dispatch(deleteUser(currentUser)),
        turnOnEditMode: () => dispatch(toggleEditMode(true)),
        turnOffReauthMode: () => dispatch(toggleReauthWindow(false)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReauthPage));