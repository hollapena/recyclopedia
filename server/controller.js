const recyclable = require('./recyclable.json')
const donations = require('./donate.json')
let globalID = 78

module.exports = {
    getRecyclables: (req,res) =>{
        const {name} = req.params
        let index = recyclable.findIndex((elem) => elem.item === name)
        res.status(200).send(recyclable[index])
    }, 
    getDonation: (req,res) =>{
        res.status(200).send(donations)
    }, 
    createDonation:(req,res) =>{
        const {title, info, image}=req.body
        const newDonation = {
            id:globalID,
            title,
            info,
            image
        }
        donate.push(newDonation)
        globalID++
        res.status(200).send(donations)

    },
    updateDonation:(req,res) =>{
        const{refId, title, info, image} = req.body
        
        let index = donations.findIndex((elem) => +elem.id === +refId)
        console.log(title,info,image, refId)
        donations[index].title = title
        donations[index].info = info
        donations[index].image = image
        res.status(200).send(donations)
    },
    deleteDonation:(req,res) =>{
        const {id} = req.params
        let index = donations.findIndex((elem) => +elem.id === +id)
        donations.splice(index,1)
        res.status(200).send(donations)
    }
}