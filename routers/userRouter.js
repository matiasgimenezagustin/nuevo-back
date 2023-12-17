const express = require('express');
const User = require('../dao/models/user');
const multer = require('multer');
const userRouter = express.Router()


userRouter.get('/', (req, res) =>{

    res.render('wantPremium', {userId: req.session.passport.user})
})


// Ruta para cambiar el rol de usuario a premium
userRouter.put('/premium/:uid', async (req, res) => {
    try {
      const userId = req.params.uid;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Verificar si el usuario ha cargado los documentos necesarios
      const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
      const hasRequiredDocuments = requiredDocuments.every(doc => user.documents.some(d => d.name === doc));
  
      if (!hasRequiredDocuments) {
        return res.status(400).json({ error: 'El usuario no ha cargado todos los documentos requeridos' });
      }
  
      // Cambiar el rol del usuario a premium
      user.role = 'premium';
  
      // Guardar el usuario actualizado
      await user.save();
  
      return res.status(200).json({ message: 'Rol de usuario actualizado a premium exitosamente' });
    } catch (error) {
      console.error('Error al cambiar el rol del usuario a premium:', error.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  
  module.exp

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    if (file.mimetype.startsWith('image/')) {
      file.uploadType = 'profiles';
      cb(null, true);
    } else if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('application/msword')) {
      file.uploadType = 'documents';
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
});

// Endpoint para subir documentos
userRouter.post('/:uid/documents', upload.array('documents'), async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Procesar los archivos subidos y actualizar el usuario
    if (req.files && req.files.length > 0) {
      const newDocuments = req.files.map((file) => ({
        name: file.originalname,
        reference: `/uploads/${file.uploadType}/${file.originalname}`, // Ruta según el tipo de archivo
      }));

      // Agregar los nuevos documentos al array existente
      user.documents = user.documents.concat(newDocuments);

      // Guardar el usuario actualizado
      await user.save();

      return res.status(200).json({ message: 'Documentos subidos exitosamente' });
    } else {
      return res.status(400).json({ error: 'No se han proporcionado archivos' });
    }
  } catch (error) {
    console.error('Error al subir documentos:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = userRouter;