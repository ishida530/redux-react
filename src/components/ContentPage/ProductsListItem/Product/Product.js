import React, { useState } from 'react';
import {
    useParams
} from "react-router-dom";
import { connect } from 'react-redux'
import { checkBasket } from '../../../../redux/store';

const Product = ({ booksArray, addBook }) => {
    const [count, setCount] = useState(1)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const searchId = useParams()


    const handleOnChange = (e) => {
        console.log('aa',e.target.value)
        console.log('disabledBtn',disabledBtn)
        parseInt(e.target.value) === 0 || e.target.value.length===0 ? setDisabledBtn(true) : setDisabledBtn(false) 
        setCount(e.target.value)
    }
    const handleSubmit = (e, book) => {
        e.preventDefault();
        return addBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: parseInt(count),
            price: book.price,
        })

    }
    let singleProduct = booksArray.books.filter(item => item.key === searchId.id).map(book => <div key={searchId}>
        <h1>{book.id}</h1>
        <img src={book.simple_thumb} alt="Logo" />
        <h4>{book.title}</h4>
        <form onSubmit={(e) => { return handleSubmit(e, book)&& setCount(1) }}>
            <input type="number" value={count} onChange={e=>handleOnChange(e)} />
            <button disabled={disabledBtn} type='submit'>Dodaj do koszyka</button>
        </form>
    </div>
    )
  
    return (
        <>
            {singleProduct}
        </>
    );
}
const mapStateToProps = state => ({
    booksArray: { ...state }
})


const mapDispatchToProps = (dispatch) => ({
    addBook: (book) => dispatch(checkBasket(book))
})
export default connect(mapStateToProps, mapDispatchToProps)(Product);