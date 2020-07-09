import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../../components/form-input/form-input';
import CustomButton from '../../components/custom-button/custom-button';
import { auth, createUserProfileDocument } from '../../firebase/firebase';
import Title from '../../components/title/title';

import './sign-up.scss';

const SignUpPage = () => {
    const [userCredentials, setCredentials ] = useState({ email: '', password: '', name: '', phone: '' })
    const { name, email, password, phone } = userCredentials

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { name, phone })
            setCredentials({email: '', password: '', name: '', phone: ''})
        } catch (error) {
            console.log(error, 'error signing up user');
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({...userCredentials, [name]: value })
    }

    return (
        <div className='page-container'>
            <Title />
            <div className='sign-up-page'>
                <div className='sign-up'>
                    <h2 className='sign-up-title'>Sign Up</h2>
                    <form className='sign-up-form' onSubmit={handleSubmit} >
                        <FormInput 
                        name="name" 
                        type="name" 
                        value={name} 
                        label="Full Name"
                        handleChange={handleChange} 
                        required 
                        /> 
                        <FormInput 
                        name="phone" 
                        type="phone" 
                        value={phone} 
                        label="Phone Number"
                        handleChange={handleChange} 
                        required 
                        /> 
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
                            <CustomButton type="submit" value="submit">Sign up</CustomButton>
                        </div>
                        <div className='sign-up-link-container'>
                            <Link className='sign-up-link' to='/signin'>I have an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;