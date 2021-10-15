import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.scss'
import { allBooks, checkBasket, percentSale, priceAfterSale, fetchBooks } from '../../../redux/booksRedux'
import { Link } from 'react-router-dom'
import Countdown from 'react-countdown';



import img1 from './img/pexels-kaboompics-com-6332.jpg'
import img2 from './img/pexels-maël-balland-3457273.jpg'
import img3 from './img/pexels-martin-péchy-922100.jpg'

const slides=[
    img1,img2,img3
]
let index=0

const Home = () => {
    const [slide, setSlide] = useState(img1);
    const [fade, setFade] = useState(true);

    const data = useSelector(state => allBooks(state))
    const dispatch = useDispatch()
    const addBook = book => dispatch(checkBasket(book))
    const getAllBooks = () => dispatch(fetchBooks())



    useEffect(() => {
        setInterval(() => {
            setTimeout(()=> setFade(false),1800)
            setSlide(slides[index])
            setFade(true)
            index++;
            if(index===slides.length) index=0
        }, 2000)
        return ()=>clearInterval(setInterval)
      }, []);
    
    const booksOnSale = (item) => {
        const { key, simple_thumb, title, price, count } = item;
        return (
            <li key={key}>
                <img src={simple_thumb} alt="Logo" />
                <h4>{title}</h4>
                <span><s><span className="item__price--old">{price} </span></s>PLN</span>
                <span><span className="item__price--new">{priceAfterSale(percentSale, price)} </span>PLN</span>
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
                price: priceAfterSale(percentSale, price),
                oldPrice: price
            })
        )
    }
    const dt = new Date();

    return (
        <div className='home'>
            <ul className='home__slider'>
                <img className={fade===true?'fade':null} src={slide} alt={slide}/>
            </ul>
            <h2>Akutalne książki -20% przez: </h2>
            <div className='home__counter'> <Countdown onComplete={() => { localStorage.clear(); return getAllBooks() }}
                 date={dt.setHours(Number(localStorage.getItem("hour")) + 1, 0, 0, 0)} 
               

                />
            </div>
            <ul className='home__list'>
                {data.filter(({ onSale }) => onSale).map(item => booksOnSale(item))}
            </ul>

        </div>

    )
}


export default Home
