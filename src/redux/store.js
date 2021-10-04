import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import shortid from "shortid";


let lengthArrayBooks = 0;
const fun=arr=> Object.values(arr).forEach(e=> lengthArrayBooks += e.count);
//selectors
export const countInBasket = (state) => {
    lengthArrayBooks = 0;
    console.log('state',state)

    console.log('state.basket',typeof(state.basket))
    if (state.basket.length !== 0) {
        const propertyValues = Object.values(state.basket)
console.log(propertyValues)
        console.log('state.basket',state.basket)
        fun(state.basket)
    }
    return lengthArrayBooks
}
export const basketList = (state) => state.basket;



const createActionName = name => `app/books/${name}`
// action names
const UPDATE_BOOKS = createActionName('UPDATE_BOOKS')
const ADD_BOOK_TO_BASKET = createActionName('ADD_BOOK_TO_BASKET')
const REMOVE_BOOK_FROM_BASKET = createActionName('REMOVE_BOOK_FROM_BASKET')
const REMOVE_ALL_BOOK_FROM_BASKET = createActionName('REMOVE_ALL_BOOK_FROM_BASKET')
// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })
export const addItemToBasket = payload => ({ type: ADD_BOOK_TO_BASKET, payload })
export const removeItemfromBasket = payload => ({ type: REMOVE_BOOK_FROM_BASKET, payload })
export const removeProduct = payload => ({ type: REMOVE_ALL_BOOK_FROM_BASKET, payload })




const initialState = {
    basket: []
}

export const fetchbooks = () => {
    return async (dispatch) => {
        try {
            const res = await fetch('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/')
            const data = await res.json()
            const newData = data.map(item => (
                { ...item, key: shortid().toString() })
            );
            dispatch(updateBooks(newData))
        } catch (err) {
            console.error(err)
        }
    }
}
export const checkBasket = (book, state) => {
    return async (dispatch) => {
        if (book.count === 0) {
            dispatch(removeItemfromBasket(book))
        } else {
            dispatch(addItemToBasket(book))
        }
    }
}
let counter = 0
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_BOOKS:
            return { ...state, books: [...payload] }
        case ADD_BOOK_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket.filter(item => {
                    if (item.key === payload.key) {
                        counter = item.count
                        payload.count = ++counter
                    }
                    if (item.key !== payload.key) return item
                }), payload],

            }
        case REMOVE_BOOK_FROM_BASKET:
            return {
                ...state,
                basket: [...state.basket.filter(item => {
                    if (item.key === payload.key) {
                        counter = item.count
                        payload.count = --counter
                    }
                    if (item.key !== payload.key) return item
                }), payload],

            }
        case REMOVE_ALL_BOOK_FROM_BASKET:
            return {
                ...state, basket: {
                    basket: [...state.basket.filter(item => item.key !== payload.key)]
                }
            }


        default:
            return state
    }
}



const composeEnhancers = composeWithDevTools({});
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);
const store = createStore(reducer, initialState, enhancer)

export default store


