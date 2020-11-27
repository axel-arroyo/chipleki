Proyecto Análisis y Diseño de Software 2020-2 grupo Chipleki Chipleki ®

# Dependencias
## Backend
npm i express sequelize pg pg-hstore bcrypt jsonwebtoken dotenv cors

npm i -D nodemon sequelize-cli
## Frontend
npx create-react-app frontend --use-npm      (frontend es el nombre de la carpeta a crear, pongan lo que quieran)

npm i react-bootstrap bootstrap axios @reduxjs/toolkit react-redux react-router-dom moment

# Por Implementar
* ~~Agregar Requerimientos al proyecto (Historia de Usuario)~~
* ~~Vista de Requerimientos (Con redux supongo, similar a vista de proyectos)~~
* ~~Editar requerimientos (tanto en redux como en la base de datos)~~
  + No se actualizan en redux, pero se vuelven a obtener al entrar a la vista, entonces no importa (?)
* ~~En el backend agregar autentificación por token (Lo implementan al final del video de login backend), quizás con las restricciones del frontend no es necesario, esto para despúes.~~
#### Cosas a futuro
* ~~Quizás cambiar la Primary Key de los usuarios, managers, etc. al correo, ya deberían ser únicos y es más intuitivo que una ID.~~
* Que el usuario ingresado pueda solamente ver sus projectos (y no los ajenos)
* ¿Se puede editar la información de un proyecto (Cliente, Analista, Fecha de entrega, etc) En caso de que si, falta implementarlo
