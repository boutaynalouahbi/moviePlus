import React from 'react'
import { useState,useEffect } from 'react'
import { fetchDataFromAPI } from '../Utils/api'
export const useFetch = (url) => {
    const [data,setData]=useState(null)
    const [loading,setLoading]=useState(null)
    const [error,setError]=useState(null)
    useEffect(()=>{
        setLoading('loading....')
        setData(null)
        setError(null)
        fetchDataFromAPI(url)
        .then((res)=>{
            setLoading(false)
            setData(res)
        })
        .catch(error=>{
            setLoading(false)
            setError("Something went wrong!")
        })
    },[url])
  return  {data,loading,error}
  
}
export default useFetch