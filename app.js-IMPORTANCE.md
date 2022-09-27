app.js is the MAIN file.
all require does is copy and pasiting express, mongoose or othrhing things.

app.use() is a function/method of "express"

frame works are for to split stuff up into dfferent files and folder etc.



Animal.find().sort({createdAt: -1}) //SchemaName.find().sort({createdAt: -1}) lets you sort by shit




Sort Button Set Up--


Animal.find().sort({createdAt: -1})
.then((animalFromDb)  => {


})


Look at sortBy Exmaple on NICK's example


in profile

hbs
- <h4>
change password link (/changePassword)
</h4>

app.js
router.get(/changepassword, (req...) => {

    res.redner("auth/changePassword", {theUser:req.session.currentUser})

})


changePAssword.hbs

<h3> user name {{user.username}}



form action ="/new--password" method="post



label for ="
old pass
input type ="text" name="oldpass"

end label




label for ="
old pass
input type ="text" name="newpass"

end label



label for ="
old pass
input type ="text" name="confirmNewPass"

end label



req.body.oldpass
req.body.newpass
req.body.confirmNewPass




js rOUTE

router.post(`/newpass" , (req, res, next) => {
    User.findById();

    res.send(req.body)

})


(bcryptjs.compareSync(req.body.oldpass, resultFromDB.password))
