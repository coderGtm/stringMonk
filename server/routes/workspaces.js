const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workspace = require('../models/Workspace');

// Create a new workspace
router.post('/', auth, async (req, res) => {
    const { name } = req.body;

    try {
        const newWorkspace = new Workspace({
            name,
            owner: req.user.id
        });

        const workspace = await newWorkspace.save();
        res.json(workspace);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all workspaces for a user
router.get('/', auth, async (req, res) => {
    try {
        const workspaces = await Workspace.find({ owner: req.user.id });
        res.json(workspaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
