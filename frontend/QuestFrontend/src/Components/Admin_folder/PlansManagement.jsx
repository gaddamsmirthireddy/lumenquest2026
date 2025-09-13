import React, { useState } from 'react'
import { Package, Plus, Edit, Trash2 } from 'lucide-react'

const PlansManagement = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Basic Plan', description: 'Essential features for individuals', price: 9.99, duration: 1, features: ['Feature A', 'Feature B'], isActive: true, subscribers: 1250 },
    { id: 2, name: 'Pro Plan', description: 'Advanced features for professionals', price: 29.99, duration: 1, features: ['Feature A', 'Feature B', 'Feature C', 'Feature D'], isActive: true, subscribers: 850 },
    { id: 3, name: 'Premium Plan', description: 'All features for enterprises', price: 99.99, duration: 12, features: ['All Features', 'Priority Support', 'Custom Integration'], isActive: true, subscribers: 420 },
    { id: 4, name: 'Student Plan', description: 'Discounted plan for students', price: 4.99, duration: 1, features: ['Feature A', 'Feature B'], isActive: true, subscribers: 980 },
    { id: 5, name: 'Enterprise Plan', description: 'Custom solution for large organizations', price: 199.99, duration: 12, features: ['All Features', 'Dedicated Support', 'Custom Development'], isActive: true, subscribers: 150 }
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
    btnPrimary: {
      background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
      color: 'white',
      border: '2px solid transparent',
      borderRadius: '25px',
      padding: '0.75rem 1.5rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 8px 25px rgba(76, 201, 240, 0.4)',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)'
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

  const handleDeletePlan = (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setPlans(plans.filter(plan => plan.id !== planId))
    }
  }

  return (
    <div style={styles.container}>
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
}

export default PlansManagement
