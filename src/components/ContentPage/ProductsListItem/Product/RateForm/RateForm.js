import React, { useEffect, useState  } from 'react';

import ReactStars from "react-rating-stars-component";
import { useSelector, useDispatch } from 'react-redux';
import shortid from 'shortid';
import { addComment, allBooks } from '../../../../../redux/booksRedux';
export let newValue1 = 0;

const RateForm = ({ item }) => {
    const { key, comments } = item;
    const [textarea, setTextarea] = useState('')
    const [name, setName] = useState('')
    const [rateStar, setRateStar] = useState(0)

    const [stars, setStars] = useState({
        size: 40,
        count: 5,
        isHalf: false,
        color: "#ddd",
        activeColor: "gold",
        emptyIcon: <i className="far fa-star" />,
        value:rateStar,
        onChange: (newValue) => {
            console.log('klik',rateStar);
            setRateStar(Number(newValue))

            console.log('po klik',rateStar);

           console.log('onchange',stars)
        },
      
    });

useEffect(() => {
//  setStars(prevState => ({
//             ...prevState,
//             value: 0
//          }))  

//            console.log('przed',stars)

    return () => {
        setStars(prevState => ({
            ...prevState,
            value: rateStar

         }))
        console.log('po',stars)
    }
}, [])
    const getAllBooks = useSelector(state => allBooks(state))
    const [hiddenStarsRate, setHiddenStarsRate] = useState(false)
    const dispatch = useDispatch()
    const addRate = message => dispatch(addComment(message))

    // const starsRate = {
    //     size: 40,
    //     count: 5,
    //     isHalf: false,
    //     color: "#ddd",
    //     activeColor: "gold",
    //     emptyIcon: <i className="far fa-star" />,
    //     value:0,
    //     onChange: (newValue) => {
    //         setRateStar(newValue);
    //        setStars(newValue)     
    //     },
      
    // };   

    const handleOnSubmit = (e) => {
        setHiddenStarsRate(true)
        e.preventDefault();
        console.log('rate przed wyslaniem', rateStar)
        addRate({
            full_name: name,
            rate: rateStar,
            message: textarea,
            key: key
        })
        setName("");
        setTextarea("")
        setHiddenStarsRate(false)

return setRateStar(0)

    }


    return (

        <div className='formRate__wrapper'>

            <form className='formRate' onSubmit={handleOnSubmit}>
                <label><input value={name} onChange={(e) => setName(e.target.value)} placeholder='imie i nazwisko' /></label>
                <div className='formRate__label--rate'> Ocena:  {hiddenStarsRate===false?<div><ReactStars  {...stars}  /> </div>:null}</div>
                <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} maxLength={100} rows="4" cols="50" />
                <button type='submit'>Wyślij</button>
            </form>
            <div className='formRate__comments' id='wrapper' >
                {getAllBooks.filter(item => item.key === key).map(({ comments }) => comments.map(comment => {       
                    const { full_name, rate, message } = comment;
                    const commentRates = {
                        size: 20,
                        value: rate,
                        edit: false,
                    };
                    return <div className='formRate__comments--singleComment'>
                        <p>Imie i nazwisko: <span>{full_name}</span></p>
                        <div>Ocena: <ReactStars { ...commentRates} /></div>
                        <p>Komentarz:{message}</p>
                    </div>
                })
                )
                }
            </div>
        </div>

    )
}

export default RateForm
