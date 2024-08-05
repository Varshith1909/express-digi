import express from 'express'

const app = express()
const port = 3000
app.use(express.json())

let data = []
let nextId = 1

app.post('/cricket', (req, res) => {
    const {name, team} = req.body
    const newPlayer = {id: nextId++, name, team}
    data.push(newPlayer)
    res.status(201).send(newPlayer)
})

app.get('/cricket', (req, res) => {
    res.status(200).send(data)
})

app.get('/cricket/:id', (req, res) => {
    const player = data.find(p => p.id === parseInt(req.params.id))

    if(!player){
        return res.status(404).send('Player Not Found')
    }

    return res.status(200).send(player)
})

app.put('/cricket/:id', (req, res) => {
    const player = data.find(p => p.id === parseInt(req.params.id))

    if(!player){
        return res.status(404).send('Player Not Found')
    }
    const {name,team} = req.body
    player.name = name
    player.team = team
    res.status(200).send(player)
})

app.delete('/cricket/:id', (req, res) => {
    const index = data.findIndex(p => p.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send("Player Not Found")
    }
    data.splice(index, 1)
    return res.status(204).send('Deleted Player Sucessfully')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})