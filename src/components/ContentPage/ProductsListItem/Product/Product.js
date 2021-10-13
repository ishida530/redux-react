import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { checkBasket, allBooks } from '../../../../redux/booksRedux';

const Product = () => {
    const data = useSelector(state => allBooks(state))

    const dispatch = useDispatch()
    const addBook = book => dispatch(checkBasket(book))

    const [count, setCount] = useState(1)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const searchId = useParams()


    const handleOnChange = (e) => {
        const tagret = e.target.value
        parseInt(tagret) === 0 || tagret.length === 0 ? setDisabledBtn(true) : setDisabledBtn(false)
        setCount(tagret)
    }
    const handleSubmit = (e, book) => {
        e.preventDefault();
        const { key, simple_thumb, title, price } = book
        return (
            addBook(
                {
                    key: key,
                    img: simple_thumb,
                    title: title,
                    count: parseInt(count),
                    price: price,
                }
            )
        )
    }
    const singleProduct = data.filter(item => item.key === searchId.id).map(book => {
        const { id, simple_thumb, title } = book
        return (
            <div key={searchId}>

                <h1>{id}</h1>
                <img src={simple_thumb} alt="Logo" />
                <h4>{title}</h4>
                <form onSubmit={(e) => { return handleSubmit(e, book) && setCount(1) }}>
                    <input type="number" value={count} onChange={e => handleOnChange(e)} />
                    <button disabled={disabledBtn} type='submit'>Dodaj do koszyka</button>
                </form>
            </div>
        )
    }
    )

    return (
        <>
            {singleProduct}
        </>
    );
}

export default Product