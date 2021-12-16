import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { TextField, Container, Typography, Button, Grid, Paper } from '@material-ui/core'

import useStyles from './styles';

export default function Login() {
	const classes = useStyles();

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(undefined)

	const navigate = useNavigate()

	const { loginUser } = useContext(AuthContext)

	const handleEmail = e => setEmail(e.target.value)
	const handlePassword = e => setPassword(e.target.value)

	const handleSubmit = e => {
		e.preventDefault()
		const requestBody = { email, password }

		axios.post('/auth/login', requestBody)
			.then(response => {
				// redirect -> projects
				// navigate('/login')
				console.log('i have a token mothafuckas', response.data.authToken)
				const token = response.data.authToken
				// call login user function from auth context
				loginUser(token)
				navigate('/')
			})
			.catch(err => {
				const errorDescrition = err.response.data.message
				setErrorMessage(errorDescrition)
			})
	}

	return (
		<div>
			<div className={classes.toolbar} />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Container>
						<div className={classes.toolbar} />
						<Typography className={classes.title} variant="h3" gutterBottom align="center">Log In</Typography>
						<form onSubmit={handleSubmit}>
							<Container className={classes.login}>
								{/* <label>Email: </label> */}
								<TextField id="outlined-basic" label="Email" variant="outlined" type="text" name="email" value={email} onChange={handleEmail} />
							</Container>
							<br></br>

							<Container className={classes.login}>
								<TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={handlePassword} />
							</Container>

							<br></br>
							<Container className={classes.login}>
								<Button type="submit" variant="contained" color="primary" size="large">Log in</Button>
							</Container>
						</form>
						<Container className={classes.login}>
							{errorMessage && <Typography variant="h6" align="center">{errorMessage}</Typography>}
						</Container>
						<br></br>
						<br></br>
						<br></br>
						<Typography variant="h6" align="center">Don't have an account?</Typography>
						<br></br>

						<Container className={classes.login}>
							<Button component={Link} to="/signup" type="submit" variant="outlined" color="primary" size="large">
								Signup
							</Button>
						</Container>

					</Container>
				</Paper>
			</main>
		</div>
	)
}
