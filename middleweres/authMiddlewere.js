const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'administrador') {
    // El usuario es administrador, permitir el acceso
    return next();
  }
  // Si no es administrador, redirigir o mostrar un mensaje de error
  res.status(403).json({ message: 'Acceso denegado para administradores.' });
};

const isUser = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'usuario') {
    // El usuario es un usuario regular, permitir el acceso
    return next();
  }
  // Si no es usuario, redirigir o mostrar un mensaje de error
  res.status(403).json({ message: 'Acceso denegado para usuarios.' });
};


function checkUserRole(req, res, next) {
  const user = req.user;

  if (user && (user.role === 'admin' || user.role === 'premium')) {
    next();
  } else {
    res.status(403).json({ error: 'Acceso no autorizado' });
  }
}


module.exports = {isAdmin, isUser, checkUserRole}