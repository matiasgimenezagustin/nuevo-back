

const restoreMail = (email, token)=> {
    return {
        to: email,
        subject: 'Restablecer contraseña',
        html: `
            <h1>Restablecer</h1>
            <p>Puedes restaurar la contraseña en este link <a href='http://localhost:8080/session/passwordRestore?token=${token}'>de aqui</a>
            </p>
        `
    }

}

module.exports = {restoreMail}