import { useState } from 'react'

function ExpenseTable({ expenses, onDelete }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const requestSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (!sortConfig.key) return 0
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th onClick={() => requestSort('description')}>
            Description {sortConfig.key === 'description' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('amount')}>
            Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('category')}>
            Category {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th onClick={() => requestSort('date')}>
            Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
          </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedExpenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>{expense.category}</td>
            <td>{expense.date}</td>
            <td>
              <button onClick={() => onDelete(expense.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ExpenseTable