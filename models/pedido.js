const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  productos: [
    {
      producto: { type: Object, required: true },
      cantidad: { type: Number, required: true }
    }
  ],
  usuario: {
    nombres: {
      type: String,
      required: true
    },
    apellidos: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    idUsuario: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Usuario'
    }
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
