import VacancyService from '../Services/VacancyService.js'

class VacancyController {
  async create(req, res, next) {
    try {
      const post = await VacancyService.create(req.body)
      res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async getAll(req, res, next) {
    try {
      const posts = await VacancyService.getAll()
      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      const post = await VacancyService.getOne(req.body.id)
      return res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    try {
      const updatedPost = await VacancyService.update(req.body)
      return res.json(updatedPost)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    try {
      const post = await VacancyService.delete(req.body.id)
      return res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async activate(req, res, next) {
    try {
      const post = await VacancyService.setActive(req.body.id)
      return res.json(post)
    } catch (e) {
      next(e)
    }
  }

  async deactivate(req, res, next) {
    try {
      const post = await VacancyService.setActive(req.body.id, false)
      return res.json(post)
    } catch (e) {
      next(e)
    }
  }
}

export default new VacancyController()
