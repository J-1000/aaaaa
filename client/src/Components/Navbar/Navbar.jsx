import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Button } from '@material-ui/core'
import { ShoppingCart, Face } from '@material-ui/icons'

import { Link } from 'react-router-dom'

import logo from '../../assets/commerce.png'
import useStyles from './styles';

import { useContext } from 'react'
import { AuthContext } from '../../context/auth'

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/store" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="commerce.png" height="25px" className={classes.image} />
                        eStore.js
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        


                        {isLoggedIn ? ( 
                        <>
                           
                            <Button onClick={logoutUser} className={classes.checkoutButton} size="small" type="button" variant="outlined" color="primary">
                            Log Out
                            </Button>


                        <IconButton component={Link} to="/profile" aria-label="Show cart items" color="inherit">
                                <Face />                          
                        </IconButton>

                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                {/* imported icon material-ui */}
                                <ShoppingCart />
                            </Badge>
                        </IconButton>


                        </>
                        ) :  
                        <>
                        <Button component={Link} to="/login" className={classes.checkoutButton} size="small" type="button" variant="outlined" color="primary">
                        Log In
                         </Button>
                    
                        <IconButton component={Link} to="/signup" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                {/* imported icon material-ui */}
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                       
                        </>
                        }
                        


                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}



export default Navbar
