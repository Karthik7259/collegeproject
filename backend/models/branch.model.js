import mongoose from "mongoose";

import { Schema,model, models} from "mongoose";

// models/branch.model.js


const BranchSchema = new Schema({
  name: { 
    type: String,
     required: true, 
     unique: true,
     trim: true },
  code: { 
    type: String,
     required: true,
      unique: true,
       trim: true,
        uppercase: true
     },
  hod: { 
    type: String,
     required: true,
      trim: true
     },
  counsellors: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Admin' 
}]
}, { 
    collection: 'branches', 
    timestamps: true
 });

const BranchModel=mongoose.model("Branch", BranchSchema);
export default BranchModel;