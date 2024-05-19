import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function Strings() {
    const { workspaceId } = useParams();
    const [strings, setStrings] = useState([]);
    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchStrings = async () => {
            const res = await axios.get(`/api/strings/${workspaceId}`, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setStrings(res.data);
        };

        fetchStrings();
    }, [auth, workspaceId]);

    const onChangeKey = e => setKey(e.target.value);
    const onChangeValue = e => setValue(e.target.value);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/strings', { key, value, workspaceId }, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setStrings([...strings, res.data]);
            setKey('');
            setValue('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Strings</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={key} onChange={onChangeKey} placeholder="Key" required />
                <input type="text" value={value} onChange={onChangeValue} placeholder="Value" required />
                <button type="submit">Add String</button>
            </form>
            <ul>
                {strings.map(string => (
                    <li key={string._id}>{string.key}: {string.value}</li>
                ))}
            </ul>
        </div>
    );
}

export default Strings;
