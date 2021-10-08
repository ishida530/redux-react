import './App.css';
import React, { useEffect } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import ContentPage from './components/ContentPage/ContentPage'
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import { fetchbooks, getRequestInfo } from './redux/store';
import Loader from "react-loader-spinner";





const App = ({udpateBook,request}) => {
  useEffect(() => {
    udpateBook()
  }, [])
  return (
    <Router >
      <Header />
      { request.pending &&   <Loader type="Rings" color="red" height={80} width={80} />}
			{ request.error && console.warn('warrning')}
			{ request.success && 
			      <ContentPage />

			}
    </Router>
  )
}
const mapDispatchToProps=dispatch=>({
  udpateBook:()=>dispatch(fetchbooks())
})
const mapStateToProps=state=>({
  request:getRequestInfo(state)
})
export default connect(mapStateToProps,mapDispatchToProps)(App)
