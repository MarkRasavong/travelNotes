import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from '../models/user.js';

const secret = 'test';

// when the res is ok or bad send the response as a JSON. (res.send v. res.json);

export const signin = async (req, res) => {
    // from the api post reqs from the frontend (actions/api)
    const { email, password } = req.body;

    //logic from/to MongoDB
    try {
        //find user by email, if there's no user there render an error
        const existingUser = await UserModel.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: 'User not found' });

        //then continue and compare the post requested password and the user's existing password in the database(which is encrypted by bcrypt)
        const passwordIsCorrect = await bcrypt.compare(password, existingUser.password);
        //if password is incorrect, render error
        if(!passwordIsCorrect) return res.status(400).json({ message: 'Invalid Credentials' });

        //if there's an existing user and password is correct. create a web token and assign it to the user for 1 hr.
        const token = jwt.sign({ email: existingUser.email, password: existingUser.password }, secret, { expiresIn : '1hr' });
        // gives token to user
        res.status(200).json({ result: existingUser, token })

    } catch (err) {
        res.status(500).json({ message: 'Something went wrong'});
    }
};

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({ email });

        if(existingUser) return res.status(400).json({ message: 'User already exists' });

        //making the password a bit spicy... making it too spicy for hackers 
        const hashedPassword = await bcrypt.hash(password, 12);

        //create the user and push it to the database. ********hashPassword in order to protect user's credential
        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        //give new user a token
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: '1hr' });

        //token instance
        res.status(201).json({ result, token });
    }catch (err) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(err);
    }
}

