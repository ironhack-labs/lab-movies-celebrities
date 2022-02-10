const bcryptjs = require("bcryptjs")
const mongoose = require("mongoose")
const User = require("./../models/User")

//render register
exports.register = (req, res) => {
	res.render("auth/signup")
}

//render registerForm
exports.registerForm = async (req, res) => {
	const { username, password } = req.body

	if(!username || !password){
		return res.render("auth/signup", {
			errorMessage: "All inputs must be filled in!"
		})
	}	

	//regex 6 caracteres, un número, una minúscula y una mayúscula)
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

	if(!regex.test(password)){
		return res.render("auth/signup", {
			errorMessage: "Your password must contain 6 characters, at least one number, one lowercase and one uppercase."
		})
	}

	const salt = await bcryptjs.genSalt(10)
	const hashedPassword = await bcryptjs.hash(password, salt)

	try {
		const newUser = await User.create({
			username,
			password: hashedPassword
		})
		console.log(newUser)
		return res.redirect("/auth/signupcheck")
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError){
			return res.render("auth/signup", {
				errorMessage: "Please check your info"
			})
		}
		return
	}
}

//render signin 
exports.signin = (req,res) => {
	res.render("auth/signin")
}

//render signinform
exports.signinForm = async (req,res) => {
	console.log(req.body)
	const {username, password} = req.body
	const foundUser = await User.findOne({username})

	if (!foundUser){
		res.render('auth/signin', {
			errorMessage: 'User and password are not found. Please check your info.'
		})
		return
	}
	const verifyPass = await bcryptjs.compareSync(password, foundUser.password)
	console.log(verifyPass);

	if(!verifyPass){
		res.render("auth/signin", {
			errorMessage: 'User and password are wrong. Please check your info.'
		})
		return
	}
	//sesion
	const usr = req.session.currentUser = {
		_id: foundUser._id,
		username: foundUser.username,
		msg: "Este es su golden ticket"
	}
	console.log(usr);

	return res.redirect('/')
}





exports.getSignUpCheck = (req,res) => {
    res.render('auth/check')
}

exports.logout = (req, res) => {
	req.session.destroy(()=>{
		
		res.redirect('/')
	})
}