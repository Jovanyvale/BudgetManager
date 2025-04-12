import { useEffect, useMemo } from 'react'
import './App.css'
import Form from './components/Form'
import Tracker from './components/Tracker'
import { useBudget } from './hooks/useBudget'
import ExpenseModal from './components/ExpenseModal'
import ExpenseList from './components/ExpenseList'
import CategoryFilter from './components/CategoryFilter'

function App() {

  const { state } = useBudget()
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <header className='bg-blue3 w-full py-10 mb-16'>
        <h1 className='text-center font-black uppercase text-2xl text-white'>Budget Manager</h1>
      </header>

      <div className='bg-white mx-auto max-w-4xl p-8 rounded-lg shadow-lg'>
        {isValidBudget ? <Tracker /> : <Form />}
      </div >

      {isValidBudget && (
        <main className='max-w-4xl mx-auto py-10'>
          <CategoryFilter />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
