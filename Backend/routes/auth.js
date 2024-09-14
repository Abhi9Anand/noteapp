const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'AbhinavAnandisagoodb$oy';
const fetchuser = require('../middleware/fetchuser')


//Router 1 : sign up
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),

], async (req, res) => {
    let success = false;
    //if there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    //Check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Email is already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        //create a new users
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occured")
    }

});


//Router 2: login user
router.post('/login', [

    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {
    //if there are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            success = false
            return res.status(400).json({ success, error: 'Please try to login with correct credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occured")
    }

});

//Router 3 : get loggedin User details
router.post('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password");
        success = true;
        res.json({user, success})

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server Error occured")
    }
})
module.exports = router