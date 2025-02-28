import React, { useCallback, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

interface UseAxiosProps{
  url:string
  method?:'GET'|'POST'|'PUT'|'DELETE'
  body?:any
  config?:AxiosRequestConfig
}
export const useAxios = () => {
    const [data,setData] = useState<AxiosResponse|[]>([])
    const [error,setError] = useState<any>(null)
    const [loading,setLoading] = useState<boolean>(true)

    const fetchData = useCallback( async ({url,method='GET',body=null,config={}}:UseAxiosProps)=>{
      setLoading(true)
      try {
        const response = await axios({
          url,
          method,
          data:body,  
          ...config
        })
        console.log('response',response.data)
        setData(response.data)
      } catch (error:any) {
        setError(error)
      }finally{
        setLoading(false)
      } 
    },[])

  return {data,loading,error,fetchData}
}
