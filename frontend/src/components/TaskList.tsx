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
    }
    catch (error) { 
      console.log(error)
    }
  }

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error...</div>}
      {data && (
        console.log('data', data),
        <div>
          {data?.map((task: any,index:number) => (
            <div key={task._id} className='bg-white p-4 border border-gray-200 rounded-lg shadow-lg w-96 relative'>
              <div className='w-6 h-6 rounded-full bg-black flex justify-center items-center'>
              <h1 className='text-md font-bold text-slate-300'>{index + 1}</h1>
              </div>
              <h2 className='text-2xl font-serif text-center'>{task.title}</h2>
              <FaThumbsUp
                className={`absolute right-15 top-5 cursor-pointer ${task.completed ? 'text-green-500' : 'text-black'}`}
                size={20}
                onClick={() => handleTaskCompleted(task._id)}
              />
              <IoIosCloseCircle className='absolute right-5 top-5 cursor-pointer' size={25} color='red' />
              <p className='text-gray-500 text-center'>{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}