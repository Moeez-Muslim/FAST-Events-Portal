import express from 'express';
import { Event } from '../models/eventModel.js';

const router = express.Router();

// Route to create a new Event
router.post('/', async (request, response) => {
    try {
        const { title, description, imageURL, dateTime, totalTickets, venue, registered } = request.body;

        if (!title || !description || !imageURL || !dateTime || !totalTickets || !venue) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const newEvent = {
            title,
            description,
            imageURL,
            dateTime,
            totalTickets,
            venue,
            registered: registered || [],
            feedbacks: [], // Initialize feedbacks as empty array
        };

        const event = await Event.create(newEvent);

        return response.status(201).send(event);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get all Events
router.get('/', async (request, response) => {
    try {
        const events = await Event.find({});
        return response.status(200).json({
            count: events.length,
            data: events,
        });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get a single Event by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const event = await Event.findById(id);

        if (!event) {
            return response.status(404).send({ message: 'Event not found' });
        }

        return response.status(200).json(event);
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to update an Event
router.put('/:id', async (request, response) => {
    try {
        const { title, description, imageURL, dateTime, totalTickets, venue, registered } = request.body;

        if (!title || !description || !imageURL || !dateTime || !totalTickets || !venue) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = request.params;
        const updatedData = {
            title,
            description,
            imageURL,
            dateTime,
            totalTickets,
            venue,
            registered: registered || [],
        };

        const result = await Event.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            return response.status(404).send({ message: 'Event not found' });
        }

        return response.status(200).send({ message: 'Event updated successfully', data: result });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to delete an Event
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Event.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).send({ message: 'Event not found' });
        }

        return response.status(200).send({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to add feedback to an event
router.post('/:eventId/feedback', async (request, response) => {
    try {
        const { eventId } = request.params;
        const { userId, feedbackText, feedbackDate } = request.body;

        // Check if all required fields are provided
        if (!userId || !feedbackText) {
            return response.status(400).send({ message: "Please provide all required fields" });
        }

        // Find the event by its ID
        const event = await Event.findById(eventId);

        if (!event) {
            return response.status(404).send({ message: "Event not found" });
        }

        // Ensure the user is in the registered list
        if (!event.registered.includes(userId)) {
            return response.status(403).send({ message: "User is not a participant of the event" });
        }

        // Ensure the feedback date is after the event date
        const feedbackSubmissionDate = feedbackDate ? new Date(feedbackDate) : new Date();
        if (feedbackSubmissionDate <= event.dateTime) {
            return response.status(400).send({
                message: "Feedback date must be after the event date",
            });
        }

        // Add the feedback to the event
        event.feedbacks.push({
            user: userId,
            feedbackText,
            date: feedbackSubmissionDate,
        });

        // Save the updated event
        await event.save();

        return response.status(201).send({
            message: "Feedback added successfully",
            feedback: event.feedbacks[event.feedbacks.length - 1], // Return the newly added feedback
        });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to register a user for an event
router.post('/:eventId/register', async (request, response) => {
    try {
        const { eventId } = request.params;
        const { userId } = request.body;

        if (!userId) {
            return response.status(400).send({ message: "User ID is required" });
        }

        // Find the event by ID
        const event = await Event.findById(eventId);

        if (!event) {
            return response.status(404).send({ message: "Event not found" });
        }

        // Check if the user is already registered
        if (event.registered.includes(userId)) {
            return response.status(400).send({
                message: "User is already registered for this event",
            });
        }

        // Add the user to the registered list
        event.registered.push(userId);

        // Save the updated event
        await event.save();

        return response.status(200).send({ message: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

// Route to get all Events for a specific user
router.get('/:userId/events', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all events where the 'registered' list contains the given user ID
        const userEvents = await Event.find({ registered: userId });

        if (userEvents.length === 0) {
            return res.status(404).send({
                message: `No events found for user with ID ${userId}`,
            });
        }

        return res.status(200).json({
            count: userEvents.length,
            data: userEvents,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
