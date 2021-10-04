import React, { useState } from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid';
import { basketList, checkBasket, removeProduct,countInBasket } from '../../../redux/store'
const Basket = ({ basketList, countBook, removeBook,itemsBasket }) => {
    let checkerSameId;


    const handleIncrementBtn = (e, book) => {
        e.preventDefault()
        countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1
        })
    }
    const handleDecrementBtn = (e, book) => {
        e.preventDefault()
        if (book.count > 0) countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 0
        })
    }
    const handleRemoveBtn = (e, book) => {
        e.preventDefault()
        console.log('usunnn')
        removeBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1
        })
    }
    const li = (item) => (
        <li key={shortid()}>
            {item.title}
            <input type="number" defaultValue={item.count} />
            <button onClick={e => handleIncrementBtn(e, item)}>+</button>
            <button onClick={(e) => handleDecrementBtn(e, item)}>-</button>
            <button onClick={(e) => handleRemoveBtn(e, item)}>Usuń </button>
        </li>
    )
    console.log("basketList",basketList)
    console.log("basketList",typeof(basketList))
    return (
        <div>
            <ol>
                {itemsBasket === 0 ?<h1>Koszyk jest pusty</h1> :basketList.map(item => li(item))}
            </ol>
        </div>
    )
}
const mapStateToProps = state => ({
    basketList: basketList(state),
    itemsBasket:countInBasket(state)
})
const mapDispatchToProps = dispatch => ({
    countBook: book => dispatch(checkBasket(book)),
    removeBook: book => dispatch(removeProduct(book))
})
export default connect(mapStateToProps, mapDispatchToProps)(Basket)
