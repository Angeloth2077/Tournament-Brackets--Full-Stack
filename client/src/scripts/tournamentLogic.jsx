import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

// Start Component
export function Start() {
    const [players, setPlayers] = useState([])

    // Fetch players from the server
    useEffect(() => {
      axios.get('http://127.0.0.1:3001/players').then(response => {
            console.log(response.data)
            setPlayers(response.data) // Ensure this updates your players state
        }).catch(error => console.error('Error fetching players:', error))
    }, [])

    return(
        <>
            {players.map((player, i) => (
                <div key={i}>
                    {player.name}
                    <button onClick={() => {
                        setPlayers(prevPlayers => {
                            const updatedPlayers = [...prevPlayers]
                            updatedPlayers[i].wins = 1
                            return updatedPlayers
                        })
                    }}>
                        Wins
                    </button>
                </div>
            ))}
            {/* Passing setPlayers down to Finals */}
            <Finals players={players} setPlayers={setPlayers} />
            <EndTournament setPlayers={setPlayers} />
        </>
    )
}

// Finals Component
export function Finals({ players, setPlayers }) {
    // Filter players who have won in the first round
    const finalists = players.filter(player => player.wins === 1)

    return(
        <>
            {finalists.map((player, i) => (
                <div key={i}>
                    {player.name}
                    <button onClick={() => {
                        setPlayers(prevPlayers => {
                            const updatedPlayers = [...prevPlayers];
                            const index = prevPlayers.findIndex(p => p.name === player.name);
                            updatedPlayers[index].wins2 = 1;
                            return updatedPlayers;
                        });
                    }}>
                        Winner
                    </button> 
                </div>
            ))} 

            <Winner finalists={finalists} />
        </>
    )
}

// Winner Component
export function Winner({ finalists }) {
    // Find the winner in the second round
    const winner = finalists.find(player => player.wins2 === 1);

    return(
        <div>
            {winner ? <div>{winner.name} Wins</div> : <div>No winner yet</div>}
        </div>
    )
}

// EndTournament Component
export function EndTournament({ setPlayers }) {
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
            <Link to = '/scoreboard'>
                <button onClick={endTournament}>Scoreboard</button>
            </Link>
            <Link to = '/'>
                <button onClick={endTournament}>Finish tournament</button>
            </Link>
        </>
    )
}

