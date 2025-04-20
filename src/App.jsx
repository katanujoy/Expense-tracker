import { useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import SearchBar from './components/SearchBar'
import './index.css'

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Groceries', amount: 50, category: 'Food', date: '2023-04-01' },
    { id: 2, description: 'Electricity', amount: 80, category: 'Utilities', date: '2023-04-05' },
    { id: 3, description: 'Movie tickets', amount: 25, category: 'Entertainment', date: '2023-04-10' }
  ])
  const [searchTerm, setSearchTerm] = useState('')

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const filteredExpenses = expenses.filter(expense => 
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <ExpenseTable expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  )
}

export default App