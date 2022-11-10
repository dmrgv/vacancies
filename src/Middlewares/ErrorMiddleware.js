import mongoose from 'mongoose'

export default (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(500).json(err.errors)
    return
  }

  res.status(500).json(err.message)
}
