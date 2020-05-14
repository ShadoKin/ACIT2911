const User           = require('../Models/User');
var   passport       = require('passport');
const RequestService = require('../Services/RequestService');
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();








exports.Help  = async function(req, res) {
    let reqInfo = RequestService.Helper(req);
    console.log(reqInfo)
    

    if(reqInfo.rolePermitted) {
        console.log('if state')
        res.json({errorMessage:"", reqInfo:reqInfo})
    }
    else {
        console.log('error')
        res.json({errorMessage:
                     'must be logged in with proper permissions to view this page.'})
    }
}

// This function returns data to authenticated users only.
exports.SecureAreaJwt  = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req);
    let roles = await _userRepo.getRolesByUsername(reqInfo.username)
    person = await _userRepo.getByUsername(reqInfo.username)
    console.log(roles + 'node')
    console.log(person)
    if(reqInfo.authenticated) {
        console.log('success')
        res.json({errorMessage:"",roles:roles, person:person, reqInfo:reqInfo,
            secureData: "Congratulations! You are authenticated and you have "
                +  "successfully accessed this message."})
    }
    else {
        console.log('eror node')
        res.json( {errorMessage:'/User/Login?errorMessage=You ' +
                'must be logged in to view this page.'})
    }
}




exports.PostAreaJwt = async function(req, res) {
    let reqInfo = await RequestService.jwtReqHelper(req, []);
    console.log(req.body.obj.msgFromClient);
    res.json({errorMessage:"", reqInfo:reqInfo,
        msgFromServer:"Hi from server"})
};


exports.CreateUser = async function(req, res) {
    
    var password        = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;

    if (password == passwordConfirm) {
        
        res.json({ firstName:    req.body.firstName, lastName:     req.body.lastName, 
            email: req.body.email, username: req.body.username,
            roles: req.body.roles })
       
        var newUser = new User({
            firstName:    req.body.firstName,
            lastName:     req.body.lastName,
            email:        req.body.email,
            username:     req.body.username,
            roles: req.body.roles
        });
       
        User.register(new User(newUser), req.body.password, 
                function(err, account) {
                   
                    if (err) {
                        let reqInfo = RequestService.reqHelper(req);
                        return res.json({ user : newUser, errorMessage: err, 
                          reqInfo:reqInfo });
                    }
                  
                    passport.authenticate('local') (req, res);
                    res.json({user : newUser})
                });

    }
    else {
      res.json({ user:newUser, 
              errorMessage: "Passwords do not match.", 
              reqInfo:reqInfo})
    }
    
}