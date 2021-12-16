import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const handleEmail = e => setEmail(e.target.value)
	const handleName = e => setName(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password, name }

		axios.post('/auth/signup', requestBody)
		.then(response => {
			console.log('hello')
			// redirect -> login 
			// navigate('/login')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<div>
			<h1>Signup</h1>
			<form onSubmit={handleSubmit}>
				<label>Email: </label>
				<input type="text" name="email" value={email} onChange={handleEmail} />
				<label>Password: </label>
				<input type="password" value={password} onChange={handlePassword} />
				<label>Name: </label>
				<input type="text" value={name} onChange={handleName} />

				<button type="submit">Sign Up</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}

			<p>Already have an account?</p>
			<Link to='/login'>Login</Link>
		</div>
	)
}
