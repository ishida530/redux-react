import React from 'react'
import { useSelector } from 'react-redux'
import { basketList,  countInBasket, priceForAll } from '../../../redux/booksRedux'
import './Basket.scss'
import BasketItem from './BasketItem'


const Basket = () => {

    const basketState = useSelector(state =>basketList(state))
    const itemsBasket = useSelector(state => countInBasket(state))
    const price = useSelector(state => priceForAll(state))

    return (
        <div className='basket'>
            <ul>
                {itemsBasket === 0 ? <h1>Koszyk jest pusty</h1> : basketState.map(item => BasketItem(item))}
            </ul>
            <p className="sum"><b>SUMA:</b> <span>{price.toFixed(2)}PLN</span></p>
        </div>
    )
}


export default Basket

