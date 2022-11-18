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

Vacancy.post('save', function (error, res, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    // Ошибка контроля уникальности
    next({ message: { status: 'violations', violations: [{ code: error.code, message: 'Не дублируйте название вакансии!' }] } })
  } else if (error.name === 'VersionError') {
    // Ошибка контроля версии
    next({
      message: { status: 'violations', violations: [{ code: error.code, message: 'Конфликт изменений! Переоткройте вакансию или сделайте копию!' }] },
    })
  } else {
    next()
  }
})

export default mongoose.model('Vacancy', Vacancy)
