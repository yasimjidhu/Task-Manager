import { useEffect } from 'react'
import { useAxios } from '../hooks/useAxios'
import { FaThumbsUp } from 'react-icons/fa'
import { IoIosCloseCircle } from 'react-icons/io'

export const TaskList = () => {
  const { fetchData, loading, error, data } = useAxios()

  useEffect(() => {
    fetchData({ url: 'http://localhost:3000/tasks', method: 'GET' })
  }, [])

  const handleTaskCompleted = async (id: string) => {
    try {
      await fetchData({ url: `http://localhost:3000/tasks/${id}`, method: 'PUT' })
      fetchData({ url: 'http://localhost:3000/tasks', method: 'GET' }) // Refresh the task list
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await fetchData({ url: `http://localhost:3000/tasks/${id}`, method: 'DELETE' })
      fetchData({ url: 'http://localhost:3000/tasks', method: 'GET' }) // Refresh the task list
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
      {data && (
        <div>
          {data.map((task: any, index: number) => (
            <div key={task._id} className='bg-white p-4 border border-gray-200 rounded-lg shadow-lg w-96 relative grid grid-cols-12'>
              <div className='w-6 h-6 rounded-full bg-black flex justify-center items-center col-span-2'>
                <h1 className='text-md font-bold text-slate-300'>{index + 1}</h1>
              </div>
              <div className='col-span-8'>
                <h2 className='text-2xl font-serif text-center'>{task.title}</h2>
                <p className='text-gray-500 text-center'>{task.description}</p>
              </div>
              <div className='col-span-2'>
                <FaThumbsUp
                  className={`absolute right-15 top-5 ${task.completed ? 'text-green-500 cursor-not-allowed' : 'text-black cursor-pointer'}`}
                  size={20}
                  onClick={() => handleTaskCompleted(task._id)}
                />
                <IoIosCloseCircle
                  className='absolute right-5 top-5 cursor-pointer'
                  size={25}
                  color='red'
                  onClick={() => handleDeleteTask(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}