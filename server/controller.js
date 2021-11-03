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

    },
    updateDonation:(req,res) =>{

    },
    deleteDonation:(req,res) =>{
        
    }
}