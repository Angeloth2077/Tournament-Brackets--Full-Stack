const express = require('express')
const app = express()
const db = require('./models')
const port = 3001
const cors = require('cors')
app.use(express.json())
app.use(cors())



// Routers
const playerRouter = require('./routers/players')
app.use('/players', playerRouter)

// Reset table
app.delete('/resetTournament', async (req, res) => {
  try {
    await db.players.destroy({ where: {} })
    res.status(200).send('Tournament reset')
  } catch (err) {
    console.log('Error reseting tournament: ' + err)
    res.status(500).send('Tournament reset')
  }
})


// Listeners
db.sequelize.sync().then(() => {
  app.listen(port, '127.0.0.1', () => {
    console.log(`Server running on 127.0.0.1:${port}`)
  })
})

