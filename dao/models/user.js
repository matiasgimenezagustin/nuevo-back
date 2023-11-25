const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  role: { type: String, enum: ['usuario', 'premium'], default: 'usuario' },
  canCreateProducts: { type: Boolean, default: false },
});

// Método para validar la contraseña
userSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.changePassword = async function (email, newPassword) {
  try {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    user.password = hashedPassword;
    await user.save();

    console.log('Contraseña cambiada exitosamente.');
  } catch (error) {
    console.error('Error al cambiar la contraseña:', error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
