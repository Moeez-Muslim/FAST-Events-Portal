import express from "express"
import {Event} from "../models/eventModel.js"

const router = express.Router();

// Route to save a new Event
router.post('/', async (request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.description ||
            !request.body.imageURL ||
            !request.body.dateTime ||
            !request.body.ticketsAvailable ||
            !request.body.venue ||
            !request.body.registered ||
            !request.body.organizers
        ) {
            return response.status(400).send({
                message: "Send all required fields"
            })
        }

        const newEvent = {
            title : request.body.title,
            description : request.body.description,
            imageURL : request.body.imageURL,
            dateTime : request.body.dateTime,
            ticketsAvailable : request.body.ticketsAvailable,
            venue : request.body.venue,
            registered : request.body.registered,
            organizers : request.body.organizers
        }

        const event = await Event.create(newEvent);

        return response.status(201).send(event);
    } catch(error)
    {
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

// Route to get all events
router.get('/', async (request, response)=>{
    try {
        const events = await Event.find({})

        return response.status(200).json({
            count: events.length,
            data: events
    });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route to get one event by id
router.get('/:id', async (request, response)=>{
    try {

        const {id} = request.params;
        const event = await Event.findById(id);

        return response.status(200).json(event);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route to update an event
router.put('/:id', async (request, response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.description ||
            !request.body.imageURL ||
            !request.body.dateTime ||
            !request.body.ticketsAvailable ||
            !request.body.venue ||
            !request.body.registered ||
            !request.body.organizers
        ) {
            return response.status(400).send({
                message: "Send all required fields"
            })
        }

        const {id} = request.params;
        const result = await Event.findByIdAndUpdate(id, request.body);

        if(!result)
        {
            return response.status(404).send({message: "Event not found"})
        }

        return response.status(200).send({message: "Event updated successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

// Route to delete an event
router.delete('/:id', async (request, response)=>{
    try {
        
        const {id} = request.params;
        const result = await Event.findByIdAndDelete(id, request.body);

        if(!result)
        {
            return response.status(404).send({message: "Event not found"})
        }

        return response.status(200).send({message: "Event deleted successfully"});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

export default router;
