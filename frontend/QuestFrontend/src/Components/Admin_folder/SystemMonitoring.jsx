import React, { useState } from 'react'
import { Users, Package, DollarSign, TrendingUp, Settings } from 'lucide-react'

const SystemMonitoring = () => {
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'User Registration', performedBy: 'System', entityType: 'User', entityId: 'U005', timestamp: '2024-02-01T10:30:00Z', actionDetails: 'New user registered' },
    { id: 2, action: 'Plan Created', performedBy: 'Admin User', entityType: 'Plan', entityId: '5', timestamp: '2024-01-30T14:20:00Z', actionDetails: 'Enterprise Plan created' },
    { id: 3, action: 'Subscription Cancelled', performedBy: 'Mike Johnson', entityType: 'Subscription', entityId: '3', timestamp: '2024-01-28T09:15:00Z', actionDetails: 'User cancelled Pro Plan subscription' },
    { id: 4, action: 'Discount Applied', performedBy: 'Admin User', entityType: 'Discount', entityId: '2', timestamp: '2024-01-25T16:45:00Z', actionDetails: 'Student discount applied to Student Plan' }
  ])

  const styles = {
    container: {
      padding: '2rem',
      paddingTop: '3rem'
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
    }
  }

  return (
    <div style={styles.container}>
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
            <p style={styles.statNumber}>5</p>
            <span style={styles.statChange}>+2 new this week</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Package />
          </div>
          <div>
            <h3 style={styles.statTitle}>Active Subscriptions</h3>
            <p style={styles.statNumber}>4</p>
            <span style={styles.statChange}>+3 this month</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <DollarSign />
          </div>
          <div>
            <h3 style={styles.statTitle}>Monthly Revenue</h3>
            <p style={styles.statNumber}>$174.95</p>
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
}

export default SystemMonitoring
