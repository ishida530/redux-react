export const sortMinMaxPrice = (a, b) => {
    return a.price - b.price
}
export const sortMaxMinPrice = (a, b) => {
    return b.price - a.price
}
export const sortZA = (a, b) => {
    if (a.title > b.title) {
        return -1;
    }
    if (a.title < b.title) {
        return 1;
    }
    return 0;
}
export const sortAZ = (a, b) => {
    if (a.title < b.title) {
        return -1;
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}