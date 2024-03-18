import React, { useEffect } from 'react'
import './style.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useSelector } from 'react-redux'
export default function HeroBanner() {
    const [backgroud,setBackgroud]=useState('')
    const [query,setQuery]=useState('')
    const navigate=useNavigate()
    const {data,loading}=useFetch('/movie/upcoming')
    const url=useSelector((state)=>state.home.url)
    function SearchQueryHandler(event) {
        if(event.key==='Enter'&& query.length >0){
            navigate(`/search/${query}`)
        }
    }
    useEffect(()=>{
        const indice=Math.floor(Math.random() * 20)
        const bg= url.backdrop + data?.results[indice]?.backdrop_path
        setBackgroud(bg)
        
    },[data])
   
    
  return (
    <div className='heroBanner'>
       {!loading && <div className="backdrop-img">
            <Img src={backgroud}/>
        </div>}
        <div className="opacity-layer">

        </div>
        <ContentWrapper>
        <div className="wrapper">
            <div className="heroBannerContent">
                <span className="title">Welcome </span>
                <span className="subTitle">
                To a world of endless possibilities,
                where you can discover millions of movies and
                TV shows. 
                Start your exploration now! 
                </span>
                <div className="searchInput">
                    <input type="text" 
                            name=""
                            id="" 
                            placeholder='Search for movie or tv show....'
                            value={query}
                            onChange={(e)=>setQuery(e.target.value)}
                            onKeyUp={SearchQueryHandler}
                            />
                    <button onClick={()=>navigate(`/search/${query}`)} >Search</button>
                </div>
            </div>
        </div>
        </ContentWrapper>
    </div>
  )
}
