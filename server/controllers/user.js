import User from "../models/User";

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "This email is already registered!" });
        }
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: "This username is already taken!" });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}