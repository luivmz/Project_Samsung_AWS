> [!NOTE]
Componentes adicionales para cumplir el objetivo del proyecto:
> ## JSONWEBTOKEN
> Libreria para la creación de tokens de seguridad. Estos son un estandar abierto que nos permite transmitir información de manera segura.
> Para usarlo se realiza el siguiente requerimiento
> > const jwt= require('jsonwebtoken');
> ## COOKIEPARSER
> Middleware Para gestionar los cookies. Aqui es donde se va colocar el token.
> Para usar este middleware en el archivo app.js:
> > const cookieParser= require('cookie-parser')
> 
> Luego antes del ruteo:
> > app.use(cookieParser())



# EJECUCION DEL PROGRAMA

Primero ejecutar el siguiente comando:
```
npm install
```
Luego:
```
npm start
```


