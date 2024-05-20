const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ContributionRequest = require('../models/ContributionRequest');

// Create a contribution request
router.post('/', auth, async (req, res) => {
    const { workspaceId, locale } = req.body;

    try {
        const newRequest = new ContributionRequest({
            workspace: workspaceId,
            user: req.user.id,
            locale
        });

        const request = await newRequest.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get all contribution requests for a workspace
router.get('/:workspaceId', auth, async (req, res) => {
    try {
        const requests = await ContributionRequest.find({ workspace: req.params.workspaceId });
        res.json(requests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Approve or reject a contribution request
router.put('/:requestId', auth, async (req, res) => {
    const { status } = req.body;

    try {
        const request = await ContributionRequest.findById(req.params.requestId);
        if (!request) {
            return res.status(404).json({ msg: 'Request not found' });
        }

        request.status = status;
        await request.save();
        res.json(request);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
