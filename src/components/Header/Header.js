import React,{useEffect,useState} from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Header.scss'
import { countInBasket } from '../../redux/booksRedux';
import { FaShoppingBasket } from 'react-icons/fa';



const itemsNaviagation = [
    { name: "start", path: "/", exact: true },
    { name: "produkty", path: "/products" },
    { name: "kontakt", path: "/contact" },
    { name: "koszyk", path: "/basket" }]
    
const Header = ({basket}) => {
    const [scrolling, setScrolling] = useState()

    useEffect(() => {

        window.onscroll = () => {
            if (window.scrollY <= 10)setScrolling(false)   
              else setScrolling(true)
        }
      }, []);

    const menu = itemsNaviagation.map(item => (
        <li key={item.name}>
            <NavLink exact={item.exact ? item.exact : false} to={item.path}>{item.name ==="koszyk"?<><FaShoppingBasket/> <span>{ isNaN(basket)?'aa':basket}</span></>: `${item.name}`}</ NavLink>
        </li>
    ))
    return (
        <header className={scrolling?'menu scrolled': 'menu'} >
            <h1><span>Book</span>Store</h1>
            <ul>
                {menu}
            </ul>
        </header>);
}
const mapStateToProps=state=>({
    basket:countInBasket(state)
})
export default connect(mapStateToProps)(Header);