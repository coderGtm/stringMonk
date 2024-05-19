import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useContext(AuthContext);

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', formData);
            login(res.data.token);
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
            </div>
            <div>
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
