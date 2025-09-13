import React, { useState } from 'react'
import { Users, Edit, Settings, Search, Filter, Plus, Trash2, X } from 'lucide-react'

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 'U001', name: 'John Doe', email: 'john@example.com', role: 'user', activeSubscription: 'Pro Plan', joinDate: '2024-01-15', status: 'Active' },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', role: 'user', activeSubscription: 'Basic Plan', joinDate: '2024-01-20', status: 'Active' },
    { id: 'U003', name: 'Mike Johnson', email: 'mike@example.com', role: 'user', activeSubscription: null, joinDate: '2024-01-10', status: 'Inactive' },
    { id: 'U004', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin', activeSubscription: 'Premium Plan', joinDate: '2024-01-25', status: 'Active' },
    { id: 'U005', name: 'Alex Chen', email: 'alex@example.com', role: 'user', activeSubscription: 'Student Plan', joinDate: '2024-02-01', status: 'Active' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user'
  })

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
    },
    btnPrimary: {
      background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '0.75rem 1.5rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 8px 25px rgba(76, 201, 240, 0.4)',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      border: '2px solid transparent'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      background: 'white',
      borderRadius: '12px',
      padding: '2rem',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    modalTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#1f2937',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '0.5rem'
    },
    formGroup: {
      marginBottom: '1rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 500,
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.9rem',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '0.9rem',
      boxSizing: 'border-box'
    },
    modalActions: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      marginTop: '2rem'
    },
    btnCancel: {
      background: 'white',
      color: '#6b7280',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '0.75rem 1.5rem',
      fontWeight: 500,
      cursor: 'pointer'
    }
  }

  const handleUpdateUserRole = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ))
  }

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const userId = `U${String(users.length + 1).padStart(3, '0')}`
      const user = {
        id: userId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        activeSubscription: null,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      }
      setUsers([...users, user])
      setNewUser({ name: '', email: '', role: 'user' })
      setShowAddUserModal(false)
    }
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div style={styles.container}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>User Management</h2>
        <div style={styles.searchFilter}>
          <div style={styles.searchBox}>
            <Search size={16} style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search users..." 
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button style={styles.btnSecondary}>
            <Filter size={16} />
            Filter
          </button>
          <button style={styles.btnPrimary} onClick={() => setShowAddUserModal(true)}>
            <Plus size={16} />
            Add User
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
            {filteredUsers.map(user => (
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
                    <button 
                      style={{...styles.btnIcon, background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444'}}
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* Add User Modal */}
      {showAddUserModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>Add New User</h3>
              <button 
                style={styles.closeButton}
                onClick={() => setShowAddUserModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                type="text"
                style={styles.input}
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Enter user name"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                style={styles.input}
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                placeholder="Enter user email"
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Role</label>
              <select
                style={styles.select}
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div style={styles.modalActions}>
              <button 
                style={styles.btnCancel}
                onClick={() => setShowAddUserModal(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.btnPrimary}
                onClick={handleAddUser}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
