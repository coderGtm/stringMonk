import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Workspaces() {
    const [workspaces, setWorkspaces] = useState([]);
    const [name, setName] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        console.log("Fetching workspaces with token:", auth);
        const fetchWorkspaces = async () => {
            const res = await axios.get('/api/workspaces', {
                headers: {
                    'x-auth-token': auth
                }
            });
            console.log("Workspaces response:", res.data);
            setWorkspaces(res.data);
        };

        fetchWorkspaces();
    }, [auth]);

    const onChange = e => setName(e.target.value);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/workspaces', { name }, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setWorkspaces([...workspaces, res.data]);
            setName('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Workspaces</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={name} onChange={onChange} placeholder="Workspace Name" required />
                <button type="submit">Create Workspace</button>
            </form>
            <ul>
                {workspaces.map(workspace => (
                    <li key={workspace._id}>{workspace.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Workspaces;
