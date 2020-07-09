import React from 'react';

import './custom-button.scss';

const CustomButton = ({ disabled, children, isGoogleSignIn, inverted, ...otherProps}) => (
    <button disabled={disabled} className={ ` ${disabled ? 'disabled' : ''} ${inverted ? 'inverted' : ''}  ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button `}  {...otherProps}>
        {children}
    </button>
)

export default CustomButton;