import React, { useState, useEffect } from 'react'
import axios from 'axios' 
import { Link } from 'react-router-dom'

export default function ScoreBoard() {
    const [allPlayers, setAllPlayers] = useState([])

    useEffect( () => {
        axios.get('http://127.0.0.1:3001/players').then((respons) => {
            setAllPlayers(respons.data);
        })
   }, [])


    return (
        <div className = "scoreboard-container">
            <ul className='scoreboard'>
                {allPlayers.map((player, i) => {return (<div className='scoreboard-player' key={i}><p>{player.name}</p><p>{player.score}</p></div>)})}             
            </ul>
            <Link to={'/tournament'}>
                <button>Back</button>
            </Link>
        </div>
    )
}