import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import { auth } from '../../firebase/firebase';

import './sign-in.scss';
import Title from '../../components/title/title';

const SignInPage = () => {
    const [userCredentials, setCredentials ] = useState({ email: '', password: '' })
    const { email, password } = userCredentials

    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setCredentials({email: '', password: ''})
        } catch (error) {
            console.log(error, 'trouble signing in')
        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target;
        setCredentials({...userCredentials, [name]: value })
    }

    return (
        <div className='page-container'>
            <Title />
            <div className='sign-in-page'>
                <div className='sign-in'>
                    <h2 className='sign-in-title'>Sign In</h2>
                    <form className='sign-in-form' onSubmit={handleSubmit} >
                        <FormInput 
                        name="email" 
                        type="email" 
                        value={email} 
                        label="Email"
                        handleChange={handleChange} 
                        required 
                        /> 
                        <FormInput 
                        name="password" 
                        type="password" 
                        value={password} 
                        label="Password"
                        handleChange={handleChange} 
                        required 
                        />
                        <div className='buttons'>
                            <CustomButton type="submit" value="submit">Sign In</CustomButton>
                        </div>
                        <div className='sign-in-link-container'>
                            <Link className='sign-in-link' to='/signup'>I don't have an account</Link>
                            <Link className='sign-in-link' to='/password'>Forgot your password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default withRouter(SignInPage);