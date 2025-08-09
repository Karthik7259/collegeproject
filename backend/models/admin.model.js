// models/admin.model.js
import mongoose, { Mongoose } from "mongoose";
import { Schema } from "mongoose";


const { Schema, model, models } = mongoose;

const AdminSchema = new Schema({
  email: { 
    type: String,
     required: true, 
     unique: true,
      trim: true, 
    lowercase: true 
},
  name: { 
    type: String, 
    required: true, 
    trim: true
 },
  password: { 
    type: String, 
    required: true
 },
  role: { 
    type: String,
     enum: ['admin', 'dean', 'teacher'], 
     default: 'admin', 
     required: true 
    },
  branch: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: function() { return this.role === 'teacher'; }
  },
  is_club_counsellor: {
     type: Boolean, 
     default: false 
    },
  createdAt: { 
    type: Date,
     default: Date.now
     }
}, { 
    collection: 'admins',
     timestamps: true 
    });

const AdminModel = Mongoose.model("Admin", AdminSchema);

export default AdminModel;
