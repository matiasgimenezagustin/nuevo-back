const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  id: { type: String, required: false },
  owner: {
    type: String,
    default: 'admin',
    required: false,
    validate: {
      validator: function (value) {
        // Si el valor es 'admin', lo consideramos válido
        if (value === 'admin') {
          return true;
        }

        // Si no es 'admin', entonces aplicamos la validación de isPremiumUser
        return isPremiumUser(value);
      },
      message: 'Invalid owner',
    },
  },
});

async function isPremiumUser(value) {
  const User = mongoose.model('User');

  try {
    const user = await User.findOne({ email: value });

    if (!user) {
      return false; // El usuario no existe, por lo tanto, no es premium
    }

    return user.role === 'premium';
  } catch (error) {
    console.error('Error al validar el propietario del producto:', error.message);
    return false;
  }
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
