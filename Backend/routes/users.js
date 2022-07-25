const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users')
const verify = require('../verifyToken')


router.get('/search/:id/:letter', verify, async (req, res) => {
    // get user which includes a letter of the name
    try {
        const user = await User.find({
            username: {
                $regex: req.params.letter
            },
            _id: { $ne: req.params.id }
        })

        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
})
// get  user
router.get("/", async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId ?
            await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, createdAt, ...other } = user._doc
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error);
    }
})




module.exports = router
