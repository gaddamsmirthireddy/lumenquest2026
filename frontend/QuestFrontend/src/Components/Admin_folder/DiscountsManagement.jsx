import React, { useState } from 'react'
import { Package, Plus, Edit, Trash2 } from 'lucide-react'

const DiscountsManagement = () => {
  const [discounts, setDiscounts] = useState([
    { id: 1, planId: 1, planName: 'Basic Plan', percentage: 20, validUntil: '2024-03-31', description: 'New Year Offer', status: 'Active' },
    { id: 2, planId: 4, planName: 'Student Plan', percentage: 50, validUntil: '2024-12-31', description: 'Student Discount', status: 'Active' },
    { id: 3, planId: 3, planName: 'Premium Plan', percentage: 15, validUntil: '2024-06-30', description: 'Loyalty Bonus', status: 'Active' }
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

  return (
    <div style={styles.container}>
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
}

export default DiscountsManagement
