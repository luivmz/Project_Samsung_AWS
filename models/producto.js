const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
  nombreproducto: {
    type: String,
    required: true
  },
  urlImagen: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  caracteristicas: {
    type: Array,
    required: true
  },
  categoria_id: {
    type: Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  },
  idUsuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
});

module.exports = mongoose.model('Producto', productoSchema);
