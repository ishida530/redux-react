import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { basketList, checkBasket, removeProduct, countInBasket, priceForAll, setAmountBooks } from '../../../redux/booksRedux'
const DivWrapper = styled.div`
padding: 15px 20px;
    ol{
        padding:0;
        display: flex;
        flex-direction: column;
        li{
        display:flex;
        justify-content: space-between;
        margin: 15px;
        &>span{
            width: 50%;
        }
        input{
            width: 20%;
        }
        label{
            width: 20%;
        }
        li:nth-last-child(1){
            width: 10%;
        }
    }
    }
    .sum{margin: 15px;

        font-size: 24px;
    }
`


const Basket = () => {

    const basketState = useSelector(state =>basketList(state))
    const itemsBasket = useSelector(state => countInBasket(state))
    const price = useSelector(state => priceForAll(state))

    const dispatch = useDispatch() 
    const incrementCountBook = book => dispatch(checkBasket(book))
    const removeBook = book => dispatch(removeProduct(book))
    const setCountBook = book => dispatch(setAmountBooks(book))

    
    const handleIncrementBtn = (e, book) => {
        e.preventDefault()
        incrementCountBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price: book.price
        })
    }
    const handleDecrementBtn = (e, book) => {
        e.preventDefault()
        if (book.count > 1) incrementCountBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 0,
            price: book.price
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
        if (e.target.value.length === 0 || e.target.value == 0) {
            setTimeout(() => {
                if (window.confirm("usunać?")) {
                    removeBook({
                        key: book.key,
                    });
                } else {
                    setCountBook({
                        key: book.key,
                        img: book.simple_thumb,
                        title: book.title,
                        count: 1,
                        price: book.price
                    })
                    e.target.focus()
                }
            }, 500)
        }
    }
    const handleOnChange = (e, book) => {
        setCountBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: parseInt(e.target.value),
            price: book.price
        })
    }

    const li = (item) => (
        <li key={item.key}>
            <span><b>Tytuł: </b>{item.title}.</span>
            <div>
                <label><b> Ilośc sztuk:</b> <input min={0} max={100} type="number" value={item.count} onChange={e => handleOnChange(e, item)} onBlur={e => handleOnBlur(e, item)} /></label>
                <button onClick={e => handleIncrementBtn(e, item)}>+</button>
                <button onClick={e => handleDecrementBtn(e, item)}>-</button>
            </div>
            <label><b> Cena:</b><span>{item.price} PLN</span></label>
            <div>

                <button onClick={(e) => handleRemoveBtn(e, item)}>Usuń </button>
            </div>
        </li>
    )

    return (
        <DivWrapper>
            <ol>
                {itemsBasket === 0 ? <h1>Koszyk jest pusty</h1> : basketState.map(item => li(item))}
            </ol>
            <p className="sum"><b>SUMA:</b> <span>{price.toFixed(2)}PLN</span></p>
        </DivWrapper>
    )
}


export default Basket

