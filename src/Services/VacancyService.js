import Vacancy from '../Models/Vacancy.js'

class VacancyService {
  async create(vacancy) {
    return await Vacancy.create({ ...vacancy })
  }

  async getAll() {
    return Vacancy.find()
      .sort([
        ['priority', 'desc'],
        ['name', 'asc'],
      ])
      .select({
        responsibilities: 0,
        skills: 0,
        description: 0,
      })
  }

  async getActive() {
    return Vacancy.find({ active: true })
      .sort([
        ['priority', 'desc'],
        ['name', 'asc'],
      ])
      .select({
        _id: 1,
        title: 1,
        salary: 1,
        updatedAt: 1,
      })
  }

  async getOne(id) {
    if (!id) {
      throw new Error('не указан `id`')
    }
    return Vacancy.findById(id).orFail()
  }

  async getDetails(id) {
    if (!id) {
      throw new Error('не указан `id`')
    }
    return Vacancy.findOne({ _id: id, active: true })
      .select({
        active: 0,
        version: 0,
        priority: 0,
        createdAt: 0,
      })
      .orFail()
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
    return Vacancy.findByIdAndDelete(id)
  }

  async setActive(id, active = true) {
    if (!id) {
      throw new Error('не указан `id`')
    }
    return Vacancy.findByIdAndUpdate(id, { active }, { new: true })
  }
}

export default new VacancyService()
