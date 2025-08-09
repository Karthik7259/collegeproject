// models/user.model.js
import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema(
    {
  email: {
     type: String
     , required: true, 
     unique: true, 
     trim: true,
      lowercase: true
    },
  name: { 
    type: String,
     required: true, 
     trim: true },
  password: {
     type: String, 
     required: true 
    },
  usn: { 
    type: String,
     required: true,
      unique: true, 
      trim: true,
       uppercase: true
     },
  branch: { 
    type: Schema.Types.ObjectId, 
    ref: 'Branch',
    required: true },
  counsellor: { 
    type: Schema.Types.ObjectId,
     ref: 'Admin' 
    },
  clubs: [{ 
    type: Schema.Types.ObjectId,
     ref: 'Club' 
    
    }],
  activity_point: { 
    type: Number, 
    default: 0 },
  points_breakdown: {
    technical: { type: Number, default: 0 },
    cultural: { type: Number, default: 0 },
    sports: { type: Number, default: 0 },
    social: { type: Number, default: 0 }
  },
  participation_history: [{
    event: {
         type: Schema.Types.ObjectId,
          ref: 'Event'
        
        },
    date: { 
        type: Date,
         default: Date.now 
        },
    points: { 
        type: Number,
         default: 0 
        },
    status: {
         type: String, 
         enum: ['verified', 'pending'], 
         default: 'pending' 
        }
  }]
}, { 
    collection: 'users',
     timestamps: true 
    });

UserSchema.virtual('targetPoints').get(function() {
  return 100;
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
