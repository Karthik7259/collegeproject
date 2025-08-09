// models/event.model.js
import mongoose from "mongoose";
import { Schema,model } from "mongoose";
import ClubModel from "./club.model.js";
const { EVENT_STATUS } = require("../utils/constants");

const EventSchema = new Schema({
  name: { 
    type: String,
     required: true,
      trim: true 
    },
  status: { 
    type: String, 
    enum: EVENT_STATUS,
     default: 'upcoming', 
     required: true 
    },
  verified: { 
    type: Boolean,
     default: false 
    },
  date: { 
    type: Date,
     required: true
     },
  time: {
     type: String,
      required: true 
    },
  club: { 
    type: Schema.Types.ObjectId,
     ref: 'ClubModel',
      required: true
     },
  organizer: {
     type: String,
      required: true
     },
  activity_point: { 
    type: Number,
     required: true,
      min: 1
     },
  form_link: {
     type: String,
      trim: true 
    },
  deadline: { 
    type: Date, 
    required: true 
},
  location: { 
    type: String, 
    required: true,
     trim: true
     },
  description: {
     type: String,
      trim: true
     },
  excel_url: { 
    type: String,
     trim: true
     },
  participants: { 
    type: Number,
     default: 0 
    },
  participants_list: [
    { type: Schema.Types.ObjectId, ref: 'User' }
],
  registered_students: [
    { type: Schema.Types.ObjectId, ref: 'User' }
]
}, { collection: 'events', timestamps: true });

EventSchema.pre('save', async function(next) {
  const event = this;
  if (event.isNew) {
    if (event.status === 'upcoming') {
      await ClubModel.findByIdAndUpdate(event.club, { $inc: { total_events: 1, upcoming_events: 1 } });
    } else if (event.status === 'pending') {
      await ClubModel.findByIdAndUpdate(event.club, { $inc: { total_events: 1, pending_verification: 1 } });
    } else {
      await ClubModel.findByIdAndUpdate(event.club, { $inc: { total_events: 1 } });
    }
  }
  next();
});

const EventModel=mongoose.model("Event", EventSchema);

export default EventModel;
