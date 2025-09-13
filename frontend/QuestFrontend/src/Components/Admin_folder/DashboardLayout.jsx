import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  TrendingUp, Users, Package, DollarSign, Settings, Bell, LogOut
} from 'lucide-react'

const DashboardLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const styles = {
    adminDashboard: {
      minHeight: '100vh',
      width: '100vw',
      background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4a 25%, #3a3a5c 50%, #4a4a6e 75%, #5a5a80 100%)",


      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative'
    },
    dashboardHeader: {
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      color: '#ffffff',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1030,
      borderRadius: '0 0 15px 15px'
    },
    headerTitle: {
      margin: 0,
      fontSize: '1.6rem',
      fontWeight: 700,
      letterSpacing: '-0.025em'
    },
    headerSubtitle: {
      margin: '0.25rem 0 0 0',
      opacity: 0.7,
      fontSize: '0.85rem',
      fontWeight: 400,
      color: '#9ca3af'
    },
    headerRight: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center'
    },
    btnIcon: {
      background: 'rgba(26, 26, 46, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '25px',
      padding: '0.75rem',
      color: '#ffffff',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    dashboardNav: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(15px)',
      padding: '0 2rem',
      display: 'flex',
      gap: '0.5rem',
      borderBottom: 'none',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: '90px',
      zIndex: 90,
      minHeight: '70px',
      alignItems: 'center',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      borderRadius: '15px',
      margin: '1rem 2rem 0 2rem'
    },
    navItem: {
      background: 'transparent',
      border: '2px solid transparent',
      padding: '1rem 1.5rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#1a1a2e',
      fontWeight: 600,
      fontSize: '0.9rem',
      borderRadius: '25px',
      transition: 'all 0.3s ease',
      position: 'relative',
      textTransform: 'none',
      letterSpacing: '0.025em',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      minWidth: 'fit-content'
    },
    navItemActive: {
      color: 'white',
      borderColor: '#4cc9f0',
      background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
      boxShadow: '0 8px 25px rgba(76, 201, 240, 0.4)',
      transform: 'translateY(-2px)'
    }
  }

  const navigationItems = [
    { path: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/plans', label: 'Plans Management', icon: Package },
    { path: '/admin/subscriptions', label: 'Subscriptions', icon: DollarSign },
    { path: '/admin/discounts', label: 'Discounts', icon: Package },
    { path: '/admin/monitoring', label: 'System Monitoring', icon: Settings }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div style={styles.adminDashboard}>
      <header style={styles.dashboardHeader}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: 'white',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
          }}>
            S
          </div>
          <div>
            <h1 style={styles.headerTitle}>Subscription Management System</h1>
            <p style={styles.headerSubtitle}>Admin Dashboard</p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginRight: '1rem',
            padding: '0.5rem 1rem',
            background: 'rgba(26, 26, 46, 0.1)',
            borderRadius: '25px',
            border: '1px solid rgba(26, 26, 46, 0.2)'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              A
            </div>
            <span style={{fontSize: '0.9rem', fontWeight: '500', color: '#ffffff'}}>Admin User</span>
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
        {navigationItems.map(({ path, label, icon: Icon }) => (
          <button 
            key={path}
            style={{...styles.navItem, ...(isActive(path) ? styles.navItemActive : {})}}
            onClick={() => navigate(path)}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

      <main style={{ padding: 0, paddingTop: '120px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(15px)',
          margin: '1rem 2rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          minHeight: 'calc(100vh - 200px)',
          overflow: 'hidden'
        }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
