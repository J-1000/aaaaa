import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth'

import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, Rating, Button } from '@material-ui/core';
import useStyles from './styles';
// import useStyles from './styles'



const Profile = () => {
    const classes = useStyles();
    const [imageUrl, setImageUrl] = useState('')
    const [wishListItem, setWishListItem] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [refreshWishList, setrefreshWishList] = useState(false)


    const storedToken = localStorage.getItem('authToken')

    const deleteWishListItem = (id) => {
        axios.delete(`/wishlist/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
        })
            .then(() => setrefreshWishList(!refreshWishList))
            .catch(err => console.log(err))
        }
        
        // FOR WISHLIST
            const handleSubmit = (e) => {
                e.preventDefault()
                const requestBody = { wishListItem }
                axios.put(`/wishlist`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                    .then(response => {
                        setrefreshWishList(!refreshWishList)
                    })
            }


            
            
            const uploadImage = (file) => {
                return axios
                .post("/upload", file, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then(res => res.data)
            };
            
            
            const handleFileUpload = e => {
                const uploadData = new FormData();
                console.log('uploadData', e.target.files[0])
                uploadData.append("imageUrl", e.target.files[0]);
                
                uploadImage(uploadData)
                .then(response => {
                    console.log("inside")
                    console.log(response.secure_url)
                    setImageUrl(response.secure_url);
                })
                .catch(err => console.log("Error while uploading the file: ", err));
            };
            
            // THIS IS FOR CLOUDINARY
            const handleImageSubmit = (e) => {
                e.preventDefault()
                const requestBody = { imageUrl }
                axios.put(`/imageupload`, requestBody, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                    .then(response => {
                        setrefreshWishList(!refreshWishList)
                    })
            }


    const { user } = useContext(AuthContext)
    console.log('user', user)
    // END OF CLOUDINARY

    useEffect(() => {
        axios.get('/profile', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log('this is the data', response.data)
                setCurrentUser(response.data)
            })
    }, [refreshWishList])


    if (currentUser === '') return <></>

    return (
        <>
            <h1> hi {currentUser.name} </h1>
            <h1> Hey there, {currentUser.name}!</h1>
            <img src={currentUser.image} alt="" />
            <form onSubmit={handleImageSubmit}>
            <input className='file' id="file"
                type="file"
                name="imageUrl"
                onChange={handleFileUpload}>
            </input>

            <Button type="submit">Submit</Button>
            </form>



            {/* this is for WISHLIST */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Wishlist Item: </label>
                <input
                    id="title"
                    type="text"
                    value={wishListItem}
                    // name="title"
                    onChange={e => setWishListItem(e.target.value)}
                />
                <button type="submit">Add Wishlist Item</button>
            </form>



            {currentUser.wishlist.map(item => {
                return (
                    <Card className={classes.root}>
                    <CardContent>
                    <div className={classes.cardContent}>
                    <form>
                    <Typography variant='h5' gutterBottom>
                        {item.wishlistItem}
                     </Typography>
                        <Button type="submit" variant="outlined" color="primary" onClick={e => {
                            deleteWishListItem(item._id)
                        }}>
                        Delete
                        </Button>
                    </form>
                    </div>
                    </CardContent>
                    </Card>
                )
            })}


            {/* <img className='box' src={pokemon.imageUrl} /> */}

        </>
    )
}


export default Profile
