import express from 'express';
import { Event } from '../models/eventModel.js';
import { Organizer } from '../models/OrganizerModel.js';

const router = express.Router();

// Route to get all events for a specific organizer
router.get('/:organizerId/events', async (req, res) => {
    try {
        const { organizerId } = req.params;
        
        // Find the organizer by ID
        const organizer = await Organizer.findById(organizerId);
        
        if (!organizer) {
            return res.status(404).send({ message: 'Organizer not found' });
        }

        // Fetch events where this organizer is involved
        const events = await Event.find({ _id: { $in: organizer.referenceToListOfEvents } });

        return res.status(200).json({
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: 'Error fetching events' });
    }
});


export default router;
