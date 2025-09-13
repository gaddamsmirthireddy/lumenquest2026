import React, { useState } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import { 
  Users, Package, TrendingUp, DollarSign, Plus, Edit, Trash2, 
  Search, Filter, Bell, Settings, LogOut
} from 'lucide-react'

const AdminDashboard = () => {
  // Inline Styles
  const styles = {
    adminDashboard: {
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f5f7fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    dashboardHeader: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%)',
      color: 'white',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    headerTitle: {
      margin: 0,
      fontSize: '1.6rem',
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    headerSubtitle: {
      margin: '0.25rem 0 0 0',
      opacity: 0.8,
      fontSize: '0.85rem',
      fontWeight: 400
    },
    headerRight: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    btnIcon: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      padding: '0.75rem',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    },
    dashboardNav: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
      padding: '0 2rem',
      display: 'flex',
      gap: '0.25rem',
      borderBottom: '2px solid #e2e8f0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: '72px',
      zIndex: 90
    },
    navItem: {
      background: 'transparent',
      border: 'none',
      padding: '1.25rem 2rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#374151',
      fontWeight: 600,
      fontSize: '0.95rem',
      borderRadius: '12px 12px 0 0',
      borderBottom: '4px solid transparent',
      transition: 'all 0.3s ease',
      position: 'relative',
      textTransform: 'uppercase',
      letterSpacing: '0.025em'
    },
    navItemActive: {
      color: '#1e40af',
      borderBottomColor: '#3b82f6',
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
      transform: 'translateY(-2px)'
    },
    dashboardContent: {
      padding: '2rem',
      width: '100%',
      margin: '0',
      paddingTop: '3rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statIcon: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    statTitle: {
      margin: '0 0 0.5rem 0',
      color: '#6b7280',
      fontSize: '0.9rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    statNumber: {
      margin: '0 0 0.5rem 0',
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937'
    },
    statChange: {
      fontSize: '0.8rem',
      fontWeight: 500,
      color: '#10b981'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '1.5rem',
      marginBottom: '3rem'
    },
    chartContainer: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb'
    },
    chartTitle: {
      margin: '0 0 1rem 0',
      color: '#1f2937',
      fontSize: '1.1rem',
      fontWeight: 600
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      margin: 0,
      color: '#1f2937',
      fontSize: '1.5rem',
      fontWeight: 600
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    btnSecondary: {
      background: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    searchFilter: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.9rem',
      width: '250px'
    },
    searchIcon: {
      position: 'absolute',
      left: '0.75rem',
      color: '#9ca3af',
      zIndex: 1
    },
    tableContainer: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      overflowX: 'auto',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      width: '100%'
    },
    dataTable: {
      width: '100%',
      minWidth: '800px',
      borderCollapse: 'collapse'
    },
    tableHeader: {
      background: '#f9fafb',
      padding: '1rem',
      textAlign: 'left',
      fontWeight: 600,
      color: '#374151',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '0.9rem',
      textTransform: 'uppercase'
    },
    tableCell: {
      padding: '1rem',
      borderBottom: '1px solid #f3f4f6',
      color: '#1f2937'
    },
    statusActive: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      background: '#d1fae5',
      color: '#065f46'
    },
    statusCancelled: {
      padding: '0.25rem 0.75rem',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 500,
      textTransform: 'uppercase',
      background: '#fee2e2',
      color: '#991b1b'
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem'
    }
  }

  const [activeTab, setActiveTab] = useState('overview')
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', description: 'Essential features for individuals', price: 9.99, duration: 1, features: ['Feature A', 'Feature B'], isActive: true, subscribers: 1250 },
    { id: 2, name: 'Pro Plan', description: 'Advanced features for professionals', price: 29.99, duration: 1, features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'], isActive: true, subscribers: 850 },
    { id: 3, name: 'Premium Plan', description: 'All features for enterprises', price: 99.99, duration: 12, features: ['All Features', 'Priority Support', 'Custom Integration'], isActive: true, subscribers: 420 },
    { id: 4, name: 'Student Plan', description: 'Discounted plan for students', price: 4.99, duration: 1, features: ['Feature A', 'Feature B'], isActive: true, subscribers: 980 },
    { id: 5, name: 'Enterprise Plan', description: 'Custom solution for large organizations', price: 199.99, duration: 12, features: ['All Features', 'Dedicated Support', 'Custom Development'], isActive: true, subscribers: 150 }
  ])

  const [users, setUsers] = useState([
    { id: 'U001', name: 'John Doe', email: 'john@example.com', role: 'user', activeSubscription: 'Pro Plan', joinDate: '2024-01-15', status: 'Active' },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', role: 'user', activeSubscription: 'Basic Plan', joinDate: '2024-01-20', status: 'Active' },
    { id: 'U003', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', activeSubscription: null, joinDate: '2024-01-10', status: 'Inactive' },
    { id: 'U004', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', activeSubscription: 'Premium Plan', joinDate: '2024-01-25', status: 'Active' },
    { id: 'U005', name: 'Alex Chen', email: 'alex@example.com', role: 'user', activeSubscription: 'Student Plan', joinDate: '2024-02-01', status: 'Active' }
  ])

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, userId: 'U001', userName: 'John Doe', planName: 'Pro Plan', status: 'active', startDate: '2024-01-15', endDate: '2024-02-15', autoRenew: true, paidAmount: 29.99 },
    { id: 2, userId: 'U002', userName: 'Jane Smith', planName: 'Basic Plan', status: 'active', startDate: '2024-01-20', endDate: '2024-02-20', autoRenew: true, paidAmount: 9.99 },
    { id: 3, userId: 'U003', userName: 'Mike Johnson', planName: 'Pro Plan', status: 'cancelled', startDate: '2024-01-10', endDate: '2024-02-10', autoRenew: false, paidAmount: 29.99 },
    { id: 4, userId: 'U004', userName: 'Sarah Wilson', planName: 'Premium Plan', status: 'active', startDate: '2024-01-25', endDate: '2025-01-25', autoRenew: true, paidAmount: 99.99 },
    { id: 5, userId: 'U005', userName: 'Alex Chen', planName: 'Student Plan', status: 'active', startDate: '2024-02-01', endDate: '2024-03-01', autoRenew: true, paidAmount: 4.99 }
  ])

  const [discounts, setDiscounts] = useState([
    { id: 1, planId: 1, planName: 'Basic Plan', percentage: 20, validUntil: '2024-03-31', description: 'New Year Offer', status: 'Active' },
    { id: 2, planId: 4, planName: 'Student Plan', percentage: 50, validUntil: '2024-12-31', description: 'Student Discount', status: 'Active' },
    { id: 3, planId: 3, planName: 'Premium Plan', percentage: 15, validUntil: '2024-06-30', description: 'Loyalty Bonus', status: 'Active' }
  ])

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'User Registration', performedBy: 'System', entityType: 'User', entityId: 'U005', timestamp: '2024-02-01T10:30:00Z', actionDetails: 'New user registered' },
    { id: 2, action: 'Plan Created', performedBy: 'Admin User', entityType: 'Plan', entityId: '5', timestamp: '2024-01-30T14:20:00Z', actionDetails: 'Enterprise Plan created' },
    { id: 3, action: 'Subscription Cancelled', performedBy: 'Mike Johnson', entityType: 'Subscription', entityId: '3', timestamp: '2024-01-28T09:15:00Z', actionDetails: 'User cancelled Pro Plan subscription' },
    { id: 4, action: 'Discount Applied', performedBy: 'Admin User', entityType: 'Discount', entityId: '2', timestamp: '2024-01-25T16:45:00Z', actionDetails: 'Student discount applied to Student Plan' }
  ])

  // Analytics data
  const monthlySubscriptions = [
    { month: 'Jan', active: 3200, cancelled: 150, new: 280 },
    { month: 'Feb', active: 3350, cancelled: 120, new: 270 },
    { month: 'Mar', active: 3500, cancelled: 100, new: 250 },
    { month: 'Apr', active: 3650, cancelled: 80, new: 230 },
    { month: 'May', active: 3800, cancelled: 90, new: 240 },
    { month: 'Jun', active: 3950, cancelled: 70, new: 220 }
  ]

  const planPopularity = [
    { name: 'Fibernet Basic', value: 1250, color: '#8884d8' },
    { name: 'Fibernet Pro', value: 850, color: '#82ca9d' },
    { name: 'Fibernet Premium', value: 420, color: '#ffc658' },
    { name: 'Copper Basic', value: 980, color: '#ff7c7c' },
    { name: 'Copper Standard', value: 650, color: '#8dd1e1' }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 2850000 },
    { month: 'Feb', revenue: 3100000 },
    { month: 'Mar', revenue: 3250000 },
    { month: 'Apr', revenue: 3400000 },
    { month: 'May', revenue: 3550000 },
    { month: 'Jun', revenue: 3700000 }
  ]

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== planId))
    }
  }

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const renderUserManagement = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>User Management</h2>
        <div style={styles.searchFilter}>
          <div style={styles.searchBox}>
            <Search size={16} style={styles.searchIcon} />
            <input type="text" placeholder="Search users..." style={styles.searchInput} />
          </div>
          <button style={styles.btnSecondary}>
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Active Subscription</th>
              <th style={styles.tableHeader}>Join Date</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.name}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    background: user.role === 'admin' ? '#dbeafe' : '#f3f4f6',
                    color: user.role === 'admin' ? '#1e40af' : '#374151'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={styles.tableCell}>{user.activeSubscription || 'None'}</td>
                <td style={styles.tableCell}>{user.joinDate}</td>
                <td style={styles.tableCell}>
                  <span style={user.status === 'Active' ? styles.statusActive : styles.statusCancelled}>
                    {user.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon}>
                      <Edit size={16} />
                    </button>
                    <button style={styles.btnIcon}>
                      <Settings size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderSystemMonitoring = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>System Monitoring</h2>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Users />
          </div>
          <div>
            <h3 style={styles.statTitle}>Total Users</h3>
            <p style={styles.statNumber}>{users.length}</p>
            <span style={styles.statChange}>+2 new this week</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Package />
          </div>
          <div>
            <h3 style={styles.statTitle}>Active Subscriptions</h3>
            <p style={styles.statNumber}>{subscriptions.filter(s => s.status === 'active').length}</p>
            <span style={styles.statChange}>+3 this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <DollarSign />
          </div>
          <div>
            <h3 style={styles.statTitle}>Monthly Revenue</h3>
            <p style={styles.statNumber}>${subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.paidAmount, 0).toFixed(2)}</p>
            <span style={styles.statChange}>+12% from last month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <TrendingUp />
          </div>
          <div>
            <h3 style={styles.statTitle}>System Health</h3>
            <p style={styles.statNumber}>99.9%</p>
            <span style={styles.statChange}>All systems operational</span>
          </div>
        </div>
      </div>

      <div style={{marginTop: '2rem'}}>
        <h3 style={{...styles.sectionTitle, fontSize: '1.2rem', marginBottom: '1rem'}}>Recent Audit Logs</h3>
        <div style={styles.tableContainer}>
          <table style={styles.dataTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Timestamp</th>
                <th style={styles.tableHeader}>Action</th>
                <th style={styles.tableHeader}>Performed By</th>
                <th style={styles.tableHeader}>Entity Type</th>
                <th style={styles.tableHeader}>Entity ID</th>
                <th style={styles.tableHeader}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map(log => (
                <tr key={log.id}>
                  <td style={styles.tableCell}>{new Date(log.timestamp).toLocaleString()}</td>
                  <td style={styles.tableCell}>{log.action}</td>
                  <td style={styles.tableCell}>{log.performedBy}</td>
                  <td style={styles.tableCell}>{log.entityType}</td>
                  <td style={styles.tableCell}>{log.entityId}</td>
                  <td style={styles.tableCell}>{log.actionDetails}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderOverview = () => (
    <div style={{paddingTop: '1rem'}}>
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Users />
          </div>
          <div>
            <h3 style={styles.statTitle}>Total Subscribers</h3>
            <p style={styles.statNumber}>4,150</p>
            <span style={styles.statChange}>+5.2% from last month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Package />
          </div>
          <div>
            <h3 style={styles.statTitle}>Active Plans</h3>
            <p style={styles.statNumber}>{plans.filter(p => p.status === 'Active').length}</p>
            <span style={styles.statChange}>+2 new plans</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <DollarSign />
          </div>
          <div>
            <h3 style={styles.statTitle}>Monthly Revenue</h3>
            <p style={styles.statNumber}>₹37,00,000</p>
            <span style={styles.statChange}>+8.1% from last month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <TrendingUp />
          </div>
          <div>
            <h3 style={styles.statTitle}>Growth Rate</h3>
            <p style={styles.statNumber}>12.5%</p>
            <span style={styles.statChange}>+2.3% improvement</span>
          </div>
        </div>
      </div>

      <div style={{...styles.chartsGrid, marginTop: '2rem'}}>
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Subscription Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySubscriptions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#8884d8" name="Active" />
              <Line type="monotone" dataKey="new" stroke="#82ca9d" name="New" />
              <Line type="monotone" dataKey="cancelled" stroke="#ff7c7c" name="Cancelled" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Plan Popularity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planPopularity}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}`}
              >
                {planPopularity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${(value/100000).toFixed(1)}L`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )

  const renderPlansManagement = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Plans Management</h2>
        <button style={styles.btnPrimary}>
          <Plus size={16} />
          Add New Plan
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Plan Name</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Price ($)</th>
              <th style={styles.tableHeader}>Duration (months)</th>
              <th style={styles.tableHeader}>Features</th>
              <th style={styles.tableHeader}>Subscribers</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td style={styles.tableCell}>{plan.name}</td>
                <td style={styles.tableCell}>{plan.description}</td>
                <td style={styles.tableCell}>${plan.price}</td>
                <td style={styles.tableCell}>{plan.duration}</td>
                <td style={styles.tableCell}>{plan.features.slice(0, 2).join(', ')}{plan.features.length > 2 ? '...' : ''}</td>
                <td style={styles.tableCell}>{plan.subscribers}</td>
                <td style={styles.tableCell}>
                  <span style={plan.isActive ? styles.statusActive : styles.statusCancelled}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon}>
                      <Edit size={16} />
                    </button>
                    <button 
                      style={{...styles.btnIcon, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444'}}
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderSubscriptionsManagement = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Subscriptions Management</h2>
        <div style={styles.searchFilter}>
          <div style={styles.searchBox}>
            <Search size={16} style={styles.searchIcon} />
            <input type="text" placeholder="Search subscriptions..." style={styles.searchInput} />
          </div>
          <button style={styles.btnSecondary}>
            <Filter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>User ID</th>
              <th style={styles.tableHeader}>User Name</th>
              <th style={styles.tableHeader}>Plan</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Start Date</th>
              <th style={styles.tableHeader}>End Date</th>
              <th style={styles.tableHeader}>Auto Renew</th>
              <th style={styles.tableHeader}>Paid Amount</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(sub => (
              <tr key={sub.id}>
                <td style={styles.tableCell}>{sub.userId}</td>
                <td style={styles.tableCell}>{sub.userName}</td>
                <td style={styles.tableCell}>{sub.planName}</td>
                <td style={styles.tableCell}>
                  <span style={sub.status === 'active' ? styles.statusActive : styles.statusCancelled}>
                    {sub.status}
                  </span>
                </td>
                <td style={styles.tableCell}>{sub.startDate}</td>
                <td style={styles.tableCell}>{sub.endDate}</td>
                <td style={styles.tableCell}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    background: sub.autoRenew ? '#d1fae5' : '#fee2e2',
                    color: sub.autoRenew ? '#065f46' : '#991b1b'
                  }}>
                    {sub.autoRenew ? 'Yes' : 'No'}
                  </span>
                </td>
                <td style={styles.tableCell}>${sub.paidAmount}</td>
                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon}>
                      <Edit size={16} />
                    </button>
                    <button style={styles.btnIcon}>
                      <Bell size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const renderDiscountsManagement = () => (
    <div>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>Discounts Management</h2>
        <button style={styles.btnPrimary}>
          <Plus size={16} />
          Create Discount
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Plan Name</th>
              <th style={styles.tableHeader}>Discount %</th>
              <th style={styles.tableHeader}>Description</th>
              <th style={styles.tableHeader}>Valid Until</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map(discount => (
              <tr key={discount.id}>
                <td style={styles.tableCell}>{discount.planName}</td>
                <td style={styles.tableCell}>{discount.percentage}%</td>
                <td style={styles.tableCell}>{discount.description}</td>
                <td style={styles.tableCell}>{discount.validUntil}</td>
                <td style={styles.tableCell}>
                  <span style={discount.status === 'Active' ? styles.statusActive : styles.statusCancelled}>
                    {discount.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <div style={styles.actionButtons}>
                    <button style={styles.btnIcon}>
                      <Edit size={16} />
                    </button>
                    <button style={{...styles.btnIcon, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444'}}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div style={styles.adminDashboard}>
      <header style={styles.dashboardHeader}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            L
          </div>
          <div>
            <h1 style={styles.headerTitle}>LumenQuest</h1>
            <p style={styles.headerSubtitle}>Subscription Management Platform - Admin Dashboard</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '25px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              A
            </div>
            <span style={{fontSize: '0.9rem', fontWeight: '500'}}>Admin User</span>
          </div>
          <button style={{...styles.btnIcon, position: 'relative'}}>
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              background: '#ef4444',
              borderRadius: '50%',
              border: '2px solid white'
            }}></span>
          </button>
          <button style={styles.btnIcon}>
            <Settings size={18} />
          </button>
          <button style={styles.btnIcon}>
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <nav style={styles.dashboardNav}>
        <button 
          style={{...styles.navItem, ...(activeTab === 'overview' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('overview')}
        >
          <TrendingUp size={20} />
          Analytics
        </button>
        <button 
          style={{...styles.navItem, ...(activeTab === 'users' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('users')}
        >
          <Users size={20} />
          User Management
        </button>
        <button 
          style={{...styles.navItem, ...(activeTab === 'plans' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('plans')}
        >
          <Package size={20} />
          Plans Management
        </button>
        <button 
          style={{...styles.navItem, ...(activeTab === 'subscriptions' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('subscriptions')}
        >
          <DollarSign size={20} />
          Subscriptions
        </button>
        <button 
          style={{...styles.navItem, ...(activeTab === 'discounts' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('discounts')}
        >
          <Package size={20} />
          Discounts
        </button>
        <button 
          style={{...styles.navItem, ...(activeTab === 'monitoring' ? styles.navItemActive : {})}}
          onClick={() => setActiveTab('monitoring')}
        >
          <Settings size={20} />
          System Monitoring
        </button>
      </nav>

      <main style={styles.dashboardContent}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUserManagement()}
        {activeTab === 'plans' && renderPlansManagement()}
        {activeTab === 'subscriptions' && renderSubscriptionsManagement()}
        {activeTab === 'discounts' && renderDiscountsManagement()}
        {activeTab === 'monitoring' && renderSystemMonitoring()}
      </main>
    </div>
  )
}

export default AdminDashboard
