import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { allBooks } from '../../../../redux/booksRedux';
import BookItem from '../../ProductsList/BookItem';
import './Product.scss'
import Loader from 'react-loader-spinner';



const Product = () => {

    const searchId = useParams()
    const data = useSelector(state => allBooks(state))
    const [loader, setLoader] = useState(true)
    const [fragment, setFragment] = useState(0)

    const getFragmentBook = async (url) => {
        setLoader(true)
        const response = await fetch(`${url}`);
        const data = await response.json()
        if (data.fragment_data) {
            setFragment(data.fragment_data)
        } else return

        return data.fragment_data
    }

    useEffect(() => {
        data.filter(item => item.key === searchId.id).map(book => getFragmentBook(book.href).then(() => setLoader(false)
        ))

    }, [])


    return data.filter(item => item.key === searchId.id).map(book => {
        return (
            <div key={searchId.id} className='product__wrapper'>
                <BookItem  item={book} visibleForm={true} />
                <div>
                    <h3>Fragment książki:</h3>
                    {loader ? <Loader /> : <p dangerouslySetInnerHTML={{ __html: `${fragment !== 0 ? fragment.html : '<div >BRAK FRAGMENTU</div>'}` }}></p>}
                </div>
            </div>)
    })

}

export default Product