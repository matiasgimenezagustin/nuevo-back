const passport = require('passport');
const User = require('./dao/models/user');
const LocalStrategy = require('passport-local').Strategy;

const admin = {
    "first_name": "cosme",
    "last_name": "cosmesito",
    "email": "admin@gmail.com",
    "age": 21,
    "password": 'admin',
    "cart": null,
    "role": 'admin'
}


passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            console.log('Email:', email);
            console.log('Password:', password);
            console.log(email == 'admin@gmail.com' && password == 'admin')
            if (email == 'admin@gmail.com' && password == 'admin') {
                return done(null, admin)
            }
            else {
                try {
                    const user = await User.findOne({ email });

                    if (!user) {
                        console.log('Usuario no encontrado');
                        return done(null, false, { message: 'Usuario no encontrado' });
                    }

                    const isPasswordValid = await user.validatePassword(password);

                    if (!isPasswordValid) {
                        console.log('Contraseña incorrecta');
                        return done(null, false, { message: 'Contraseña incorrecta' });
                    }

                    console.log('Inicio de sesión exitoso');
                    return done(null, user);
                } catch (err) {
                    console.error('Error en la estrategia:', err);
                    return done(err);
                }
            }


        }
    )
);


passport.serializeUser((user, done) => {
    if (user.role == 'admin') {
        return done(null, 'admin')
    }
    else {
        done(null, user.id);
    }
});

passport.deserializeUser(async (id, done) => {
    if (id == 'admin') {
        done(null, admin)
    }
    else {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }

});
