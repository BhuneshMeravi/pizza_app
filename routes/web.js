const homeController = require('../app/http/controllers/homeControllers')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')


function initRoutes(app){
    app.get('/', homeController().index)
    app.get('/cart', cartController().index)
    app.get('/update-cart', cartController().update)
    app.get('/login', authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', authController().register)
    app.post('/register', authController().postRegister)
    
}

module.exports = initRoutes