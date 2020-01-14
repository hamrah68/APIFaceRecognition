const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'c310fe9d0fc34cf68d49639d6bcc0fcf'
});

const handleAPiCall = () => (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL
        , req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('API Failed From Server'))
}


const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleAPiCall
};