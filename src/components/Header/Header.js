import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import './Header.scss'
import { countInBasket } from '../../redux/booksRedux';



const itemsNaviagation = [
    { name: "start", path: "/", exact: true },
    { name: "produkty", path: "/products" },
    { name: "kontakt", path: "/contact" },
    { name: "koszyk", path: "/basket" }]
    
const Header = ({basket}) => {
    const menu = itemsNaviagation.map(item => (
        <li key={item.name}>
            <NavLink exact={item.exact ? item.exact : false} to={item.path}>{item.name ==="koszyk"?<>{item.name} <span>{ isNaN(basket)?'aa':basket}</span></>: `${item.name}`}</ NavLink>
        </li>
    ))
    return (
        <header className='menu' >
            <ul>
                {menu}
            </ul>
        </header>);
}
const mapStateToProps=state=>({
    basket:countInBasket(state)
})
export default connect(mapStateToProps)(Header);