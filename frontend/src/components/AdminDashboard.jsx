import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AdminDashboard = ({ user, onLogout, userType }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);
    
    // Helper to get JWT token from localStorage
    const getToken = () => localStorage.getItem('servicepro_jwt_token');

    // Fetch all applications on mount
    useEffect(() => {
        fetchApplications();
    }, []);
    // Fetch all professional applications
    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/professionals/applications`, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const data = await response.json();
            console.log('Fetched applications:', data);
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Approve application (PUT)
    const handleApprove = async (applicationId) => {
        try {
            setProcessingId(applicationId);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/professionals/${applicationId}/approve`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to approve application');
            }
            const result = await response.json();
            setApplications(applications.map(app =>
                app._id === applicationId
                    ? { ...app, status: 'approved' }
                    : app
            ));
            toast.success(`Application approved! Default password: ${result.defaultPassword}`);
        } catch (err) {
            toast.error(`Error approving application: ${err.message}`);
        } finally {
            setProcessingId(null);
        }
    };

    // Reject application (DELETE)
    const handleReject = async (applicationId) => {
        try {
            setProcessingId(applicationId);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/professionals/${applicationId}/reject`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to reject application');
            }
            setApplications(applications.map(app =>
                app._id === applicationId
                    ? { ...app, status: 'rejected' }
                    : app
            ));
            toast.success('Application rejected successfully');
        } catch (err) {
            toast.error(`Error rejecting application: ${err.message}`);
        } finally {
            setProcessingId(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#ffa500';
            case 'approved': return '#4caf50';
            case 'rejected': return '#f44336';
            default: return '#757575';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: '#f5f5f7', minHeight: '100vh' }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '2rem'
            }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d1d1f', marginBottom: '0.5rem', textAlign: 'center' }}>Admin Dashboard</h1>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                    <button
                        onClick={onLogout}
                        style={{
                            background: '#ff6b35',
                            color: '#ffffff',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={e => e.target.style.background = '#e55a2b'}
                        onMouseOut={e => e.target.style.background = '#ff6b35'}
                    >
                        Logout
                    </button>
                </div>
                
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#ffa500', fontSize: '2rem', margin: '0' }}>
                            {applications.filter(app => app.status === 'pending').length}
                        </h3>
                        <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Pending</p>
                    </div>
                    <div style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#4caf50', fontSize: '2rem', margin: '0' }}>
                            {applications.filter(app => app.status === 'approved').length}
                        </h3>
                        <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Approved</p>
                    </div>
                    <div style={{
                        background: '#f8f9fa',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#f44336', fontSize: '2rem', margin: '0' }}>
                            {applications.filter(app => app.status === 'rejected').length}
                        </h3>
                        <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>Rejected</p>
                    </div>
                </div>

                {/* Applications List */}
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#1d1d1f',
                        marginBottom: '1rem'
                    }}>Professional Applications</h2>
                    
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '2rem' }}>
                            <p>Loading applications...</p>
                        </div>
                    )}
                    
                    {error && (
                        <div style={{
                            background: '#ffebee',
                            color: '#c62828',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                        }}>
                            Error: {error}
                        </div>
                    )}
                    
                    {!loading && !error && applications.length === 0 && (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            color: '#666'
                        }}>
                            No applications found.
                        </div>
                    )}
                    
                    {!loading && !error && applications.length > 0 && (
                        <div style={{
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            {applications.map((application) => (
                                <div key={application._id} style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    padding: '1.5rem',
                                    background: '#ffffff'
                                }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr auto',
                                        gap: '1rem',
                                        alignItems: 'start'
                                    }}>
                                        <div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: '600',
                                                    color: '#1d1d1f',
                                                    margin: '0'
                                                }}>{application.name}</h3>
                                                <span style={{
                                                    background: getStatusColor(application.status),
                                                    color: '#ffffff',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {application.status}
                                                </span>
                                            </div>
                                            
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                                gap: '1rem',
                                                marginTop: '1rem'
                                            }}>
                                                <div>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Email:</strong> {application.email}
                                                    </p>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Phone:</strong> {application.phone}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Service:</strong> {application.service}
                                                    </p>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Experience:</strong> {application.experience}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Location:</strong> {application.location}
                                                    </p>
                                                    <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                        <strong>Rate:</strong> ₹{application.hourlyRate}/hour
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div style={{ marginTop: '1rem' }}>
                                                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                    <strong>Description:</strong>
                                                </p>
                                                <p style={{
                                                    margin: '0.5rem 0',
                                                    padding: '0.75rem',
                                                    background: '#f8f9fa',
                                                    borderRadius: '6px',
                                                    color: '#333',
                                                    fontSize: '0.95rem'
                                                }}>
                                                    {application.description}
                                                </p>
                                            </div>
                                            
                                            <p style={{ margin: '0.5rem 0 0 0', color: '#999', fontSize: '0.9rem' }}>
                                                Applied: {formatDate(application.createdAt)}
                                            </p>
                                        </div>
                                        
                                        {application.status === 'pending' && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem'
                                            }}>
                                                <button
                                                    onClick={() => handleApprove(application._id)}
                                                    disabled={processingId === application._id}
                                                    style={{
                                                        background: '#4caf50',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '6px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        cursor: processingId === application._id ? 'not-allowed' : 'pointer',
                                                        opacity: processingId === application._id ? 0.7 : 1,
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        if (processingId !== application._id) {
                                                            e.target.style.background = '#45a049';
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (processingId !== application._id) {
                                                            e.target.style.background = '#4caf50';
                                                        }
                                                    }}
                                                >
                                                    {processingId === application._id ? 'Processing...' : 'Approve'}
                                                </button>
                                                
                                                <button
                                                    onClick={() => handleReject(application._id)}
                                                    disabled={processingId === application._id}
                                                    style={{
                                                        background: '#f44336',
                                                        color: '#ffffff',
                                                        border: 'none',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '6px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '500',
                                                        cursor: processingId === application._id ? 'not-allowed' : 'pointer',
                                                        opacity: processingId === application._id ? 0.7 : 1,
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        if (processingId !== application._id) {
                                                            e.target.style.background = '#d32f2f';
                                                        }
                                                    }}
                                                    onMouseOut={(e) => {
                                                        if (processingId !== application._id) {
                                                            e.target.style.background = '#f44336';
                                                        }
                                                    }}
                                                >
                                                    {processingId === application._id ? 'Processing...' : 'Reject'}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminDashboard;