import Reset from '../scripts/ResetTemp'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/tournament.css'



export default function Brackets() {

    const [players, setPlayers] = useState([])

    // Fetch players from the server
    useEffect(() => {
      axios.get('http://127.0.0.1:3001/players').then(response => {
            console.log(response.data)
            setPlayers(response.data) // Ensure this updates your players state
        }).catch(error => console.error('Error fetching players:', error))
    }, [])
    const finalists = players.filter(player => player.wins === 1)
    const winner = finalists.find(player => player.wins2 === 1)



    const setWins = (i) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = [...prevPlayers]
            updatedPlayers[i].wins = 1
            return updatedPlayers
        })
    }

    var positionPlayersFM = (arr) => {
        return (
            arr.slice(0, 2).map((player, i) => ({
                name: player.name,
                position: i
            }))
        )
    }
    const positionPlayersSM = (arr) => {
        return (
            arr.slice(-2).map((player, i) => ({
                name: player.name,
                position: i
            }))
        )
    }

    const playersFirstMatch = positionPlayersFM(players)
    const playersSecondMatch = positionPlayersSM(players)
    const [winnig, setWinning] = useState({match1: null, match2: null})

    return(
        <>
            <div className='brackets'>

                {/* PHASE 1 */}
                <div className='phase'>
                    <div className='match-1'>
                        <div className='player-container'>
                            <div className='box' onClick={() => setWins(0)}>{playersFirstMatch[0]?.name}</div>
                        </div>
                        <div className='player-container'>
                            <div className='box'onClick={() => setWins(1)}>{playersFirstMatch[1]?.name}</div>
                        </div>
                    </div>

                    <div className='match-2'>
                        <div className='player-container'>
                            <div className='box'onClick={() => setWins(2)}>{playersSecondMatch[0]?.name}</div>
                        </div>
                        <div className='player-container'>
                            <div className='box'onClick={() => setWins(3)}>{playersSecondMatch[1]?.name}</div>
                        </div>
                    </div>
                </div>


                {/* PHASE 2 */}
                <div className='phase-2'>
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


                {/* WINNER */}
                <div className='phase winner'>
                    <div className='winner'>
                        {winner ? <div className='winner-box'>{winner.name}</div> : <div>No winner yet</div>}
                    </div>
                </div>
            </div>
            <Reset setPlayers={setPlayers}/>
        </>
    )
}