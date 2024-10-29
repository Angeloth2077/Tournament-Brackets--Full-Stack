import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './../styles/register.css'

export default function NewTournament() {
    const initialValues = {
        name1: "",
        name2: "",
        name3: "",
        name4: ""
    }
    const onSubmit = (data) => {
        const players = [
            {name: data.name1, score: 0, wins: 0, wins2: 0, winner: 0},
            {name: data.name2, score: 0, wins: 0, wins2: 0, winner: 0},
            {name: data.name3, score: 0, wins: 0, wins2: 0, winner: 0},
            {name: data.name4, score: 0, wins: 0, wins2: 0, winner: 0}
        ]
        players.forEach((player) => {
            axios.post('http://127.0.0.1:3001/players', player).then((response) => {
            console.log("It worked!", response)
            })
        })
    }

// For the future, watch https://www.youtube.com/watch?v=lxroBmTiOhI&t=365s on 23:00
    const validationSchema = Yup.object().shape(
        {
            name1: Yup.string().required("A name is required"),
            name2: Yup.string().required("A name is required"),
            name3: Yup.string().required("A name is required"),
            name4: Yup.string().required("A name is required")
        }
    ) 

    return (
        <div className='new-tournament'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Player 1</label>
                    <br />
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer1 input'
                            name='name1'
                            placeholder='Oe'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name1" component='span'/>
                    <br />
                    <label>Player 2</label>
                    <br />
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer2 input'
                            name='name2'
                            placeholder='Oe'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name2" component='span'/>
                    <br />
                    <label>Player 3</label>
                    <br />
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer3 input'
                            name='name3'
                            placeholder='Oe'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name3" component='span'/>
                    <br />
                    <label>Player 4</label>
                    <br />
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer4 input'
                            name='name4'
                            placeholder='Oe'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name4" component='span'/>
                    <br />
                    <Link to = '/tournament'>
                        <button type='submit'>Start Tournament</button>
                    </Link>
                </Form>
            </Formik>
        </div>
    )
}
