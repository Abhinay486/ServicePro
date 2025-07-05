import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User, Phone, MapPin, Star, Clock, Calendar, DollarSign, FileText, Users, LogOut, Settings, Home } from 'lucide-react';

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #F1FCFD 0%, #C7EEFF 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(100px);
  }
`;

const Sidebar = styled.div`
  width: 18rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(199, 238, 255, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(77, 109, 227, 0.1);
`;

const Header = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(199, 238, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1.5rem 1rem;
`;

const NavButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.5rem;
  border: none;
  background: transparent;
  color: #393737;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #4D6DE3, #393737);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 1rem;
  }

  &.active {
    color: #FFFFFF;
    transform: translateX(4px);
    box-shadow: 0 4px 20px rgba(77, 109, 227, 0.3);
    
    &::before {
      opacity: 1;
    }
    
    * {
      position: relative;
      z-index: 1;
    }
  }

  &:hover:not(.active) {
    background: rgba(77, 109, 227, 0.1);
    transform: translateX(2px);
    color: #4D6DE3;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  position: relative;
  z-index: 10;
  overflow-y: auto;
  max-height: 100vh;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(77, 109, 227, 0.1);
  border: 1px solid rgba(199, 238, 255, 0.3);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(77, 109, 227, 0.15);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(199, 238, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${props => props.gradient || '#4D6DE3, #393737'});
    opacity: 0.05;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 50px rgba(77, 109, 227, 0.15);
    
    &::before {
      opacity: 0.1;
    }
  }
`;

const BookingCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(199, 238, 255, 0.3);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 8px 25px rgba(77, 109, 227, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(77, 109, 227, 0.3);
    border-radius: 50%;
    border-top-color: #4D6E3;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #393737;
  
  .icon {
    opacity: 0.5;
    margin-bottom: 1rem;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #393737;
  border: none;
  background: rgba(77, 109, 227, 0.1);
  border-radius: 1rem;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: rgba(77, 109, 227, 0.2);
    transform: translateY(-1px);
  }
`;

// Other styled components can be defined similarly...

const ProfessionalDashboard = ({ user, userType, onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/professionals/${user.userId}/bookings`);
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.userId) fetchBookings();
  }, [user]);

  // Handle booking acceptance
  const handleAcceptBooking = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professionalId: user.userId
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking accepted successfully!');
        // Refresh bookings
        fetchBookings();
      } else {
        alert(data.error || 'Failed to accept booking');
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
      alert('Failed to accept booking. Please try again.');
    }
  };

  // Handle booking rejection
  const handleRejectBooking = async (bookingId) => {
    const rejectionReason = prompt('Please provide a reason for rejection (optional):');
    
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          professionalId: user.userId,
          rejectionReason: rejectionReason || 'No reason provided'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Booking rejected successfully.');
        // Refresh bookings
        fetchBookings();
      } else {
        alert(data.error || 'Failed to reject booking');
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
      alert('Failed to reject booking. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderDashboard = () => (
    <div>
      {/* Welcome Section */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ 
            width: '4rem', 
            height: '4rem', 
            background: 'linear-gradient(135deg, #4D6DE3, #393737)', 
            borderRadius: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginRight: '1rem'
          }}>
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#393737',
              margin: '0 0 0.5rem 0',
              background: 'linear-gradient(135deg, #4D6DE3, #393737)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Welcome back, {user?.name || user?.email || 'Professional'}!
            </h2>
            <p style={{ color: '#393737', fontSize: '1.1rem', margin: 0 }}>
              Here's your professional dashboard overview
            </p>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <StatsGrid>
        <StatsCard gradient="#4D6DE3, #393737">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(135deg, #4D6DE3, #393737)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#393737' }}>
              {bookings.length}
            </span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', margin: '0 0 0.5rem 0' }}>
            Total Bookings
          </h3>
          <p style={{ color: '#393737', fontSize: '0.9rem', margin: 0, opacity: 0.7 }}>
            All time bookings
          </p>
        </StatsCard>

        <StatsCard gradient="#4D6DE3, #C7EEFF">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(135deg, #4D6DE3, #C7EEFF)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Star className="h-5 w-5 text-white" />
            </div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#393737' }}>
              {bookings.filter(b => b.status === 'confirmed').length}
            </span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', margin: '0 0 0.5rem 0' }}>
            Confirmed
          </h3>
          <p style={{ color: '#393737', fontSize: '0.9rem', margin: 0, opacity: 0.7 }}>
            Confirmed bookings
          </p>
        </StatsCard>

        <StatsCard gradient="#C7EEFF, #F1FCFD">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(135deg, #C7EEFF, #F1FCFD)', 
              borderRadius: '0.75rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid #4D6DE3'
            }}>
              <Clock className="h-5 w-5" style={{ color: '#4D6DE3' }} />
            </div>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#393737' }}>
              {bookings.filter(b => b.status === 'pending').length}
            </span>
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', margin: '0 0 0.5rem 0' }}>
            Pending
          </h3>
          <p style={{ color: '#393737', fontSize: '0.9rem', margin: 0, opacity: 0.7 }}>
            Awaiting confirmation
          </p>
        </StatsCard>
      </StatsGrid>

      {/* Recent Bookings */}
      <Card>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: '#393737', 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center'
        }}>
          <FileText className="h-6 w-6 mr-2" style={{ color: '#4D6DE3' }} />
          Recent Bookings
        </h3>
        {loading ? (
          <LoadingSpinner>
            <div className="spinner"></div>
            <span style={{ marginLeft: '1rem', color: '#393737' }}>Loading bookings...</span>
          </LoadingSpinner>
        ) : bookings.length === 0 ? (
          <EmptyState>
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4 icon" />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '500', color: '#393737', marginBottom: '0.5rem' }}>
              No bookings yet
            </h4>
            <p style={{ color: '#393737', opacity: 0.7 }}>
              Your bookings will appear here once customers start booking your services
            </p>
          </EmptyState>
        ) : (
          <div>
            {bookings.slice(0, 5).map((booking, idx) => (
              <BookingCard key={booking._id || idx}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ 
                        width: '3rem', 
                        height: '3rem', 
                        background: 'linear-gradient(135deg, #4D6DE3, #393737)', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginRight: '1rem'
                      }}>
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p style={{ fontWeight: '600', color: '#393737', margin: '0 0 0.25rem 0' }}>
                          {booking.customer?.name || 'N/A'}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', color: '#393737', opacity: 0.7 }}>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span style={{ fontSize: '0.875rem' }}>
                            {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                          </span>
                          <span style={{ margin: '0 0.5rem' }}>•</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span style={{ fontSize: '0.875rem' }}>
                            {booking.time || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span style={{
                      padding: '0.5rem 1rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      borderRadius: '2rem',
                      background: booking.status === 'confirmed' ? 'rgba(77, 109, 227, 0.1)' :
                                 booking.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' :
                                 booking.status === 'cancelled' ? 'rgba(220, 53, 69, 0.1)' :
                                 'rgba(199, 238, 255, 0.3)',
                      color: booking.status === 'confirmed' ? '#4D6DE3' :
                             booking.status === 'pending' ? '#B8860B' :
                             booking.status === 'cancelled' ? '#DC3545' :
                             '#393737',
                      border: '1px solid',
                      borderColor: booking.status === 'confirmed' ? 'rgba(77, 109, 227, 0.2)' :
                                  booking.status === 'pending' ? 'rgba(255, 193, 7, 0.2)' :
                                  booking.status === 'cancelled' ? 'rgba(220, 53, 69, 0.2)' :
                                  'rgba(199, 238, 255, 0.5)'
                    }}>
                      {booking.status || 'pending'}
                    </span>
                  </div>
                  
                  {/* Service Details */}
                  <div style={{ 
                    padding: '0.75rem', 
                    background: 'rgba(77, 109, 227, 0.05)', 
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#393737' }}>
                      Service: {booking.service || 'N/A'}
                    </p>
                    {booking.customerAddress && (
                      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#393737' }}>
                        <MapPin className="h-4 w-4 inline mr-1" />
                        {booking.customerAddress}
                      </p>
                    )}
                    {booking.customer?.phone && (
                      <p style={{ margin: '0', fontSize: '0.875rem', color: '#393737' }}>
                        <Phone className="h-4 w-4 inline mr-1" />
                        {booking.customer.phone}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons for Pending Bookings */}
                  {booking.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleAcceptBooking(booking._id)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 1rem',
                          background: '#4D6DE3',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#3B5BDB'}
                        onMouseOut={(e) => e.target.style.background = '#4D6DE3'}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectBooking(booking._id)}
                        style={{
                          flex: 1,
                          padding: '0.5rem 1rem',
                          background: '#DC3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#C82333'}
                        onMouseOut={(e) => e.target.style.background = '#DC3545'}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </BookingCard>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderProfile = () => (
    <Card>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        color: '#393737', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <User className="h-6 w-6 mr-2" style={{ color: '#4D6DE3' }} />
        Profile Information
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <div style={{ 
            padding: '1.5rem', 
            background: 'rgba(77, 109, 227, 0.05)', 
            borderRadius: '1rem',
            border: '1px solid rgba(77, 109, 227, 0.1)'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', marginBottom: '1rem' }}>
              Contact Information
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <User className="h-4 w-4 mr-2" style={{ color: '#4D6DE3' }} />
              <span style={{ color: '#393737', fontWeight: '500' }}>
                {user?.name || user?.email || 'Professional'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <Phone className="h-4 w-4 mr-2" style={{ color: '#4D6DE3' }} />
              <span style={{ color: '#393737', opacity: 0.7 }}>
                {user?.phone || 'Not provided'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MapPin className="h-4 w-4 mr-2" style={{ color: '#4D6DE3' }} />
              <span style={{ color: '#393737', opacity: 0.7 }}>
                {user?.location || 'Not provided'}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ 
            padding: '1.5rem', 
            background: 'rgba(199, 238, 255, 0.3)', 
            borderRadius: '1rem',
            border: '1px solid rgba(199, 238, 255, 0.5)'
          }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', marginBottom: '1rem' }}>
              Professional Details
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
              <Star className="h-4 w-4 mr-2" style={{ color: '#4D6DE3' }} />
              <span style={{ color: '#393737', fontWeight: '500' }}>
                Rating: 4.8/5
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Users className="h-4 w-4 mr-2" style={{ color: '#4D6DE3' }} />
              <span style={{ color: '#393737', opacity: 0.7 }}>
                {bookings.length} Total Bookings
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderBookings = () => (
    <Card>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        color: '#393737', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Calendar className="h-6 w-6 mr-2" style={{ color: '#4D6DE3' }} />
        All Bookings
      </h3>
      
      {/* Booking Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255, 193, 7, 0.1)', 
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 193, 7, 0.2)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#B8860B', fontWeight: '600' }}>
            Pending: {bookings.filter(b => b.status === 'pending').length}
          </h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#393737' }}>Awaiting your response</p>
        </div>
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(77, 109, 227, 0.1)', 
          borderRadius: '0.75rem',
          border: '1px solid rgba(77, 109, 227, 0.2)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#4D6DE3', fontWeight: '600' }}>
            Confirmed: {bookings.filter(b => b.status === 'confirmed').length}
          </h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#393737' }}>Accepted bookings</p>
        </div>
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(220, 53, 69, 0.1)', 
          borderRadius: '0.75rem',
          border: '1px solid rgba(220, 53, 69, 0.2)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#DC3545', fontWeight: '600' }}>
            Cancelled: {bookings.filter(b => b.status === 'cancelled').length}
          </h4>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#393737' }}>Rejected bookings</p>
        </div>
      </div>
      
      {loading ? (
        <LoadingSpinner>
          <div className="spinner"></div>
          <span style={{ marginLeft: '1rem', color: '#393737' }}>Loading all bookings...</span>
        </LoadingSpinner>
      ) : bookings.length === 0 ? (
        <EmptyState>
          <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4 icon" />
          <h4 style={{ fontSize: '1.2rem', fontWeight: '500', color: '#393737', marginBottom: '0.5rem' }}>
            No bookings found
          </h4>
          <p style={{ color: '#393737', opacity: 0.7 }}>
            Your bookings will appear here once customers start booking your services
          </p>
        </EmptyState>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {bookings.map((booking, idx) => (
            <BookingCard key={booking._id || idx}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ 
                      width: '3rem', 
                      height: '3rem', 
                      background: 'linear-gradient(135deg, #4D6DE3, #393737)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p style={{ fontWeight: '600', color: '#393737', margin: '0 0 0.25rem 0' }}>
                        {booking.customer?.name || 'N/A'}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', color: '#393737', opacity: 0.7 }}>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span style={{ fontSize: '0.875rem' }}>
                          {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                        </span>
                        <span style={{ margin: '0 0.5rem' }}>•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span style={{ fontSize: '0.875rem' }}>
                          {booking.time || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    borderRadius: '2rem',
                    background: booking.status === 'confirmed' ? 'rgba(77, 109, 227, 0.1)' :
                               booking.status === 'pending' ? 'rgba(255, 193, 7, 0.1)' :
                               booking.status === 'cancelled' ? 'rgba(220, 53, 69, 0.1)' :
                               'rgba(199, 238, 255, 0.3)',
                    color: booking.status === 'confirmed' ? '#4D6DE3' :
                           booking.status === 'pending' ? '#B8860B' :
                           booking.status === 'cancelled' ? '#DC3545' :
                           '#393737',
                    border: '1px solid',
                    borderColor: booking.status === 'confirmed' ? 'rgba(77, 109, 227, 0.2)' :
                                booking.status === 'pending' ? 'rgba(255, 193, 7, 0.2)' :
                                booking.status === 'cancelled' ? 'rgba(220, 53, 69, 0.2)' :
                                'rgba(199, 238, 255, 0.5)'
                  }}>
                    {booking.status || 'pending'}
                  </span>
                </div>
                
                {/* Service Details */}
                <div style={{ 
                  padding: '0.75rem', 
                  background: 'rgba(77, 109, 227, 0.05)', 
                  borderRadius: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: '500', color: '#393737' }}>
                    Service: {booking.service || 'N/A'}
                  </p>
                  {booking.notes && (
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#393737' }}>
                      Notes: {booking.notes}
                    </p>
                  )}
                  {booking.customerAddress && (
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#393737' }}>
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {booking.customerAddress}
                    </p>
                  )}
                  {booking.customer?.phone && (
                    <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', color: '#393737' }}>
                      <Phone className="h-4 w-4 inline mr-1" />
                      {booking.customer.phone}
                    </p>
                  )}
                  {booking.customer?.email && (
                    <p style={{ margin: '0', fontSize: '0.875rem', color: '#393737' }}>
                      Email: {booking.customer.email}
                    </p>
                  )}
                </div>

                {/* Action Buttons for Pending Bookings */}
                {booking.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleAcceptBooking(booking._id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        background: '#4D6DE3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#3B5BDB'}
                      onMouseOut={(e) => e.target.style.background = '#4D6DE3'}
                    >
                      Accept Booking
                    </button>
                    <button
                      onClick={() => handleRejectBooking(booking._id)}
                      style={{
                        flex: 1,
                        padding: '0.75rem 1rem',
                        background: '#DC3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#C82333'}
                      onMouseOut={(e) => e.target.style.background = '#DC3545'}
                    >
                      Reject Booking
                    </button>
                  </div>
                )}
                
                {/* Show rejection reason if cancelled */}
                {booking.status === 'cancelled' && booking.rejectionReason && (
                  <div style={{ 
                    padding: '0.75rem', 
                    background: 'rgba(220, 53, 69, 0.1)', 
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(220, 53, 69, 0.2)'
                  }}>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: '#DC3545' }}>
                      Rejection reason: {booking.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            </BookingCard>
          ))}
        </div>
      )}
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        color: '#393737', 
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Settings className="h-6 w-6 mr-2" style={{ color: '#4D6DE3' }} />
        Settings
      </h3>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(77, 109, 227, 0.05)', 
          borderRadius: '1rem',
          border: '1px solid rgba(77, 109, 227, 0.1)'
        }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', marginBottom: '1rem' }}>
            Account Settings
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: '1px solid rgba(77, 109, 227, 0.3)',
              background: 'transparent',
              color: '#4D6DE3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}>
              Update Profile Information
            </button>
            <button style={{
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: '1px solid rgba(77, 109, 227, 0.3)',
              background: 'transparent',
              color: '#4D6DE3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}>
              Change Password
            </button>
          </div>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(199, 238, 255, 0.3)', 
          borderRadius: '1rem',
          border: '1px solid rgba(199, 238, 255, 0.5)'
        }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', marginBottom: '1rem' }}>
            Professional Settings
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: '1px solid rgba(77, 109, 227, 0.3)',
              background: 'transparent',
              color: '#4D6DE3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}>
              Manage Services
            </button>
            <button style={{
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: '1px solid rgba(77, 109, 227, 0.3)',
              background: 'transparent',
              color: '#4D6DE3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}>
              Set Availability
            </button>
            <button style={{
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              borderRadius: '0.5rem',
              border: '1px solid rgba(77, 109, 227, 0.3)',
              background: 'transparent',
              color: '#4D6DE3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left'
            }}>
              Pricing & Rates
            </button>
          </div>
        </div>
        
        <div style={{ 
          padding: '1.5rem', 
          background: 'rgba(241, 252, 253, 0.8)', 
          borderRadius: '1rem',
          border: '1px solid rgba(241, 252, 253, 0.8)'
        }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#393737', marginBottom: '1rem' }}>
            Notifications
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem', accentColor: '#4D6DE3' }} />
              <span style={{ color: '#393737' }}>Email notifications for new bookings</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem', accentColor: '#4D6DE3' }} />
              <span style={{ color: '#393737' }}>SMS notifications for confirmed bookings</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '0.5rem', accentColor: '#4D6DE3' }} />
              <span style={{ color: '#393737' }}>Weekly summary reports</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'profile':
        return renderProfile();
      case 'bookings':
        return renderBookings();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '3rem', 
              height: '3rem', 
              background: 'linear-gradient(135deg, #4D6DE3, #393737)', 
              borderRadius: '1rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#393737',
                margin: '0 0 0.25rem 0'
              }}>
                Professional
              </h1>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#393737',
                margin: 0,
                opacity: 0.7
              }}>
                Dashboard
              </p>
            </div>
          </div>
        </Header>

        <Nav>
          <div>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavButton
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={activeTab === item.id ? 'active' : ''}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </NavButton>
              );
            })}
          </div>
        </Nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <LogoutButton onClick={onLogout}>
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </LogoutButton>
        </div>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default ProfessionalDashboard;
