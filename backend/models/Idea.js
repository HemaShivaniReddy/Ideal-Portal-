import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  problem: { type: String, required: true },
  existingSolution: { type: String, required: true },
  proposedSolution: { type: String, required: true },
  impact: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Idea', ideaSchema);
