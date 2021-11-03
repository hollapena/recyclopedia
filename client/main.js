const searchForm = document.getElementById('searchform')
const itemText = document.querySelector('#bar')
const itemSubmit = document.getElementById('submitbutton')
const recycleCity = document.getElementById('recyclecity').value
const recycleState = document.getElementById('recyclestate').value
const recycleSubmit = document.getElementById('recyclesubmit')
const modal = document.getElementsByClassName('bg-modal')
const close = document.getElementsByClassName('.close')

close.addEventListener('click',closeModal)

function closeModal(){

}

import { apiKeys } from "../config.js";

recycleSubmit.addEventListener('click', recycleLocations)
searchForm.addEventListener('click', isRecyclable)

function isRecyclable(evt){
    evt.preventDefault()
   console.log(itemText.value)
   
   let text = itemText.value
   axios.get(`http://localhost:4567/api/recyclables/${text}`)
   .then(res => {

       console.log(res.data)
       console.log('it worked')
   })
}


function recycleLocations(evt){
    evt.preventDefault()

    const body={
        'api_key': apiKeys.recycle_api_key,
        'query': recycleCity,
        'country': 'US',
        'province': recycleState,
    }
    axios.get(`http://api.earth911.com/earth911.searchPostalDataPhonetic(${body})`)
    .then((res) => {
        console.log(res.data)
    })
}
