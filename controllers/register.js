
const handleRegister = (db, bcrypt) => (req, res) => {
    const { fullname, email, password } = req.body;
    if (!fullname, !email, !password) {
        return res.status(400).json('incorrect Form Submission');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            userhash: hash,
            email: email
        })
            .into('userlogin')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        fullname: fullname,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json("Unable to register"));
}


module.exports = {
    handleRegister: handleRegister
};