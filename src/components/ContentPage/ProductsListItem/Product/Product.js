import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { allBooks } from '../../../../redux/booksRedux';
import BookItem from '../../ProductsList/BookItem';
import './Product.scss'



const Product = () => {
    const data = useSelector(state => allBooks(state))
    const searchId = useParams()
console.log('data',data)
    return data.filter(item => item.key === searchId.id).map(book =><div className='product__wrapper'><BookItem key={searchId.id} item={book} visibleForm={true}/></div>)
        
}

export default Product