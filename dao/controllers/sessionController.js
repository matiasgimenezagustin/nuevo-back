


const passwordRestoreRequest = async (req, res) =>{
    const {email} = req.body
    console.log(email)
    console.log('hola')
    return res.sendStatus(200)
}



module.exports = {passwordRestoreRequest}