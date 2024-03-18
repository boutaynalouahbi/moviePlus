import { useState ,useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux'
// import './App.css'
import { fetchDataFromAPI } from './Utils/api'
import { getApiConfiguration } from './store/homeSlice';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound';
import SearchResult from './pages/searchResult/SearchResult'
function App() {
  const dispatch=useDispatch();
  const url=useSelector((state)=>state.home.url)
  const fetchApiConfiguration=()=>fetchDataFromAPI('/configuration').then(
    (res)=>{
      console.log('res',res)
      const url={
        backdrop:res.images.secure_base_url+"original",
        poster:res.images.secure_base_url+"original",
        profile:res.images.secure_base_url+"original"
        
      }
    dispatch(getApiConfiguration(url))
  }
  ).catch((error)=>console.log('error',error))
  useEffect(()=>{
    fetchApiConfiguration()
  },[])
  console.log('url',url);
  return (
    <BrowserRouter>
      <Header/> 
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/:mediaType/:id' element={<Details/>}/>
      <Route path='/search/:query' element={<SearchResult/>}/>
      <Route path='/explore/:mediaType' element={<Explore/>}/>
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    <Footer/> 
    </BrowserRouter>
  )
}

export default App
