import React from 'react';

import './form-input.scss';

const FormInput = ({ handleChange, label, edit, ...otherProps }) => {

    return (
        <div className="group" style={{margin: (edit) ? '25px 0' : '25px 0'}}>
            <input className="form-input" onChange={handleChange} {...otherProps} />
            {label ? (
                <label className={`${otherProps.value ? 'shrink' : ""} form-input-label`}>
                    {label}
                </label>
            ) : null
            }
        </div>
    )
}

export default FormInput;