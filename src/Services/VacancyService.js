import Vacancy from '../Models/Vacancy.js'

class VacancyService {
  async create(vacancy) {
    return await Vacancy.create({ ...vacancy })
  }

  async getAll() {
    return await Vacancy.find()
  }

  async getOne(id) {
    if (!id) {
      throw new Error('не указан `id`')
    }
    return await Vacancy.findById(id)
  }

  async update(vacancy) {
    if (!vacancy._id) {
      throw new Error('не указан `id`')
    }
    let doc = await Vacancy.findById(vacancy._id)
    if (!doc) {
      throw new Error('вакансия не найдена ' + vacancy._id)
    }
    doc = Object.assign(doc, vacancy)
    return doc.save()
  }

  async delete(id) {
    if (!id) {
      throw new Error('не указан `id`')
    }
    return await Vacancy.findByIdAndDelete(id)
  }
}

export default new VacancyService()
