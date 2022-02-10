//Areas de autenticacion 
exports.authAreas = (req, res, next) => { //area de autenticacion

    // si el usuario ya esta logueado e intenta ir a login o register
    if (req.session.currentUser) {
        res.redirect('/')
    }
    next() //hace que avancemos al controller  router.get(" ... ", authAreas, ...Controller. ...)
}   // hace                                                            |____________/\ 

exports.privateAreas = (req, res, next) => { //areas privadas

    // SI EL USUARIO NO LOGGEADO INTENTA ENTRAR... REDIRIGIRLO AL LOGIN
	if(!req.session.currentUser){
		res.redirect("/auth/signin")
		return
	}

	next()
    
}