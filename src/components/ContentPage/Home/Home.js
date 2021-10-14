import React,{useEffect,useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import './Home.scss'
import { allBooks, checkBasket, percentSale,priceAfterSale,fetchBooks } from '../../../redux/booksRedux'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown';




const Home = () => {
const [timeSale, setTimeSale] = useState(0)
const [newFetch, setNewFetch] = useState(false)
    const data = useSelector(state => allBooks(state))

    const dispatch = useDispatch() 
    const addBook = book => dispatch(checkBasket(book))
    const getAllBooks = () => dispatch(fetchBooks())

   

    // const incrementCountBook = book => dispatch(checkBasket(book))
    const booksOnSale = (item) => {
        const { key, simple_thumb, title, price, count } = item;
        return (
            <li key={key}>
                <img src={simple_thumb} alt="Logo" />
                <h4>{title}</h4>
                <span><s><span className="item__price--old">{price} </span></s>PLN</span>
                <span><span className="item__price--new">{priceAfterSale(percentSale,price)} </span>PLN</span>
                <Link to={`/product/${key}`}>Zobacz</Link>
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
                price: priceAfterSale(percentSale,price),
                oldPrice:price
            })
        )
    }

    console.log(typeof(Date.now()))
    console.log(typeof(localStorage.getItem('time')));
        useEffect(() => {
            setTimeSale(Number(localStorage.getItem('time')));
            
           const interval = setInterval(() => {
                setTimeSale(time => time - 1);
              }, 1000);
              return () => clearInterval(interval)
        }, [])
    return (
        <div className='home'>
            <h2>Akutalne książki -20% przez: </h2>
           <div className='home__counter'> <Countdown onComplete={()=> {localStorage.clear();return getAllBooks()}} date={timeSale+5000 }/></div>

            <ul>
                {data.filter(({ onSale }) => onSale).map(item => booksOnSale(item))}
            </ul>

        </div>

    )
}


export default Home
