import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function AdminDashboard() {
    const { workspaceId } = useParams();
    const [requests, setRequests] = useState([]);
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

    const updateRequestStatus = async (requestId, status) => {
        try {
            const res = await axios.put(`/api/contribution-requests/${requestId}`, { status }, {
                headers: {
                    'x-auth-token': auth
                }
            });
            setRequests(requests.map(req => req._id === requestId ? res.data : req));
        } catch (err) {
            console.error(err.response.data);
        }
    };

    const downloadStrings = async () => {
        try {
            const res = await axios.get(`/api/strings/${workspaceId}/download`, {
                headers: {
                    'x-auth-token': auth
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/xml' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'strings.xml');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <button onClick={downloadStrings}>Download strings.xml</button>
            <ul>
                {requests.map(request => (
                    <li key={request._id}>
                        {request.locale} - {request.status}
                        {request.status === 'pending' && (
                            <>
                                <button onClick={() => updateRequestStatus(request._id, 'approved')}>Approve</button>
                                <button onClick={() => updateRequestStatus(request._id, 'rejected')}>Reject</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;
