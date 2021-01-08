Proyecto Análisis y Diseño de Software 2020-2 grupo Chipleki Chipleki ®  
Disponible en Github: https://github.com/axel-arroyo/chipleki

Por temas de compatibilidad y peso de archivos, las dependencias se deben instalar manualmente como se indica a continuación

# Dependencias
## Backend
npm i express sequelize pg pg-hstore bcrypt jsonwebtoken dotenv cors

npm i -D nodemon sequelize-cli
## Frontend
Primero crear el proyecto react con el siguiente comando, donde frontend es el nombre del proyecto, dentro van los archivos respectivos del repositorio.

npx create-react-app frontend --use-npm

Dependencias del frontend:

npm i react-bootstrap bootstrap axios jwt-decode @reduxjs/toolkit react-redux react-router-dom moment semantic-ui-react react-table react-meta-tags

#Despliegue
Dado que para utilizar la página se deben tener cuentas de usuario, y para crear estos se necesita una cuenta con permisos tipo "Manager", la primera cuenta del sistema debe ser creada por medio de Postman o un programa similar, un ejemplo del POST respectivo se encuentra en la imagen "ejemplo_postman" del repositorio, indicando un token de autorización como se indica en la imagen "token", un token que puede utilizarse se encuentra en el archivo jwt. Teniendo la cuenta creada, se puede iniciar sesión en la plataforma con el correo y contraseña respectivos y manejar la plataforma como se esperaría, es decir, crear las cuentas necesarias, proyectos y requerimientos deseados, etc.

Para la tabla de asignación de desarrolladores se tiene un campo de Rating, el cual indica "New Developer" cuando un desarrollador aún no ha sido evaluado, no nos centramos en una forma de evaluación pues no corresponde con nuestro escenario, pero en caso que quiera ser probado, se puede evaluar a un desarrollador por medio de Postman indicando su correo y rating, como lo ejemplificado en la imagen "rating" (es necesario el auth-token). Un desarrollador puede ser evaluado múltiples veces.

