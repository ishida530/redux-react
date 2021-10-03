import React,{useState} from 'react';
import {
    useParams
} from "react-router-dom";
import { connect } from 'react-redux'
import { checkBasket } from '../../../../redux/store';

const Product = ({ booksArray,addBook }) => {

    const searchId = useParams()
    let singleProduct =booksArray.books.filter(item => item.key === searchId.id).map(book => <div key={searchId}>
        <h1>{book.id}</h1>
        <img src={book.simple_thumb} alt="Logo" />
        <h4>{book.title}</h4> 
        <button onClick={(e)=>handleClick(e,book)}>Dodaj do koszyka</button>

    </div>
    )
      
        const handleClick=(e,book)=>{
            console.log('click btn')
            e.preventDefault();
            console.log(book)
           return addBook({
               key: book.key,
               img:book.simple_thumb,
               title:book.title,
               count:1
           })
        }
    return (
        <>
            {singleProduct}
        </>
    );
}
const mapStateToProps = state => ({
    booksArray: { ...state }
})


const mapDispatchToProps=(dispatch)=>({
    addBook:(book)=>dispatch(checkBasket(book))
  })
export default connect(mapStateToProps,mapDispatchToProps)(Product);