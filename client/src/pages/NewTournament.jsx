import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './../styles/register.css'

export default function NewTournament() {
    const navigate = useNavigate()
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
        navigate('/tournament')
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
                <Form className='form'>
                    <img className='logo' src='/resources/logo.png' />
                    <div className = 'input-container'>
                        {/* Fields and everything neeted for the style */}
                        <Field
                            className='inputPlayer1 input'
                            name='name1'
                            placeholder='Player 1'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name1" component='span'/>
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer2 input'
                            name='name2'
                            placeholder='Player 2'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name2" component='span'/>
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer3 input'
                            name='name3'
                            placeholder='Player 3'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name3" component='span'/>
                    <div className = 'input-container'>
                        <Field
                            className='inputPlayer4 input'
                            name='name4'
                            placeholder='Player 4'
                            onFocus={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onBlur={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                            onMouseEnter={(e) => e.target.closest('.input-container').querySelector('.py').classList.add('focused')}
                            onMouseLeave={(e) => e.target.closest('.input-container').querySelector('.py').classList.remove('focused')}
                        />
                        <div className='py'></div>
                    </div>
                    <ErrorMessage name="name4" component='span'/>

                    {/* For the button style */}
                    <svg width="0" height="0">
                      <defs>
                        <clipPath id="clipper" clipPathUnits="objectBoundingBox">
                          <path d="M0,0 0.79,0 0.83,0.5 0.79,1 0.81,1 0.85,0.5 0.81,0 0.86,0 0.9,0.5 0.86,1 0.88,1 0.92,0.5 0.88,0 0.93,0 0.97,0.5 0.93,1 0,1z" />
                        </clipPath>
                      </defs>
                    </svg>
                    {/* Button Link */}
                    <button className='start-btn' type='submit'>Start Tournament</button>
                </Form>
            </Formik>
            <img className='sz' src='/resources/sparking.png'/>
        </div>
    )
}
