const router = require('express').Router()
const User = require('../models/User.model')
const Wishlist = require('../models/Wishlist.model')
const { fileUploader, cloudinary } = require('../config/cloudinary.config.js');
const { isAuthenticated } = require('./../middleware/jwt.js')


// get current user 

router.get('/profile', (req, res, next) => {
  const currentUser = req.payload._id
  User.findById(currentUser)
    .populate("wishlist")
    .then(userFromDB => {
      res.status(200).json(userFromDB)
    })
    .catch(err => console.log(err))
})

// THIS IS FOR THE WISHLIST
router.put(`/wishlist`, (req, res, next) => {
  // related to "stored token" in front end
  const currentUser = req.payload._id
  const { wishListItem } = req.body
  Wishlist.create({ wishlistItem: wishListItem })
    .then(createdWishListItem => {
      User.findByIdAndUpdate(currentUser, {
        $push: { wishlist: createdWishListItem._id }
      })
        .then(updatedUser => {
          res.status(200).json(updatedUser)
        })
        .catch(err => console.log(err))
    }).catch(err => console.log(err))
})

router.delete(`/wishlist/:wishlistId`, (req, res, next) => {
  // related to "stored token" in front end
  const currentUser = req.payload._id
  const wishlistItemId = req.params.wishlistId
  // $push: { wishlist: wishListItem }
  User.findByIdAndUpdate(currentUser, {
    $pull: { wishlist: wishlistItemId } 
  })
    .then(updatedUser => {
      res.status(200).json(updatedUser)
    })
    .catch(err => console.log(err))
})

// END OF WISHLIST

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  console.log(req.file.path)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path });
});

router.put(`/imageupload`, (req, res, next) => {
  // related to "stored token" in front end
  const currentUser = req.payload._id
  const { imageUrl } = req.body

      User.findByIdAndUpdate(currentUser, 
      { image: imageUrl }
      )
        .then(updatedUser => {
          res.status(200).json(updatedUser)
        })
        .catch(err => console.log(err))
})

// router.post('/profile', (req, res, next) => {
//   const { title, price, imageUrl, userId, description  } = req.body
//   console.log(req.body)
// //   pokemonCards: [{ 
// //     type: Schema.Types.ObjectId,
// //     ref: 'Pokemon' }]
// // });
//   User.create({
//     imageUrl,
//   })
//     .then((createdPokemon) => {
//       console.log(createdPokemon)
//       res.status(201).json({ createdPokemon });
//     })
//     .catch((err) => next(err))
// })

// router.get('/pokemon', (req, res, next) => {
//   const {userId} = req.body

//   console.log(req.body)

//   User.find()
//   .populate('userId')
//     .then((pokemons) => {
//       // console.log(pokemons.userId._id)
//       res.status(200).json({ pokemons })
//     })

//     .catch(err => res.status(400).json(err))
// })

// router.get('/:id', (req, res, next) => {
//   User.findById(req.params.id)
//     .then(pokemon => {
//       if (!pokemon) {
//         res.status(404).json(pokemon)
//       } else {
//         res.status(200).json(pokemon)
//       }
//     })
//     .catch(err => next(err))
// })

// router.put('/:id', (req, res, next) => {
//   const { title, price, imageUrl, userId, description } = req.body
//   console.log('testing')
//   User.findByIdAndUpdate(req.params.id, {
//     title,
//     price,
//     imageUrl,
//     description,
//     userId
//   }, { new: true })
//     .then(updatedPokemon => {
//       res.status(200).json(updatedPokemon)
//     })
//     .catch(err => next(err))
// })


// router.delete('/:id', (req, res, next) => {
//   User.findByIdAndDelete(req.params.id)
//     .then(() => {
//       res.status(200).json({ message: 'pokemon deleted' })
//     })
// })

module.exports = router;