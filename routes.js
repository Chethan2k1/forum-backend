const express = require('express')
// controllers
const { loginHandler } = require('./controllers/login')
const { registerHandler } = require('./controllers/register')
const { createPostHandler } = require('./controllers/createpost')
const { showPostsHandler } = require('./controllers/showposts')
const { getPostHandler } = require('./controllers/fetchpost')
const { createCommentHandler } = require('./controllers/createcomment')
const { getCommentsHandler } = require('./controllers/fetchcomments')
const { getCategoryList } = require('./controllers/fetchcategorylist')
const { createCategoryHandler } = require('./controllers/createcategory')
const { createReportHandler } = require('./controllers/createreport')
const { removePostHandler } = require('./controllers/removepost')
const { removeCommentHandler } = require('./controllers/removecomment')
const { removeReportHandler } = require('./controllers/removereport')
const { getReportedHandler } = require('./controllers/fetchreported')
const { getUsersList } = require('./controllers/fetchuserlist')
const { removeCategoryHandler } = require('./controllers/removecategory')
// middleware
const { jwtverify } = require('./middleware/auth')
const { modverify } = require('./middleware/mod')
const { adminverify } = require('./middleware/admin')
const { createModeratorHandler } = require('./controllers/createmoderator')
const { removeModeratorHandler } = require('./controllers/removemoderator')

module.exports = {
    route: (app) => {
        // middleware ensures that only json payload requests pass through and de-serializes the json to Javascript Object
        app.use(express.json())
        app.post('/login', loginHandler)
        app.post('/register', registerHandler)
        app.get('/posts', showPostsHandler)
        app.get('/post', getPostHandler)
        app.get('/getcomments', getCommentsHandler)
        app.get('/getcategories', getCategoryList)
        app.get('/getusers', getUsersList)
        // routes here after need authorization
        app.use(jwtverify)
        app.post('/report', createReportHandler)
        app.post('/createpost', createPostHandler)
        app.post('/createcomment', createCommentHandler)
        // routes here need mod or admin authorization
        app.use(modverify)
        app.get('/reported', getReportedHandler)
        app.post('/unreport', removeReportHandler)
        app.post('/removepost', removePostHandler)
        app.post('/removecomment', removeCommentHandler)
        // routes here need admin authorization
        app.use(adminverify)
        app.post('/createcat', createCategoryHandler)
        app.post('/removecat', removeCategoryHandler)
        app.post('/createmod', createModeratorHandler)
        app.post('/removemod', removeModeratorHandler)
    }
}