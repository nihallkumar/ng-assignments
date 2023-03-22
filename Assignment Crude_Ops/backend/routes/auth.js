const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

jwt = require('jsonwebtoken');
const jwtSec = "helloworld";


// SIGNUP ????????????????????????????????????????????????????????????????/
router.post('/signup', [
    body('email', 'Enter a valid email').notEmpty(),
    body('password', 'value can not be empty').notEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let user = await Admin.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'user with this email already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        let secPass = await bcrypt.hash(req.body.password, salt);
        user = await Admin.create({
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, jwtSec);
        res.json({ token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// LOGIN //???????????????????????????????????????????????????
router.post('/login', [
    // body('email', 'Enter a valid email').isEmail(),
    body('password', 'value can not be empty').notEmpty(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await Admin.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Login with Correct Credentials" });
        }

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(400).json({ error: "Login with Correct Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, jwtSec);
        res.json({ token })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ADMIN DETAIL ?????????????????????????????????????
router.post('/admin/detail', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Admin.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ADD USER ????????????????????????????????????????????????????????????????/
router.post('/adduser', [
    body('firstName', 'value can not be empty').notEmpty(),
    body('lastName', 'value can not be empty').notEmpty(),
    body('email', 'Enter a valid email').notEmpty(),
    body('phone', 'Enter valid value').isNumeric(),
    body('age', 'Enter valid value').isNumeric(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        })

        res.json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// EDIT USER ?????????????????????????????????????????????????????
router.patch('/edit/:id', [
    body('firstName', 'value can not be empty').notEmpty(),
    body('lastName', 'value can not be empty').notEmpty(),
    body('email', 'Enter a valid email').notEmpty(),
    body('phone', 'Enter valid value').isNumeric(),
    body('age', 'Enter valid value').isNumeric(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, firstName, lastName, phone, age } = req.body;
        let updatedUser = {};
        updatedUser.firstName = firstName
        updatedUser.lastName = lastName
        updatedUser.email = email
        updatedUser.phone = phone
        updatedUser.age = age

        let user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).send("Not Found");
 
        user = await User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true })
        res.json({ user });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// DELETE USER ??????????????????????????????????????????????????????
router.delete('/delete/:id', async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({error:"Not Found"});
        }

        user = await User.findByIdAndDelete(req.params.id);
        res.json({ "Success": "User has been deleted", user: user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// ALL USERS ???????????????????????????????????????????????????????
router.get('/allusers', async (req, res) => {
    try {
        let user = await User.find().select("-__v").lean();
        res.json(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// USER DETAILS ?????????????????????????????????????????????????????
router.get('/detail/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})


// ISVALID TOKEN ????????????????????????????????????????????????????
router.post('/verify', async (req, res) => {

    try {
        const token = req.body.token
        // const token = req.header('token')
        jwt.verify(token, jwtSec, (err, decoded) => {
            if (err)
                return res.status(401).send("Unauthorized");
            else if (decoded)
                return res.send(true)
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




module.exports = router;    