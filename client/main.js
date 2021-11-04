// REDUCE AREA

// RECYCLE AREA
const searchForm = document.getElementById('searchform')
const itemText = document.querySelector('#bar')
const itemSubmit = document.getElementById('submitbutton')
const recycleZip = document.getElementById('recyclezip')
const recycleSubmit = document.getElementById('recyclesubmit')
const recycleContainer = document.getElementById('recycle-container')

// REUSE AREA
const recycleModal = document.getElementsByClassName('bg-modal')
const close = document.getElementsByClassName('.close')
const donationContainer = document.getElementById('donation-container')
const reuseButton = document.getElementById('reusebutton')
const addDonationButton = document.getElementById('add-donation')
const updateReuseBtn = document.getElementById('reuse-update-button')
const modalUpdateTitle = document.getElementById('update-donate-title')
const modalUpdateInfo = document.getElementById('update-donate-info')
const modalUpdateImage = document.getElementById('update-donate-image')
const modalUpdateId = document.getElementById('reuse-id')
const modalUpdateClose=document.getElementsByClassName('reuse-update-close')[0]


// function closeModal(){

// }

import { apiKeys } from "../config.js";
// import { deleteDonation } from "../server/controller.js"

modalUpdateClose.addEventListener('click', () => {
    document.querySelector('.reuse-update-modal').style.display='none';
})
updateReuseBtn.addEventListener('click', updateReuse)
recycleSubmit.addEventListener('click', recycleLocations)
searchForm.addEventListener('click', isRecyclable)
reuseButton.addEventListener('click', getDonations)
// addDonationButton.addEventListener('click', addDonation)


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

function getDonations(evt){
    evt.preventDefault()
   
   axios.get(`http://localhost:4567/api/donate`)
   .then(res => {
       donationContainer.innerHTML=''
       for(let i=0; i<res.data.length; i++){
           newDonation(res.data[i])
       }
       let deletebtns = document.getElementsByClassName('donation-delete')
       for(let i = 0; i<deletebtns.length; i++){
           deletebtns[i].addEventListener('click', (evt) => {
             deleteDonation(evt.target.id)})
       }
       let updatebtns = document.getElementsByClassName('donation-update')
        for(let i = 0; i<updatebtns.length; i++){
        updatebtns[i].addEventListener('click', (evt) => {
            openReuseModal(evt.target.id)})
    }
   }
   )}

function deleteDonation(id){
    let refId= id
    axios.delete(`http://localhost:4567/api/donate/${refId}`)
    .then(res => {
        donationContainer.innerHTML=''
        for(let i=0; i<res.data.length; i++){
            newDonation(res.data[i])
        }
        let deletebtns = document.getElementsByClassName('donation-delete')
        for(let i = 0; i<deletebtns.length; i++){
            deletebtns[i].addEventListener('click', (evt) => {
              deleteDonation(evt.target.id)})
        }
        let updatebtns = document.getElementsByClassName('donation-update')
         for(let i = 0; i<updatebtns.length; i++){
         updatebtns[i].addEventListener('click', (evt) => {
             openReuseModal(evt.target.id)})
     }
    }
    )}

function newDonation(res){
    const{id, image, info, title} = res
    let donation = document.createElement('div')
    donation.classList.add('donation-display')

    donation.innerHTML = `<h2 class="donation-title">${title}</h2><p class="donation-info">${info}</p><img class="donation-image" src="${image} alt="donation image">
    <button id="${id}" class="donation-update">Update</button>
    <button id="${id}" class="donation-delete">Delete</button>`
    
    donationContainer.append(donation)

}

function openReuseModal(id){
    document.querySelector('.reuse-update-modal').style.display='flex';
    let input = document.getElementById('reuse-id')
    input.value=id
}

function updateReuse(id){
    let refId = modalUpdateId.value
    let title=modalUpdateTitle.value
    let info=modalUpdateInfo.value
    let image=modalUpdateImage.value

    let body = {
        refId,
        title,
        info,
        image
    }
    axios.put(`http://localhost:4567/api/donate/${refId}`,body)
    .then((res) => {

    donationContainer.innerHTML=''
       for(let i=0; i<res.data.length; i++){
           newDonation(res.data[i])
       }
       let deletebtns = document.getElementsByClassName('donation-delete')
       for(let i = 0; i<deletebtns.length; i++){
           deletebtns[i].addEventListener('click', (evt) => {
             deleteDonation(evt.target.id)})
       }
       let updatebtns = document.getElementsByClassName('donation-update')
        for(let i = 0; i<updatebtns.length; i++){
        updatebtns[i].addEventListener('click', (evt) => {
            openReuseModal(evt.target.id)})
    }
    document.querySelector('.reuse-update-modal').style.display='none';
})}
   

function recycleLocations(evt){
    evt.preventDefault()
    recycleContainer.innerHTML=''
    let zip = +recycleZip.value
    console.log(zip)
    axios.get(`https://api.earth911.com/earth911.getPostalData?api_key=e3a3aa2ee7c4944e&country=US&postal_code=${zip}`)
    .then((res) => {
        let result=res.data
        let info = result.result
        let latitude = info.latitude.toFixed(2)
        let longitude = info.longitude.toFixed(2)
        axios.get(`https://api.earth911.com/earth911.searchLocations?api_key=e3a3aa2ee7c4944e&latitude=${latitude}&longitude=${longitude}&max_distance=15&max_results=5`)
        .then((res) => {
            let location=res.data
            let locationList=location.result
            for(let i = 0; i<locationList.length; i++){
                let locationId=locationList[i].location_id
                axios.get(`https://api.earth911.com/earth911.getLocationDetails?api_key=e3a3aa2ee7c4944e&location_id=${locationId}`)
                .then((res) => {
                    let details = res.data
                    let bestDetails = details.result
                    let concise = bestDetails[locationId]
                    let address = concise.address
                    let city = concise.city
                    let name = concise.description
                    let hours = concise.hours
                    let phone = concise.phone
                    let url = concise.url
                    let locationArr = []
                    let newLocation = {
                        name,
                        address,
                        city,
                        hours,
                        phone,
                        url
                    }
                    locationArr.push(newLocation)
                    createRecycleLocation(locationArr)
                })
                    }
                }
            )
        }
    )   
}

function createRecycleLocation(arr){
    
for(let i = 0; i<arr.length; i++){
    const{name, address, city, hours, phone, url} = arr[i]
    let recyclingCenter = document.createElement('div')
    recyclingCenter.classList.add('recycling-center-display')

    recyclingCenter.innerHTML = `
    <h2 class="location-name">${name}</h2>
    <h3 class="location-address">${address}</h3>
    <h3 class="location-city">${city}</h3>
    <h3 class="location-hours">${hours}</h3>
    <h3 class="location-phone">${phone}</h3>
    <a href="${url}" class="location-url">${name}</a>`
    
    recycleContainer.append(recyclingCenter)
}
}