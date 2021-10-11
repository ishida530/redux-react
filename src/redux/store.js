import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import shortid from "shortid";


let lengthArrayBooks = 0;
const fun = arr => Object.values(arr).forEach(e => {
    
    if(isNaN(e.count)){console.log("e.count",e.count)}
    else return lengthArrayBooks += e.count
    
    });
//selectors
export const countInBasket = (state) => {
    lengthArrayBooks = 0;
    if (state.basket.length !== 0) {
        fun(state.basket)
    }
    return lengthArrayBooks
}
export const basketList = (state) => state.basket;
export const priceForAll=state=>{
    let price=0;
    state.basket.forEach(item=>{
        if(isNaN(item.count))return
        else price+=item.price*item.count
    })
    return price
}
export const getRequestInfo = state => state.request



const createActionName = name => `app/books/${name}`
// action names
const UPDATE_BOOKS = createActionName('UPDATE_BOOKS')
const ADD_BOOK_TO_BASKET = createActionName('ADD_BOOK_TO_BASKET')
const REMOVE_BOOK_FROM_BASKET = createActionName('REMOVE_BOOK_FROM_BASKET')
const REMOVE_ALL_BOOK_FROM_BASKET = createActionName('REMOVE_ALL_BOOK_FROM_BASKET')
const START_REQUEST = createActionName('START_REQUEST')
const FINISH_REQUEST_WITH_ERROR = createActionName('FINISH_REQUEST_WITH_ERROR')
const FINISH_REQUEST_WITH_SUCCESS = createActionName('FINISH_REQUEST_WITH_SUCCESS')
const SET_AMOUNT_BOOK = createActionName('SET_AMOUNT_BOOK')

// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })
export const addItemToBasket = payload => ({ type: ADD_BOOK_TO_BASKET, payload })
export const removeItemfromBasket = payload => ({ type: REMOVE_BOOK_FROM_BASKET, payload })
export const removeProduct = payload => ({ type: REMOVE_ALL_BOOK_FROM_BASKET, payload })
export const startRequest = () => ({ type: START_REQUEST })
export const finishRequestWithError = () => ({ type: FINISH_REQUEST_WITH_ERROR })
export const finishRequestWithSuccess = () => ({ type: FINISH_REQUEST_WITH_SUCCESS })
export const setAmountBooks = payload => ({ type: SET_AMOUNT_BOOK, payload })





const initialState = {
    basket: [],
    request:{
        request: {
            pending: false,
            error: false,
            success: false
        }
    }
}


export const compare=( a, b )=> {
    if ( a.title < b.title ){
        return -1;
      }
      if ( a.title > b.title ){
        return 1;
      }
      return 0;
  }
export const fetchbooks = () => {
    return async (dispatch) => {
        try {
            dispatch(startRequest())
            const res = await fetch('https://wolnelektury.pl/api/authors/adam-mickiewicz/kinds/liryka/books/')
            const data = await res.json()
            const newData = data.map(item => (
                {
                    ...item,
                    key: shortid().toString(),
                    price: (Math.random() * 100.00).toFixed(2),
                })
            
            );

            dispatch(updateBooks(newData))
            dispatch(finishRequestWithSuccess())
        } catch (err) {
            console.error(err)
            dispatch(finishRequestWithError())

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

                    counter = 0

                    if (item.key === payload.key) {
                        
                        counter = item.count
                        payload.count += counter
                    }
                    if (item.key !== payload.key) return item
                }), payload].sort(compare),

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
                }), payload].sort(compare),

            }
        case REMOVE_ALL_BOOK_FROM_BASKET:
            return {
                ...state, basket: [...state.basket.filter(item => item.key !== payload.key)].sort(compare),

            }
            case START_REQUEST:
                return { ...state, request: { pending: true, error: false, success: false }}
            case FINISH_REQUEST_WITH_SUCCESS:
                return { ...state, request: { pending: false, error: false, success: true }}
            case FINISH_REQUEST_WITH_ERROR:
                return { ...state, request: { pending: false, error: true, success: false }}

                case SET_AMOUNT_BOOK:
                    return {
                        ...state,
                        basket: [...state.basket.filter(item => {

                            counter = 0
        
                            // if (item.key === payload.key) {
                                
                            //     counter = item.count
                            //     payload.count = counter
                            // }
                            if (item.key !== payload.key) return item
                        }), payload].sort(compare),
        
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


