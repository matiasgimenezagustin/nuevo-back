Proyecto de Gestión de Productos
Este es un proyecto de gestión de productos que utiliza tecnologías como Express, Handlebars, MongoDB con Mongoose, y segmentación de usuarios en roles (premium, user, admin). Aquí se presenta un resumen simple de las características principales del proyecto.

Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

models/product.js: Contiene el esquema del producto utilizando Mongoose.

routes/products.js: Define las rutas para la gestión de productos.

routes/users.js: Define las rutas y lógica relacionada con la autenticación y segmentación de usuarios.

views/: Contiene archivos Handlebars para la representación visual de las páginas.

middlewares/: Almacena funciones intermedias, como autenticación y segmentación de usuarios.

Tecnologías Utilizadas
Express: Marco web de Node.js para manejar las rutas y solicitudes HTTP.

Handlebars: Motor de plantillas para generar vistas HTML dinámicas.

Mongoose: Biblioteca de modelado de objetos MongoDB para interactuar con la base de datos.

Segmentación de Usuarios en Roles
Roles: Los usuarios se dividen en roles como admin, premium, y user.

Middlewares de Autenticación: Se utilizan middlewares para verificar la autenticación del usuario y asignar roles.

Documentación en Postman
Se proporciona una colección de Postman con ejemplos de solicitudes para interactuar con la API.

La documentación detallada de la API se encuentra en el archivo API_Documentation.md.

Sesiones
Se implementa la gestión de sesiones para realizar el seguimiento de la autenticación del usuario.