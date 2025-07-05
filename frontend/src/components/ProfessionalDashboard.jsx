import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User, Phone, MapPin, Star, Clock, Calendar, DollarSign, FileText, Users, LogOut, Settings, Home } from 'lucide-react';

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background-color: #f9fafb; /* gray-50 */
`;

const Sidebar = styled.div`
  width: 16rem; /* 64 */
  background-color: #ffffff; /* white */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #e5e7eb; /* gray-200 */
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1.5rem; /* 6 */
  border-bottom: 1px solid #e5e7eb; /* gray-200 */
`;

const Nav = styled.nav`
  flex: 1;
  padding: 1rem; /* 4 */
`;

const NavButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem; /* 3 */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  border-radius: 0.5rem; /* rounded-lg */
  transition: background-color 0.2s, color 0.2s;

  &.active {
    background-color: #eff6ff; /* blue-50 */
    color: #3b82f6; /* blue-700 */
    border-right: 2px solid #2563eb; /* blue-600 */
  }

  &:hover {
    background-color: #f3f4f6; /* gray-50 */
    color: #111827; /* gray-900 */
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem; /* 8 */
`;

const Card = styled.div`
  background-color: #ffffff; /* white */
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb; /* gray-200 */
  padding: 1.5rem; /* 6 */
  margin-bottom: 1.5rem; /* 6 */
`;

// Other styled components can be defined similarly...

const ProfessionalDashboard = ({ user, userType, onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/professionals/${user.userId}/bookings`);
        const data = await res.json();
        setBookings(data);
      } catch {
        setBookings([]);
      }
      setLoading(false);
    }
    if (user?.userId) fetchBookings();
  }, [user]);

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
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || user?.email || 'Professional'}!
        </h2>
        <p className="text-gray-600">Here's an overview of your professional dashboard</p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        {/* Similar to the previous implementation */}
      </div>

      {/* Recent Bookings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading bookings...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No bookings yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking, idx) => (
              <div key={booking._id || idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User  className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{booking.customerName || 'N/A'}</p>
                    <p className="text-sm text-gray-600">{booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status || 'pending'}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderProfile = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h3>
      {/* Profile Information */}
    </Card>
  );

  const renderBookings = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">All Bookings</h3>
      {/* All Bookings Table */}
    </Card>
  );

  const renderSettings = () => (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
      {/* Settings Options */}
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
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User  className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">Professional</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </Header>

        <Nav>
          <div className="space-y-2">
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

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>
    </DashboardContainer>
  );
};

export default ProfessionalDashboard;
