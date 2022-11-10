import mongoose from 'mongoose'

const Vacancy = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, maxlength: 50 },
    skills: { type: String, required: true },
    responsibilities: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
    salary: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    optimisticConcurrency: true,
    versionKey: 'version',
  }
)

export default mongoose.model('Vacancy', Vacancy)
