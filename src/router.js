import Router from 'express'
import VacancyController from './Controllers/VacancyController.js'

const router = new Router()

router.post('/vacancy/create', VacancyController.create)
router.post('/vacancy/all', VacancyController.getAll)
router.post('/vacancy/list', VacancyController.getActive)
router.post('/vacancy/get', VacancyController.getOne)
router.post('/vacancy/details', VacancyController.getDetails)
router.post('/vacancy/update', VacancyController.update)
router.post('/vacancy/delete', VacancyController.delete)
router.post('/vacancy/activate', VacancyController.activate)
router.post('/vacancy/deactivate', VacancyController.deactivate)

export default router
