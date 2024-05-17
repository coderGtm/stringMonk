import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/register', formData);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" required />
            </div>
            <div>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            </div>
            <div>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
