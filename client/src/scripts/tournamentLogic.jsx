import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/tournament.css'

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

    // Filter players who have won in the first round
    const finalists = players.filter(player => player.wins === 1)

    return(
        <>
            <EndTournament setPlayers={setPlayers} />
            <div className='phase phase1'>
                {players.map((player, i) => (
                    <div className='player-container' key={i}>
                        <div className={`player player-${i} box`} onClick={() => {
                            setPlayers(prevPlayers => {
                                const updatedPlayers = [...prevPlayers]
                                updatedPlayers[i].wins = 1
                                return updatedPlayers
                            })
                        }}>
                            {player.name}
                        </div><div className={`light-${i} lights`}></div>
                    </div>
                ))}
                {/* Passing setPlayers down to Finals */}
            </div>
            <Finals players={players} setPlayers={setPlayers} finalists={finalists} />
            <Winner finalists={finalists} />
        </>
    )
}

// Finals Component
export function Finals({ players, setPlayers, finalists }) {
    console.log(finalists)
    if(finalists.length === 0){
        return(
            <div className='phase-ph'>
                <div className='box'></div>
                <div className='box'></div>
            </div>
        )
    }else{
        return(
            <>
                <div className='phase'>
                    {finalists.map((player, i) => (
                        <div className={`player box`} key={i} onClick={() => {
                                setPlayers(prevPlayers => {
                                    const updatedPlayers = [...prevPlayers];
                                    const index = prevPlayers.findIndex(p => p.name === player.name);
                                    updatedPlayers[index].wins2 = 1;
                                    return updatedPlayers;
                                });
                        }}>
                            {player.name}
                        </div>
                    ))} 
                </div>
            </>
        )
    }
}

// Winner Component
export function Winner({ finalists }) {
    // Find the winner in the second round
    const winner = finalists.find(player => player.wins2 === 1);
    console.log(winner)
    if(winner === undefined) {
        return <div className='winner'> <div className='winner-box'></div></div>
    }else{
        return(
            <div className='winner'>
                {winner ? <div className='winner-box'>{winner.name}</div> : <div>No winner yet</div>}
            </div>
        )
    }
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
            {/* <Link to = '/scoreboard'>
                <button onClick={endTournament}>Scoreboard</button>
            </Link> */}
            <Link to = '/'  className='finish-btn'>
                <button className='fn-btn' onClick={endTournament}>Finish tournament</button>
            </Link>
        </>
    )
}

