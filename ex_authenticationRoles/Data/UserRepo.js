const User = require('../Models/User');

class UserRepo {
    UserRepo() {        
    }

    async getUserByEmail(email) {
        var user = await User.findOne({email: email});
        if(user) {
            let respose = { obj: user, errorMessage:"" }
            return respose;
        }
        else {
            return null;
        }
    }

    async getRolesByUsername(username) {
        var user = await User.findOne({username: username}, {_id:0, roles:1});
        if(user.roles) {
            return user.roles;
        }
        else {
            return [];
        }
    }    

    async getByUsername(username) {
        var user = await User.findOne({username: username});
        if(user!=null) {
            return user;
        }
        else {
            return [];
        }
    }    
}
module.exports = UserRepo;

