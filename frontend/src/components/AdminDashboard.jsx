import React, { useState, useEffect } from 'react';

export const AdminDashboard = ({ user, onLogout, userType }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingId, setProcessingId] = useState(null);

    // Fetch applications on component mount
    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/admin/professional-applications');
            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }
            const data = await response.json();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (applicationId) => {
        try {
            setProcessingId(applicationId);
            const response = await fetch(`http://localhost:5000/api/admin/professional-applications/${applicationId}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to approve application');
            }
            
            const result = await response.json();
            
            // Update local state
            setApplications(applications.map(app => 
                app._id === applicationId 
                    ? { ...app, status: 'approved' }
                    : app
            ));
            
            alert(`Application approved! Default password: ${result.defaultPassword}`);
        } catch (err) {
            alert(`Error approving application: ${err.message}`);
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (applicationId) => {
        try {
            setProcessingId(applicationId);
            const response = await fetch(`http://localhost:5000/api/admin/professional-applications/${applicationId}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error('Failed to reject application');
            }
            
            // Update local state
            setApplications(applications.map(app => 
                app._id === applicationId 
                    ? { ...app, status: 'rejected' }
                    : app
            ));
            
            alert('Application rejected successfully');
        } catch (err) {
            alert(`Error rejecting application: ${err.message}`);
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
        <div className="admin-dashboard" style={{
            padding: '2rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            background: '#f5f5f7',
            minHeight: '100vh'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '2rem'
            }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    color: '#1d1d1f',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                }}>Admin Dashboard</h1>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#86868b',
                        margin: 0
                    }}>Welcome back, {user?.name || 'Administrator'}!</p>
                    
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
                        onMouseOver={(e) => e.target.style.background = '#e55a2b'}
                        onMouseOut={(e) => e.target.style.background = '#ff6b35'}
                    >
                        Logout
                    </button>
                </div>
                
                <p style={{
                    fontSize: '1rem',
                    color: '#86868b',
                    textAlign: 'center',
                    marginBottom: '2rem'
                }}>Manage professional applications and system settings</p>

                {/* Statistics */}
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
    );
}