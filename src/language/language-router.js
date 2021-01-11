const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { getPrevious } = require('../linked-list/linked-list-functions')
const jsonBodyParser = express.json()

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
        await LanguageService.getWordById(
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
  .route('/guess')
  .post(jsonBodyParser, async (req, res, next) => {
    try {
      let { guess } = req.body
      let isCorrect
      let nextWord
      let wordUpdates
      let languageUpdates

      if (!guess)
        return res.status(400).json({
          error: `Missing 'guess' in request body`,
        })

      // put words into linked list
      const list = await LanguageService.populateLLWithOrderedWords(
        req.app.get('db'),
        req.language.id,
        req.language.head
      )
      const head = list.head ? list.head.value : null

      if (!head)
        return res.status(404).json({
          error: `Could not find any words`,
        })

      // check guess against answer
      if (guess.trim().toLowerCase() === head.translation.trim().toLowerCase()) {
        head.memory_value *= 2
        head.correct_count++
        req.language.total_score++
        isCorrect = true
      } else {
        head.memory_value = 1
        head.incorrect_count++
        isCorrect = false
      }

      // update and get results
      list.remove(head.id)
      list.insertAt(head, head.memory_value) // also updates head's next and the next of the word before it
      wordUpdates = { // updates to old head
        memory_value: head.memory_value,
        next: head.next, // old head's new next
        correct_count: head.correct_count,
        incorrect_count: head.incorrect_count
      };
      languageUpdates = {
        head: list.head ? list.head.value.id : null,
        total_score: req.language.total_score
      };
      const prevWord = getPrevious(list, head.id) || list.head; // get word before old head in its new position 

      [nextWord, wordUpdates, languageUpdates, rest] = await Promise.all([
        LanguageService.getWordById(
          req.app.get('db'),
          languageUpdates.head
        ),
        LanguageService.update(
          req.app.get('db'),
          'word',
          head.id,
          wordUpdates
        ),
        LanguageService.update(
          req.app.get('db'),
          'language',
          req.language.id,
          languageUpdates
        ),
        LanguageService.update(
          req.app.get('db'),
          'word',
          prevWord.id,
          { next: prevWord.next }
        )
      ])

      res.json({
        nextWord: nextWord.original,
        wordCorrectCount: nextWord.correct_count,
        wordIncorrectCount: nextWord.incorrect_count,
        totalScore: languageUpdates.total_score,
        answer: wordUpdates.translation,
        isCorrect
      })
      next()
    } catch (error) {
      next(error)
    }
  })

module.exports = languageRouter
