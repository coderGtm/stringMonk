import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Workspaces from './pages/Workspaces';
import Strings from './pages/Strings';
import ContributionRequest from './pages/ContributionRequest';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/workspaces" 
                    element={
                        <PrivateRoute>
                            <Workspaces />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/workspaces/:workspaceId/strings" 
                    element={
                        <PrivateRoute>
                            <Strings />
                        </PrivateRoute>
                    } 
                />
                <Route 
                    path="/workspaces/:workspaceId/contribution-requests" 
                    element={
                        <PrivateRoute>
                            <ContributionRequest />
                        </PrivateRoute>
                    } 
                />
                </Routes>
        </Router>
    );
}

export default App;
