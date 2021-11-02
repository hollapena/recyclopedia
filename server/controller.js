const recyclable = require('./recyclable.json')

let globalID = 78

module.exports = {
    getRecyclables: (req,res) =>{
        const {name} = req.params
        let index = recyclable.findIndex((elem) => elem.item === name)
        res.status(200).send(recyclable[index])
    }
}