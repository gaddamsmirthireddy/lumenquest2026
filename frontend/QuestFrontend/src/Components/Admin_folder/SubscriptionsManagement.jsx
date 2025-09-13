import React, { useState } from 'react'
import { DollarSign, Search, Filter, Edit, Bell } from 'lucide-react'

const SubscriptionsManagement = () => {
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, userId: 'U001', userName: 'John Doe', planName: 'Pro Plan', status: 'active', startDate: '2024-01-15', endDate: '2024-02-15', autoRenew: true, paidAmount: 29.99 },
    { id: 2, userId: 'U002', userName: 'Jane Smith', planName: 'Basic Plan', status: 'active', startDate: '2024-01-20', endDate: '2024-02-20', autoRenew: true, paidAmount: 9.99 },
    { id: 3, userId: 'U003', userName: 'Mike Johnson', planName: 'Pro Plan', status: 'cancelled', startDate: '2024-01-10', endDate: '2024-02-10', autoRenew: false, paidAmount: 29.99 },
    { id: 4, userId: 'U004', userName: 'Sarah Wilson', planName: 'Premium Plan', status: 'active', startDate: '2024-01-25', endDate: '2025-01-25', autoRenew: true, paidAmount: 99.99 },
    { id: 5, userId: 'U005', userName: 'Alex Chen', planName: 'Student Plan', status: 'active', startDate: '2024-02-01', endDate: '2024-03-01', autoRenew: true, paidAmount: 4.99 }
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
    },
    btnIcon: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '10px',
      padding: '0.75rem',
      color: '#6b7280',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  return (
    <div style={styles.container}>
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
}

export default SubscriptionsManagement
