import { sortZA, sortMinMaxPrice, sortMaxMinPrice,sortAZ } from './../components/ContentPage/ProductsList/sortFunctions';


export const initialState = {
    basket: [],
    request: {
        request: {
            pending: false,
            error: false,
            success: false
        }
    }
}
export const sortOptions = [
    { value: 'by Name', label: 'a-z', filter: sortAZ },
    { value: 'by Name z-a', label: 'z-a', filter: sortZA },
    { value: 'od najmniejszej', label: 'min-max cena', filter: sortMinMaxPrice },
    { value: 'od nawiekszej', label: 'max-min cena', filter: sortMaxMinPrice }
]
export const itemsOnPageOptions = [
    { value: 5, label: '5'  },
    { value: 10, label: '10'  },
    { value: 15, label: '15' },
    { value: 20, label: '20' },
    { value: 25, label: '25' },
    { value: 50, label: '50' },
    { value: 100, label: '100', },
    { value:"all", label: 'wszystkie'},
]