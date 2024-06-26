import express from 'express';
import { User } from '../models/UserModel.js'; // Path to User model
import { Event } from '../models/eventModel.js'; // Path to Event model
import { Organizer } from '../models/OrganizerModel.js'; // Path to Organizer model

const router = express.Router();

// Route to link an event to a user (organizer) in the OrganizerModel
router.post('/:organizerId/events', async (req, res) => {
    try {
        const { organizerId } = req.params;
        const { eventId } = req.body;

        // Check if the organizer (user) exists
        const user = await User.findById(organizerId);
        if (!user) {
            return res.status(404).json({ message: 'User (organizer) not found' });
        }


        // Check if this relationship already exists in OrganizerModel
        const existingOrganizer = await Organizer.findOne({
            referenceToUser: organizerId,
            referenceToListOfEvents: { $in: [eventId] },
        });

        if (existingOrganizer) {
            return res.status(400).json({ message: 'This event is already associated with the organizer' });
        }

        // Create a new entry in the OrganizerModel, if needed
        let organizer = await Organizer.findOne({ referenceToUser: organizerId });

        if (!organizer) {
            // If there's no entry for this user, create it
            organizer = new Organizer({
                referenceToUser: organizerId,
                referenceToListOfEvents: [eventId],
            });
        } else {
            // Add the event to the organizer's list if not already present
            if (!organizer.referenceToListOfEvents.includes(eventId)) {
                organizer.referenceToListOfEvents.push(eventId);
            }
        }

        // Save the updated organizer or the newly created one
        await organizer.save();

        return res.status(200).json({ message: 'Event associated with organizer successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error associating event with organizer' });
    }
});

// Route to get all events for a specific organizer
router.get('/:organizerId/events', async (req, res) => {
    try {
        const { organizerId } = req.params;

        // Validate if the user (organizer) exists
        const user = await User.findById(organizerId);
        if (!user) {
            return res.status(404).json({ message: 'User (organizer) not found' });
        }

        // Find the organizer entry in OrganizerModel
        const organizer = await Organizer.findOne({ referenceToUser: organizerId });
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

        // Fetch the events where this organizer is involved
        const events = await Event.find({ _id: { $in: organizer.referenceToListOfEvents } });

        return res.status(200).json({
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching events' });
    }
});

// Route to delete an event from all organizers
router.delete('/events/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;

        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Find all organizers containing this event in their list
        const organizers = await Organizer.find({
            referenceToListOfEvents: { $in: [eventId] },
        });

        // If no organizers are found, the event is not associated with any organizer
        if (organizers.length === 0) {
            return res.status(404).json({ message: 'No organizers found for this event' });
        }

        // Loop through all organizers and remove the event
        for (const organizer of organizers) {
            const index = organizer.referenceToListOfEvents.indexOf(eventId);
            if (index > -1) {
                organizer.referenceToListOfEvents.splice(index, 1); // Remove the event
                await organizer.save(); // Save the updated organizer
            }
        }

        return res.status(200).json({ message: 'Event removed from all organizers' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error removing event from organizers' });
    }
});


export default router;
