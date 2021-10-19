import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkBasket, percentSale, priceAfterSale } from '../../../redux/booksRedux'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { IoIosAddCircleOutline } from "react-icons/io";
import './BookItem.scss'


const BookItem = (book) => {
    const [countBook, setCountBook] = useState(1)
    const [disabledBtn, setDisabledBtn] = useState(false)
    const { item, visibleForm } = book
    const dispatch = useDispatch()
    const addBook = book => dispatch(checkBasket(book))

    const { key, simple_thumb, title, price, count, onSale, href } = item;


    const handleOnClik = (e, book) => {
        e.preventDefault();
        const { key, simple_thumb, title, price, onSale, href } = book
        return (
            addBook({
                key: key,
                img: simple_thumb,
                title: title,
                count: 1,
                price: priceAfterSale(percentSale, price),
                oldPrice: price,
                onSale: onSale,
                href: href
            })
        )
    }
    const onSaleItems = () => (
        <>
            <span><s><span className="item__price--old">{price} </span></s>PLN</span>
            <span><span className="item__price--new">{priceAfterSale(percentSale, price)} </span>PLN</span>
        </>
    )

    const handleOnChange = (e) => {
        const tagret = e.target.value
        parseInt(tagret) === 0 || tagret.length === 0 || tagret < 0 ? setDisabledBtn(true) : setDisabledBtn(false)
        setCountBook(tagret)
    }
    const handleSubmit = (e, book) => {

        e.preventDefault();
        setDisabledBtn(true)
        setCountBook(1)
        const { key, simple_thumb, title, price, onSale } = book.item
        return (
            addBook({
                key: key,
                img: simple_thumb,
                title: title,
                count: parseInt(countBook),
                price: price,
                onSale: onSale,
                oldPrice: price
            })
        )
    }
    return (
             <li className='bookItem'>
            <img src={simple_thumb} alt="Logo" />
            <div className='li__div--info'>
                <h3>{title}</h3>
                {onSale ? onSaleItems() : <span><span>{price}</span> PLN </span>}
                {visibleForm ? <>
                    <form onSubmit={(e) => { return handleSubmit(e, book) && setCountBook(1) }}>
                        <input type="number" min={1} value={countBook} onChange={e => handleOnChange(e)} />
                        <button disabled={disabledBtn} type='submit'><IoIosAddCircleOutline /></button>
                    </form>


                </> : <>
                    <Link to={`/product/${key}`}>Więcej szczegółów <FaLongArrowAltRight /></Link>
                    <span className='product__span-alert'>
                        <button className='li__btn--addBasket' onClick={e => handleOnClik(e, item)}>
                            <IoIosAddCircleOutline />
                        </button>{count > 0 ? 'Dodano: ' + count + "szt." : null}
                    </span>
                </>

                }
            </div>
        </li>
        


    

    )
}

export default BookItem
