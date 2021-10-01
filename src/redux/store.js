import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import shortid from "shortid";


//selectors

export const countInBasket = (state) => state.basket.length;
export const basketList = (state) => state.basket;



const createActionName = name => `app/books/${name}`
// action names
const UPDATE_BOOKS = createActionName('UPDATE_BOOKS')
const ADD_BOOK_TO_BASKET= createActionName('ADD_BOOK_TO_BASKET')
const INCREMENT_COUNT_IN_BASKET=createActionName('INCREMENT_COUNT_IN_BASKET')
// action creators
export const updateBooks = payload => ({ type: UPDATE_BOOKS, payload })
export const addItemToBasket = payload => ({ type: ADD_BOOK_TO_BASKET, payload })
export const incrementItemBasket = payload => ({ type: INCREMENT_COUNT_IN_BASKET, payload })





const initialState = {
    basket:[]
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
export const checkBasket = (book,state) => {
    console.log('state',state)
    console.log('book',book)
    return async (dispatch) => {


        // const countItem = state.basket.filter(item => {
        //     console.log('item.key',item.key)
        //     console.log('book.key',book.key)
        //     return item.key === book.key
        // })

    // console.log('countItem.length',countItem.length)
    // state.basket.length > 1 ?  incrementItemBasket() : dispatch(addItemToBasket(book))
    dispatch(addItemToBasket(book))

}
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UPDATE_BOOKS:
            return { ...state, books: [...payload] }
        case ADD_BOOK_TO_BASKET:
        return  { ...state,basket: [...state.basket.filter(item=>{

if(item.key === payload.key){
    return item.count++
  //  return console.log('item key',item,'vs', 'payload',payload)
}else return [...state.basket,payload]

        }), payload] }
        case INCREMENT_COUNT_IN_BASKET:
            return  { ...state,basket: [...state.basket, payload.key++] }
            // return  { ...state,basket: [...state.basket.filter(item=>item.key===payload.key)] }
     


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


