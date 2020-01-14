const handleSignin = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect signin Info');
    }
    db.select('email', 'userhash').from('userlogin')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].userhash);
            if (isValid) {
                return db.select('*').from('users').where('email', '=', email)
                    .then(user => {
                        console.log(user + "this is users from sing in")
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else {
                res.status(400).json('wrong credentials');
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
    handleSignin: handleSignin
};