# [CodeSnatch (V.2)](https://codesnatch.herokuapp.com/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5611cf77548a46cd9bed1c82dd195f12)](https://www.codacy.com/app/dy-fi/CodeSnatch?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dy-fi/CodeSnatch&amp;utm_campaign=Badge_Grade)

Live build is now fully functional with 7 languages, and more to come

Upload or snap a picture of code and execute it

-----

## New features in V.2
* optimized, much faster than V.1 (heroku can handle it now!)
* multiple language support
* fixed code execution
* formatted for mobile

-----

## Running Locally
Make sure you have [Node.js](http://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.

```sh
git clone https://github.com/dy-fi/CodeSnatch
cd CodeSnatch
npm install
nodemon app.js
```
The app should now be running on [localhost:3000](http://localhost:3000/). Make sure MongoDB is installed and MongoDB Daemon is running.

## Running Locally With Docker
Make sure you have [Docker](https://www.docker.com/) installed

```sh
git clone https://github.com/dy-fi/CodeSnatch
cd CodeSnatch
docker-compose up --build
```
---

## Built With
* [NodeJS](https://nodejs.org/en/) - Web framework
* [Tesseract](http://tesseract.projectnaptha.com/) - OCR
* [JDoodle](https://www.jdoodle.com/compiler-api/) - Compiler API
* [Passport](http://www.passportjs.org/) - Authentication layer

---

### Author
Dylan Finn | [Github](https://github.com/dy-fi/) | [LinkedIn](https://www.linkedin.com/in/dylan-finn-a36b9614b/) | [Portfolio](https://www.makeschool.com/portfolio/Dylan-Finn)
