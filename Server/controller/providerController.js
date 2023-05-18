import jwt from 'jsonwebtoken'
import Service from "../models/serviceModel.js";
import Provider from '../models/providerModel.js';

import bcrypt from 'bcrypt'

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10)
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}
export const registerProvider = async (req, res) => {
    try {
        const { username, email, phone, location, pincode, address, password, category, experience, availability, languages, description } = req.body;
        const imageUrl = req.file.filename
        const userData = await Provider.findOne({ email: req.body.email });
        if (!userData) {
            const secretPassword = await securePassword(password);
            const provider = new Provider({
                providername: username,
                email: email,
                phone: phone,
                location: location,
                address: address, language: languages,
                category: category, availability: availability,
                pincode: pincode, experience: experience,
                image: imageUrl, jobdescription: description,
                password: secretPassword,
            });
            const ProviderData = await provider.save();
            res.json(ProviderData);
        } else {
            res.json({ message: "Email already taken" });
        }
    } catch (error) {
        console.log(error);
    }
}

export const providerLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const provider = await Provider.findOne({ email: email });

        if (provider) {
            if (!provider.isApproved) {
                return res.json({ message: "Account not approved. Please contact the administrator." });
            }
            if (provider.isBlock) {
                return res.json({ message: "Account blocked. Please contact the administrator." });
            }
            const passwordMatch = await bcrypt.compare(password, provider.password);
            if (passwordMatch) {
                const token = jwt.sign({ email: provider.email }, process.env.JWT_SECRET_KEY);
                return res.json({ message: "Login Success", token, email: provider.email, id: provider._id });
            } else {
                return res.json({ message: "Wrong password" });
            }
        } else {
            return res.json({ message: "Wrong Email" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
