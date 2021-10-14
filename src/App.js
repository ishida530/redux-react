import './App.scss';
import React, { useEffect } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import ContentPage from './components/ContentPage/ContentPage'
import Header from './components/Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, getRequestInfo } from './redux/booksRedux';
import Loader from "react-loader-spinner";

const App = () => {
  const request = useSelector(state => getRequestInfo(state))
  const dispatch = useDispatch() 
  const getAllBooks = () => dispatch(fetchBooks())

  useEffect(() => {
    getAllBooks()
  }, [])
  return (
    <Router >
      <Header />
      { request.pending && <Loader type="Rings" color="red" height={80} width={80} />}
			{ request.error && console.warn('warrning')}
			{ request.success && <ContentPage />}
    </Router>
  )
}

export default App
