import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/reset.css'

export default function Reset({ setPlayers }) {
    const endTournament = () => {
        axios.delete('http://127.0.0.1:3001/resetTournament')
            .then(() => {
                setPlayers([]);  // Reset local state
            })
            .catch(err => {
                console.error('Failed to reset tournament', err);
            });
    }

    return (
        <>
            {/* <Link to = '/scoreboard'>
                <button onClick={endTournament}>Scoreboard</button>
            </Link> */}
            <Link to = '/'  className='finish-btn'>
                <button className='fn-btn' onClick={endTournament}>Finish tournament</button>
            </Link>
        </>
    )
}