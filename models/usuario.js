const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
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
  // telefono: {
  //   type: String,
  //   required: true
  // },
  password: {
    type: String,
    required: true
  },
  tokenReinicio: String,
  expiracionTokenReinicio: Date,
  isadmin: {
    type: Number,
    required: true
  },
  carrito: {
    productos: [
      {
        idProducto: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true }
      }
    ]
  }
});

usuarioSchema.methods.agregarAlCarrito = function (producto, cantidad = null) {
  if (!this.carrito) {
    this.carrito = { productos: [] };
  }

  const indiceEnCarrito = this.carrito.productos.findIndex(cp => {
    return cp.idProducto.toString() === producto._id.toString();
  });

  const productosActualizados = [...this.carrito.productos];

  if (indiceEnCarrito >= 0) {
    if (cantidad != null && cantidad > 0) {
      productosActualizados[indiceEnCarrito].cantidad += cantidad;
    } else if (cantidad === null || cantidad > 0) {
      productosActualizados[indiceEnCarrito].cantidad += 1;
    }
  } else {
    if (cantidad != null && cantidad > 0) {
      productosActualizados.push({
        idProducto: producto._id,
        cantidad: cantidad
      });
    } else {
      productosActualizados.push({
        idProducto: producto._id,
        cantidad: 1
      });
    }
  }

  // Asignar los productos actualizados al carrito y guardarlo
  this.carrito = { productos: productosActualizados };
  return this.save();
};

usuarioSchema.methods.actualizarAlCarrito = function (producto, cantidad = null) {
  if (!this.carrito) {
    this.carrito = { productos: [] };
  }

  const indiceEnCarrito = this.carrito.productos.findIndex(cp => {
    return cp.idProducto.toString() === producto._id.toString();
  });

  const productosActualizados = [...this.carrito.productos];

  if (indiceEnCarrito >= 0) {
    // Producto ya está en el carrito
    if (cantidad != null) {
      if (cantidad > 0) {
        // Actualiza con la nueva cantidad proporcionada
        productosActualizados[indiceEnCarrito].cantidad = cantidad;
      } else {
        // Elimina si la cantidad es 0 o menor
        productosActualizados.splice(indiceEnCarrito, 1);
      }
    } else {
      // Incrementa cantidad en 1 si no se proporciona cantidad específica
      productosActualizados[indiceEnCarrito].cantidad += 1;
    }
  } else if (cantidad > 0 || cantidad === null) {
    // Producto no está en el carrito, lo agrega
    productosActualizados.push({
      idProducto: producto._id,
      cantidad: cantidad != null ? cantidad : 1
    });
  }

  this.carrito = { productos: productosActualizados };
  return this.save();
};

usuarioSchema.methods.deleteProductoDelCarrito = function (idProducto) {
  const productosActualizados = this.carrito.productos.filter(producto => {
    return producto.idProducto.toString() !== idProducto.toString();
  });
  this.carrito.productos = productosActualizados;
  return this.save();
};

usuarioSchema.methods.limpiarCarrito = function () {
  this.carrito = { productos: [] };
  return this.save();
};

module.exports = mongoose.model('Usuarios', usuarioSchema);