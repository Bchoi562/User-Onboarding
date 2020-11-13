import React from 'react';

export default function Form(props){
    const {values, submit, change, disabled, errors} = props;

    const onSubmit = (evt) =>{
        evt.preventDefault();
        submit();
    };

    const onChange = (evt) => {
        const {name, value, checked, type} = evt.target;
        const correctValue = type === 'checkbox' ? checked : value;
        change(name, correctValue);
    };

    return(
        <form className='form container' onSubmit={onSubmit}>
            <div className='form-group submit'>
                <h2>Add a User</h2>
                <button disabled={disabled}>submit</button>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.Password}</div>
                    <div>{errors.TermsOfService}</div>
                </div>
            </div>

            <div className='form-group inputs'>
                <h4>General Information</h4>
                <label>
                    Name
                    <input
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />

                </label>

                <label>
                    Email
                        <input
                            value={values.email}
                            onChange={onChange}
                            name='email'
                            type='text'
                        />
                </label>

                <label>
                    Password
                        <input
                            value={values.Password}
                            onChange={onChange}
                            name='Password'
                            type='text'
                        />
                </label>
                
                <label>
                    Role
                        <select>
                            <option value='1'>Front-end</option>
                            <option value='2'>Back-end</option>
                            <option value='3'>Full Stack</option>

                        </select>
                </label>

                <label>
                    Terms Of Service
                        <input
                            type='checkbox'
                            name='TermsOfService'
                            value='TermsOfService'
                            checked={values.TermsOfService}
                            onChange={onChange}
                        />
                </label>
            </div>
        </form>
    )
}