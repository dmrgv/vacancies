import mongoose from 'mongoose'

const Vacancy = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, maxlength: 50 },
    skills: { type: String, required: true },
    responsibilities: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: Number, default: 1, min: [1, 'TooLowPriority'], max: [999, 'TooHighPriority'] },
    active: { type: Boolean, default: true },
    salary: { type: Number, required: true, min: [1, 'TooLowSalary'], max: [999999, 'TooHighSalary'] },
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
  } else if (error.name === 'ValidationError') {
    // Ошибка валидации полей
    if (error.message.includes('TooLowPriority') || error.message.includes('TooHighPriority')) {
      next({
        message: { status: 'violations', violations: [{ code: error.code, message: 'Приоритет должен быть в интервале 1-999' }] },
      })
    } else if (error.message.includes('TooLowSalary') || error.message.includes('TooHighSalary')) {
      next({
        message: { status: 'violations', violations: [{ code: error.code, message: 'Зарплата должна быть в интервале 1-999999' }] },
      })
    } else {
      next({
        message: { status: 'violations', violations: [{ code: error.code, message: 'Заполните корректно все поля!' }] },
      })
    }
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
