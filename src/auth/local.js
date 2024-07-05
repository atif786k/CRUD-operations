const passport = require("passport");
const Strategy = require("passport-local");
const mockUsers = require("../utils/userData");
const User = require("../schemas/usersSchema");


// this function map the user to sessionID
passport.serializeUser((user, done) => {
    // console.log("Inside Serailize User");
    // console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    // console.log("Inside Deserialize User")
	try {
		const findUser = await User.findById(id);
		if (!findUser) throw new Error("User Not Found");
		done(null, findUser);
	} catch (err) {
		done(err, null);
	}
})

module.exports = passport.use(
    new Strategy( async (username, password, done) => {
        // console.log(`username: ${username}`);
        // console.log(`password: ${password}`);
        try{
            const findUser = await User.findOne({ username });
            if(!findUser) throw new Error("Sorry, user not found");
            if(findUser.password !== password){
                throw new Error("Invlaid Credentials");
            }
            done(null, findUser);
        } catch(err){
            done(err, null);
        }
    })
)