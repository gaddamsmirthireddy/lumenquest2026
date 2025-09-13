import React, { useState } from 'react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import { Users, Package, TrendingUp, DollarSign } from 'lucide-react'

const Analytics = () => {
  const styles = {
    container: {
      padding: '2rem',
      paddingTop: '5rem'
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
      background: 'linear-gradient(135deg, #4cc9f0 0%, #4cc9f0 100%)',
      color: 'white',
      padding: '1rem',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(76, 201, 240, 0.4)'
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
      marginBottom: '3rem',
      marginTop: '2rem'
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
    }
  }

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
    { name: 'Basic Plan', value: 1250, color: '#ff6b6b' },
    { name: 'Pro Plan', value: 850, color: '#4ecdc4' },
    { name: 'Premium Plan', value: 420, color: '#45b7d1' },
    { name: 'Student Plan', value: 980, color: '#f9ca24' },
    { name: 'Enterprise Plan', value: 150, color: '#6c5ce7' }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 28500 },
    { month: 'Feb', revenue: 31000 },
    { month: 'Mar', revenue: 32500 },
    { month: 'Apr', revenue: 34000 },
    { month: 'May', revenue: 35500 },
    { month: 'Jun', revenue: 37000 }
  ]

  return (
    <div style={styles.container}>
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
            <p style={styles.statNumber}>5</p>
            <span style={styles.statChange}>+2 new plans</span>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <DollarSign />
          </div>
          <div>
            <h3 style={styles.statTitle}>Monthly Revenue</h3>
            <p style={styles.statNumber}>$37,000</p>
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

      <div style={styles.chartsGrid}>
        <div style={styles.chartContainer}>
          <h3 style={styles.chartTitle}>Subscription Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySubscriptions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#4cc9f0" name="Active" strokeWidth={3} />
              <Line type="monotone" dataKey="new" stroke="#3bb5e0" name="New" strokeWidth={3} />
              <Line type="monotone" dataKey="cancelled" stroke="#ef4444" name="Cancelled" strokeWidth={3} />
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
              <Tooltip formatter={(value) => [`$${(value/1000).toFixed(1)}K`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#4cc9f0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics
