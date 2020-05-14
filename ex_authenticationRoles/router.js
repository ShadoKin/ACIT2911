var HomeController   = require('./Controllers/HomeController');
var UserController   = require('./Controllers/UserController');
const authMiddleware = require('./authHelper')
const cors           = require('cors');
var ProductController = require('./Controllers/ProductController');


// Routes
module.exports = function(app){  
    // Main Routes
   
    app.get('/Home/Index',cors(), ProductController.Index);
    // Sign in
    app.post(
        '/auth', cors(),
        // middleware that handles the sign in process
        authMiddleware.signIn,
        authMiddleware.signJWTForUser
    )
    app.post('/User/CreateUser', cors(), UserController.CreateUser);
    app.get('/Home/Display', cors(), ProductController.Display);
    app.put('/Home/EditProduct', cors(), ProductController.Edit);
    app.delete('/Home/Delete', cors(), ProductController.Delete);
    app.post('/Home/Create', cors(), ProductController.Create);


// Accessible to authenticated user. CORS must be enabled
// for client App to access it.
   

        app.get('/User/SecureAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.SecureAreaJwt)



// Receives posted data from authenticated users.
    app.post('/User/PostAreaJwt', cors(),
        authMiddleware.requireJWT, UserController.PostAreaJwt)

};
