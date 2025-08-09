import mongoose from "mongoose";
import { Schema,model } from "mongoose";
import CLUB_TYPES from '../utils/constants.js'


const ClubSchema = new Schema({

  name: { 
    type: String, 
    trim: true
 },
  club_type: { 
    type: String, 
    enum: CLUB_TYPES 
},
  pocs: [{ 
    type: Schema.Types.ObjectId,
     ref: 'User' 
    }],
  faculty_in_charge: { 
    type: Schema.Types.ObjectId, 
    ref: 'Admin' 
},
  description: {
     type: String
     },
  total_events: { 
    type: Number, 
    default: 0
 },
  pending_verification: { 
    type: Number,
     default: 0 },
  upcoming_events: { 
    type: Number,
     default: 0 }
}, { 
    collection: 'clubs', 
    timestamps: false });

const ClubModel=model("Club",ClubSchema);

export default ClubModel
