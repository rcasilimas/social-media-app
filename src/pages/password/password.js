import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import { auth } from '../../firebase/firebase';

import './password.scss';
import Title from '../../components/title/title';

const PasswordPage = ({ history }) => {
    const [userEmail, setUserEmail] = useState('')

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await auth.sendPasswordResetEmail(userEmail)
            setUserEmail('')
            alert('Check your email for a reset password link')
            history.push('/signin')
        } catch (error) {
            console.log(error, 'trouble resetting password')
        }
    }

    const handleChange = (event) => {
        setUserEmail(event.target.value)
    }

    return (
        <div className='page-container'>
            <Title />
            <div className='password-page'>
                <div className='password'>
                    <h2 className='password-title'>Reset Your Password</h2>
                    <form className='password-form' onSubmit={handleSubmit} >
                        <FormInput 
                        name="email" 
                        type="email  " 
                        value={userEmail} 
                        label="email"
                        handleChange={handleChange} 
                        required 
                        />
                        <div className='buttons'>
                            <CustomButton type="submit" value="submit">Submit</CustomButton>
                        </div>
                        <div className='password-link-container'>
                            <Link className='password-link' to='/signin'>Take me back</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default withRouter(PasswordPage);