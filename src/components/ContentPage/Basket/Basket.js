import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid';
import { basketList, checkBasket, removeProduct,countInBasket,priceForAll } from '../../../redux/store'
const Basket = ({ basketList, countBook, removeBook,itemsBasket,price }) => {

console.log('aaaaa',price)
    const handleIncrementBtn = (e, book) => {
        e.preventDefault()
        countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price:book.price
        })
    }
    const handleDecrementBtn = (e, book) => {
        e.preventDefault()
        if (book.count > 0) countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 0,
            price:book.price

        })
    }
    const handleRemoveBtn = (e, book) => {
        e.preventDefault()
        removeBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price:book.price
        })
    }
    const li = (item) => (
        <li key={shortid()}>
            {item.title}.
            <label><b> Ilośc sztuk:</b>           <input type="number" defaultValue={item.count} /></label>
<label><b> Cena:</b>           <input type="number" readOnly defaultValue={item.price} /></label>
            <button onClick={e => handleIncrementBtn(e, item)}>+</button>
            <button onClick={(e) => handleDecrementBtn(e, item)}>-</button>
            <button onClick={(e) => handleRemoveBtn(e, item)}>Usuń </button>
        </li>
    )

    return (
        <div>
            <ol>
                {itemsBasket === 0 ?<h1>Koszyk jest pusty</h1> :basketList.map(item => li(item))}
            </ol>
            <p><b>SUMA:</b> <span>{price.toFixed(2)}PLN</span></p>
        </div>
    )
}
const mapStateToProps = state => ({
    basketList: basketList(state),
    itemsBasket:countInBasket(state),
     price: priceForAll(state)
})
const mapDispatchToProps = dispatch => ({
    countBook: book => dispatch(checkBasket(book)),
    removeBook: book => dispatch(removeProduct(book))
})
export default connect(mapStateToProps, mapDispatchToProps)(Basket)
