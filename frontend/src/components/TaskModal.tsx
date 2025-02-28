import { useAxios } from '../hooks/useAxios'
import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TaskModal = ({ isOpen, onClose }: TaskModalProps) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const {fetchData} = useAxios()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = {title,description}
    try {
      await fetchData({
        url:'http://localhost:3000/tasks',
        method:'POST',
        body:data
      })
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isOpen && (
        <div className='bg-white p-6 border border-gray-200 rounded-lg shadow-lg w-96'>
          <IoIosCloseCircle
            size={25}
            color='red'
            className='float-end cursor-pointer'
            onClick={onClose}
          />
          <h2 className='text-2xl font-serif text-center mt-4'>Add Task</h2>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <input
                type='text'
                id='title'
                placeholder='Enter title'
                value={title}
                onChange={handleTitleChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                id='description'
                placeholder='Enter description'
                value={description}
                onChange={handleDescriptionChange}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                rows={4}
              ></textarea>
            </div>
            <button
              type='submit'
              className='w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Save Task
            </button>
          </form>
        </div>
      )}

    </>
  )
}