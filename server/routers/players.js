const express = require('express')
const router = express.Router()
const { players } = require('../models')

router.get("/", async (req, res) => {
    const allPlayers = await players.findAll()
    res.json(allPlayers)
})

router.post("/", async (req, res) => {
    const player = req.body
    await players.create(player)
    res.json(player)
    
})

module.exports = router