import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Rating } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles';
import { Link } from 'react-router-dom'

import { useContext } from 'react'
import { AuthContext } from '../../../context/auth'

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    const { isLoggedIn, user } = useContext(AuthContext)
    //console.log('product from product.jsx', product)
      return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                       
                         {product.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary'>
                    {product.description.replace('<p>', '').replace('</p>', '')} 
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                {/* CLICK BUTTON x ADD TO CART FUNCTIONALITY  */}

                {isLoggedIn ? ( 
                <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton> 
                
                ) :
                <IconButton component={Link} to="/signup" aria-label="Show cart items" color="inherit">
                    <AddShoppingCart />
                </IconButton>
                }


            </CardActions>
        </Card>
    ) 
}

export default Product
