const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const { original, correct_count, incorrect_count } =
        await LanguageService.getWord(
          req.app.get('db'),
          req.language.head
        )

      if (!original)
        return res.status(404).json({ error: `Could not find the next word` })
      if (correct_count == null)
        return res.status(404).json({ error: `The next word does not have a count of your correct answers` })
      if (incorrect_count == null)
        return res.status(404).json({ error: `The next word does not have a count of your incorrect answers` })
      if (req.language.total_score == null)
        return res.status(404).json({ error: `Could not find a total score` })

      res.json({
        nextWord: original,
        wordCorrectCount: correct_count,
        wordIncorrectCount: incorrect_count,
        totalScore: req.language.total_score
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    // implement me
    res.send('implement me!')
  })

module.exports = languageRouter
