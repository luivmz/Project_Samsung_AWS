document.addEventListener('DOMContentLoaded', () => {
    const cartDropdown = document.querySelector('.cart-dropdown .cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    // Realizar una solicitud para obtener los productos del carrito
    fetch('/api/carrito')
        .then(response => response.json())
        .then(data => {
            cartDropdown.innerHTML = ''; // Limpiar la lista antes de agregar productos
            let total = 0;
            data.productos.forEach(producto => {
                const productCard = document.createElement('a');
                productCard.href = `/productos/${producto.id}`
                productCard.innerHTML = `
                    <p>
                        <span class="cart-item_nombre">${producto.nombreproducto}</span>
                        <span class="cart-item_precio">S/. ${producto.precio * producto.cantidad}</span>
                        <span class="cart-item_cantidad">Cantidad: ${producto.cantidad}</span>
                    </p>
                    <div class="dropdown-image">
                        <img src="${producto.imagen ? producto.imagen : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s"}" alt="${producto.nombreproducto}">
                    </div>
                `;
                cartDropdown.appendChild(productCard);
                total += producto.precio * producto.cantidad;
            });
            total > 0 ? cartTotalPrice.textContent = `Total: S/. ${total.toFixed(2)}` : cartTotalPrice.textContent = "Su carrito está vacío";
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
});
