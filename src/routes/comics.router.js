const express = require('express');
const comicsController = require('../controllers/comic.controller');
const router = express.Router();
const { methodNotAllowed } = require('../controllers/errors.controller');
router
    .route('/')
    .get(comicsController.getComicsByFilter)
    .post(comicsController.create)
    .delete(comicsController.deleteAll)
    .all(methodNotAllowed);
router
    .route('/:id')
    .get(comicsController.getOne)
    .put(comicsController.update)
    .delete(comicsController.deleteOne)
    .all(methodNotAllowed);
module.exports = router;