import { FaPlus } from 'react-icons/fa'
import { Navbar } from '../components/Navbar'
import { useState } from 'react'
import { TaskModal } from '../components/TaskModal'
import { TaskList } from '../components/TaskList'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-4'>
        <h4 className='text-2xl font-serif text-center'>Manage your tasks</h4>
        <div className='flex justify-end'>
          <button
            className="flex items-center bg-black hover:bg-slate-900 transition-all transform hover:scale-105 ease-in-out text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={handleOpenModal}
          >
            Open Modal
          </button>
        </div>
        <div className='mt-4 flex justify-center items-center'>
          {isModalOpen && <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} />}
        </div>
      </div>
      {!isModalOpen && (
        <div className='flex justify-center items-center p-4'>
          <TaskList />
        </div>
      )}
    </>
  )
}

export default Home