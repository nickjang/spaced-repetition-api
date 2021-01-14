# Spaced Repetition

An application for learning french words using spaced repetition as the quizzing method. Implements a linked list and sorting algorithm.

This application was written using React, Node.js, PostgreSQL.

[site]: https://spaced-repetition-red.vercel.app/

## Table of contents

- [Demo](#demo)
- [Application](#application)
- [API](#api)
- [Technologies](#technologies)
- [Acknowledgments](#acknowledgments)
- [Links](#links)

## Demo

<img src="./src/assets/images/spaced-repetition.gif" align="middle" alt="A live demo of using the application from creating an account to viewing the dashboard to being quizzed and getting feeback." width="575">

A demo of creating an account -> viewing the dashboard -> quizzing -> getting feedback.

## Application

Try learning french words using this [application][site] that makes use of the spaced repetition method! You'll need to create an account to start learning. When you log in, you'll be shown your dashboard, which will contain the words to learn, correct and incorrect counts for each word, and a total score. Click 'Start practicing' to start learning.

On the learning page, you can guess the english translation of the word and recieve feedback. You can also see your total score and the correct and incorrect counts for the word you're viewing. The next word you are quizzed on is given based on whether you're guess for it was correct or incorrect. If you guess incorrectly, you'll be quizzed on it again in two turns. Each consecutive time you guess a word correctly, it'll be sent further down the line, so you'll see it less often (depending on how you do on the other words).

[GitHub page](https://github.com/nickjang/spaced-repetition) for the client.

## API

Base URL: `https://nickjang-spaced-repetition.herokuapp.com/api`

- `/language` Endpoint 
	- GET
		- `/language`
			- Get user's language and language words.
		- `/language/head`
			- Get next word (first word in list) to quiz user the word's correct/incorrect counts, and the user's total score.
	- POST
		- `/language/guess`
			- Send the user's guess, and get back result, answer, next word, next word's correct/incorrect counts, and user's total score.
- `/user` Enpoint
	- POST 
		- `/user`
			- Create a new user, given a username, password, and name.
- `/auth` Endpoint
	- POST
		- `/auth/token`
			- Send user's username and passsword, and get JWT.
		- `/auth/put`
			- Refresh a user's JWT.

## Technologies

This application was written using React, Node.js, Express, PostgreSQL, Mocha/Chai, JWT, and CSS.

## Acknowledgments

Thank you to [Thinkful](https://thinkful.com/), where this capstone was completed.

## Links

* [The spaced repetition application][site]
* [The client's GitHub page](https://github.com/nickjang/spaced-repetition)