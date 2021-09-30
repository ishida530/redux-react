import './App.css';
import React, { useEffect } from 'react'

import { BrowserRouter as Router } from 'react-router-dom'
import ContentPage from './components/ContentPage/ContentPage'
import Header from './components/Header/Header';
import { connect } from 'react-redux';
import { fetchbooks } from './redux/store';





const App = ({udpateBook}) => {
  useEffect(() => {
    udpateBook()
  }, [])
  return (
    <Router >
      <Header />
      <ContentPage />
    </Router>
  )
}
const mapDispatchToProps=dispatch=>({
  udpateBook:()=>dispatch(fetchbooks())
})

export default connect(null,mapDispatchToProps)(App)
