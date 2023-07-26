const pagesKey = 'pages'
const foodKey= 'food'
const orderKey ='order'

let pageJson = localStorage.getItem(pagesKey)
let foodJson = localStorage.getItem(foodKey)
let orderJson = localStorage.getItem(orderKey)


let pagesStore = JSON.parse(pageJson)
let foodStore = JSON.parse(foodJson)
let orderStore = JSON.parse(orderJson)

export default{
    getAllPages(){
        return pagesStore
    },
    getSinglePage(index){
        return pagesStore[index]
    },
    getAllfood(){
        return foodStore
    },
    getAllorders(){
        return orderStore
    }


}