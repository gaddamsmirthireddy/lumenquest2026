import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import Analytics from './Analytics'
import UserManagement from './UserManagement'
import PlansManagement from './PlansManagement'
import SubscriptionsManagement from './SubscriptionsManagement'
import DiscountsManagement from './DiscountsManagement'
import SystemMonitoring from './SystemMonitoring'
import Chatbot from './Chatbot'

const AdminDashboardPages = () => {
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Router>
        <Routes>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/analytics" replace />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="plans" element={<PlansManagement />} />
            <Route path="subscriptions" element={<SubscriptionsManagement />} />
            <Route path="discounts" element={<DiscountsManagement />} />
            <Route path="monitoring" element={<SystemMonitoring />} />
          </Route>
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default AdminDashboardPages
