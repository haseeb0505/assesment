const router = require("express").Router();
const User = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
// Register
router.post('/register', async (req, res) => {
    try {
        //    for hashing pass 
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        // creating new user body    
        const newUser = new User({
            username: req.body.username.trim(),
            email: req.body.email,
            password: hashPassword

        })
        // save user and return response 
        const user = await newUser.save()
        res.status(200).json(user)
        console.log(user)
    } catch (error) {
        res.status(500).json(error)
    }
});

// login

router.post('/login', async (req, res) => {
    try {
        // checking user in db
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found ")

        // checking valid pass in db
        const validPass = await bcrypt.compare(req.body.password, user.password)
        !validPass && res.status(400).json("password not valid")

        const accesstoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" })
        const { password, ...info } = user._doc
        res.status(200).json({ ...info, accesstoken })
    } catch (error) {
        console.log(error)
    }

})


module.exports = router