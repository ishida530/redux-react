import React from 'react'
import { connect } from 'react-redux'
import shortid from 'shortid';
import styled from 'styled-components';
import { basketList, checkBasket, removeProduct, countInBasket, priceForAll, setAmountBooks } from '../../../redux/store'
const DivWrapper = styled.div`
padding: 15px 20px;
ol{padding:0;
li{
display:flex;
justify-content: space-between;
margin: 15px;
&>span{
    width: 15%;
}}}
.sum{margin: 15px;

    font-size: 24px;
}
`




const Basket = ({ basketList, countBook, removeBook, itemsBasket, price,setCountBook }) => {

    console.log('aaaaa', price)
    const handleIncrementBtn = (e, book) => {
        e.preventDefault()
        countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 1,
            price: book.price
        })
    }
    const handleDecrementBtn = (e, book) => {
        e.preventDefault()
        if (book.count > 1) countBook({
            key: book.key,
            img: book.simple_thumb,
            title: book.title,
            count: 0,
            price: book.price

        })
         else removeBook({
            key: book.key,
        })
    }
    const handleRemoveBtn = (e, book) => {
        e.preventDefault()
        removeBook({
            key: book.key,
        })
    }
    const handleOnChange=(e,book)=>{

if(parseInt(e.target.value)===0) removeBook({
    key: book.key,
});else setCountBook({
        key: book.key,
        img: book.simple_thumb,
        title: book.title,
        count: parseInt(e.target.value),
        price: book.price

})

    }
    const li = (item) => (
        <li key={shortid()}>
            <span>{item.title}.</span>
            <div>
                <label><b> Ilośc sztuk:</b> <input type="number" value={item.count} onChange={e=>handleOnChange(e,item)} /></label>
                <button onClick={e => handleIncrementBtn(e, item)}>+</button>
                <button onClick={e => handleDecrementBtn(e, item)}>-</button>
            </div>
            <label><b> Cena:</b><span>{item.price} PLN</span></label>
            <div>

                <button onClick={(e) => handleRemoveBtn(e, item)}>Usuń </button>
            </div>
        </li>
    )

    return (
        <DivWrapper>
            <ol>
                {itemsBasket === 0 ? <h1>Koszyk jest pusty</h1> : basketList.map(item => li(item))}
            </ol>
            <p className="sum"><b>SUMA:</b> <span>{price.toFixed(2)}PLN</span></p>
        </DivWrapper>
    )
}
const mapStateToProps = state => ({
    basketList: basketList(state),
    itemsBasket: countInBasket(state),
    price: priceForAll(state)
})
const mapDispatchToProps = dispatch => ({
    countBook: book => dispatch(checkBasket(book)),
    removeBook: book => dispatch(removeProduct(book)),
    setCountBook:book=>dispatch(setAmountBooks(book))
})
export default connect(mapStateToProps, mapDispatchToProps)(Basket)
