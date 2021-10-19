import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  checkBasket, removeProduct,   setAmountBooks } from '../../../redux/booksRedux'




const BasketItem = (item) => {
    const dispatch = useDispatch() 
    const incrementCountBook = book => dispatch(checkBasket(book))
    const removeBook = book => dispatch(removeProduct(book))
    const setCountBook = book => dispatch(setAmountBooks(book))
    const {key,title,count,oldPrice,price,onSale,img,href}=item;


    console.log("111",href)

    const handleIncrementBtn = (e, book) => {
        const {key,img,title,price,oldPrice,onSale}=book

        e.preventDefault()
        incrementCountBook({
            key: key,
            img: img,
            title: title,
            count: 1,
            price: price,
            oldPrice:oldPrice,
            onSale:onSale
        })
    }
    
    const handleDecrementBtn = (e, book) => {
        const {key,img,title,price,oldPrice,onSale}=book
        e.preventDefault()
        if (book.count > 1) incrementCountBook({
            key: key,
            img: img,
            title: title,
            count: 0,
            price: price,
            oldPrice:oldPrice,
            onSale:onSale
    
        })
        else removeBook({
            key: book.key,
        })
    }
    const handleRemoveBtn = (e, book) => {
        e.preventDefault()
        removeBook({
            key: book.key,
        })
    }
    const handleOnBlur = (e, book) => {
        const {key,img,title,price,oldPrice,onSale}=book

        if (e.target.value.length === 0 || e.target.value == 0) {
            setTimeout(() => {
                if (window.confirm("usunać?")) {
                    removeBook({
                        key: book.key,
                    });
                } else {

                    setCountBook({
                        key: key,
                        img: img,
                        title: title,
                        count: 1,
                        price: price,
                        onSale:onSale,
                        oldPrice:oldPrice
                    })
                    e.target.focus()
                }
            }, 500)
        }
    }
    const handleOnChange = (e, book) => {

        const {key,img,title,price,oldPrice,onSale}=book

        setCountBook({
            key: key,
            img: img,
            title: title,
            count: parseInt(e.target.value),
            price: price,
            oldPrice:oldPrice,
            onSale:onSale
        })
    }
return(

    <li key={key}>
        <img  src={img} alt=''/> 
        <span><b>Tytuł: </b>{title}.</span>
        <div>
            <label><b> Ilośc sztuk:</b> <input min={0} max={100} type="number" value={count} onChange={e => handleOnChange(e, item)} onBlur={e => handleOnBlur(e, item)} /></label>
            <button onClick={e => handleIncrementBtn(e, item)}>+</button>
            <button onClick={e => handleDecrementBtn(e, item)}>-</button>
        </div>
        <label><b> Cena: </b>{onSale?
          <> <s><span style={{color:"red"}}>{oldPrice}</span></s> <span style={oldPrice?{color:"green"}:null}> {price} PLN</span></> :
          <span>{oldPrice} PLN</span>
    
    }</label>
        <div>

            <button onClick={(e) => handleRemoveBtn(e, item)}>Usuń </button>
        </div>
    </li>
    )
}

export default BasketItem
