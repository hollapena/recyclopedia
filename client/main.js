const searchForm = document.getElementById('searchform')
const itemText = document.getElementById('bar').value
const itemSubmit = document.getElementById('submitbutton')
const recycleCity = document.getElementById('recyclecity').value
const recycleState = document.getElementById('recyclestate').value
const recycleSubmit = document.getElementById('recyclesubmit')

console.log(itemText)

// recycleSubmit.addEventListener('click', recycleLocations)

// searchForm.addEventListener('submit', isRecyclable)

// function isRecyclable(evt){
   
//    axios.get(`http://localhost:4567/api/recyclables/${itemText}`)
//    .then(res => {
//        console.log(res.data)
//    })
// }

// import { apiKeys } from "../config.js";


// function recycleLocations(evt){
//     evt.preventDefault()

//     body={
//         'api_key':`${apiKeys.recycle_api_key}`,
//         'query': recycleCity,
//         'country': 'US',
//         'province': recycleState,
//     }
//     axios.get(`http://api.earth911.searchPostalDataPhonetic(${body})`)
//     .then((res) => {
//         console.log(res.data)
//     })
// }
