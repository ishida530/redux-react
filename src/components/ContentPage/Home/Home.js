import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import './Home.scss'
import { allBooks, checkBasket, percentSale,priceAfterSale } from '../../../redux/booksRedux'




const Home = () => {
    const data = useSelector(state => allBooks(state))

    const dispatch = useDispatch() 
    const addBook = book => dispatch(checkBasket(book))

   
    // const incrementCountBook = book => dispatch(checkBasket(book))
    const booksOnSale = (item) => {
        const { key, simple_thumb, title, price, count } = item;
        return (
            <li key={key}>
                <img src={simple_thumb} alt="Logo" />
                <h4>{title}</h4>
                <span><s><span className="item__price--old">{price} </span></s>PLN</span>
                <span><span className="item__price--new">{priceAfterSale(percentSale,price)} </span>PLN</span>
                {/* <Link to={`/product/${key}`}>Zobacz</Link>*/}
            <button onClick={e => handleOnClik(e, item)}> Dodaj do koszyka</button> 
                <span className='product__span-alert'>{count > 0 ? 'Dodano: ' + count + "szt." : null}</span>
            </li>
        )
    }
    const handleOnClik = (e, book) => {
        e.preventDefault();
        const { key, simple_thumb, title, price } = book
        return (
            addBook({
                key: key,
                img: simple_thumb,
                title: title,
                count: 1,
                price: price,
            })
        )
    }
    return (
        <div className='home'>
            <h2>Akutalne książki -20%:</h2>
            <ul>
                {data.filter(({ onSale }) => onSale).map(item => booksOnSale(item))}
            </ul>

        </div>

    )
}


export default Home
