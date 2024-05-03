import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
    {
        title:{
            type:String, 
            required:true
        },
        description:{
            type:String, 
            required:true
        },
        imageURL:{
            type:String, 
            required:true
        },
        dateTime:{
            type:Date, 
            required:true
        },
        ticketsAvailable:{
            type:Number, 
            required:true
        },
        venue:{
            type:String, 
            required:true
        },
        registered: { 
            type: [String], 
            default: []
        }, // Array of CNICs
        organizers: { 
            type:[String], 
            default: []
        }  // Array of organizers
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

// Create the Event model from the schema
export const Event = mongoose.model('Event', eventSchema);