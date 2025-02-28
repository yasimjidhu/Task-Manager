import { useCallback, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'

interface UseAxiosProps {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  config?: AxiosRequestConfig
}

export const useAxios = () => {
  const [data, setData] = useState<any>([]) 
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false) 

  const fetchData = useCallback(
    async ({ url, method = 'GET', body = null, config = {} }: UseAxiosProps) => {
      setLoading(true)
      try {
        const response = await axios({
          url,
          method,
          data: body,
          ...config,
        })

        if (Array.isArray(response.data)) {
          setData(response.data)
        } else {
          if (method === 'POST') {
            setData((prevData: any) => [...prevData, response.data])
          } else if (method === 'PUT') {
            setData((prevData: any) =>
              prevData.map((task: any) => (task._id === response.data._id ? response.data : task))
            )
          } else if (method === 'DELETE') {
            setData((prevData: any) => prevData.filter((task: any) => task._id !== response.data._id))
          }
        }
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { data, loading, error, fetchData }
}
