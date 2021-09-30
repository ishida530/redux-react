import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';



const Navigation = styled.header`
height: 10%;
background-color: #ddd;
 ul{
     display: flex;
     justify-content: center;
     list-style: none;
     height: 80px;
     margin: 0;
     li{display:flex;
        justify-content: center;
        align-items: center;
         margin: 0 20px;
         text-transform: uppercase;
        
         a{
            color: #000;
         text-decoration: none;font-weight:500;
         font-size:18px;
         }
     }
 }
`;

const itemsNaviagation = [
    { name: "start", path: "/", exact: true },
    { name: "pordukty", path: "/products" },
    { name: "kontakt", path: "/contact" },
    { name: "koszyk", path: "/basket" }]
    
const Header = () => {
    const menu = itemsNaviagation.map(item => (
        <li key={item.name}>
            <NavLink exact={item.exact ? item.exact : false} to={item.path}>{item.name}</ NavLink>
        </li>
    ))
    return (
        <Navigation className="main">
            <ul>
                {menu}
            </ul>
        </Navigation>);
}

export default Header;