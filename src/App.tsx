import './App.css'
import Form from './components/Form'

function App() {

  return (
    <>
      <header className='bg-blue2 w-full py-10 mb-16'>
        <h1 className='text-center font-black uppercase text-2xl text-white'>Budget Manager</h1>
      </header>

      <div className='bg-white mx-auto max-w-2xl p-8 rounded-lg'>
        <Form />
      </div>
    </>
  )
}

export default App
