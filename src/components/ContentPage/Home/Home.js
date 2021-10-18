import React,{useEffect,useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.scss'
import { allBooks, fetchBooks } from '../../../redux/booksRedux'
import Countdown from 'react-countdown';
import img1 from './img/pexels-kaboompics-com-6332.jpg'
import img2 from './img/pexels-maël-balland-3457273.jpg'
import img3 from './img/pexels-martin-péchy-922100.jpg'
import BookItem from '../ProductsList/BookItem'

const slides=[
    img1,img2,img3
]
let index=0

const Home = () => {
    const [slide, setSlide] = useState(img1);
    const [fade, setFade] = useState(true);

    const data = useSelector(state => allBooks(state))

    const dispatch = useDispatch()
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
    

    const dt = new Date();

    return (
        <div className='home'>
            <ul className='home__slider'>
                <img className={fade===true?'fade':null} src={slide} alt={slide}/>
            </ul>
            <h2>Akutalne książki -20% przez: </h2>
            <div className='home__counter'> 
            <Countdown onComplete={() => { localStorage.clear(); return getAllBooks() }}
                 date={dt.setHours(Number(localStorage.getItem("hour")) + 1, 0, 0, 0)} />
            </div>
            <ul className='home__list'>
                {data.filter(({ onSale }) => onSale).map(item => <BookItem key={item.key} item={item}/>)}
            </ul>

        </div>

    )
}


export default Home
