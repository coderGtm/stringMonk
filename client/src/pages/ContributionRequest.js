import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function ContributionRequest() {
    const { workspaceId } = useParams();
    const [requests, setRequests] = useState([]);
    const [locale, setLocale] = useState('');
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await axios.get(`/api/contribution-requests/${workspaceId}`, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setRequests(res.data);
        };

        fetchRequests();
    }, [auth, workspaceId]);

    const onChangeLocale = e => setLocale(e.target.value);

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/contribution-requests', { workspaceId, locale }, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setRequests([...requests, res.data]);
            setLocale('');
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h1>Contribution Requests</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={locale} onChange={onChangeLocale} placeholder="Locale" required />
                <button type="submit">Request Contribution</button>
            </form>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.locale} - {request.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContributionRequest;
