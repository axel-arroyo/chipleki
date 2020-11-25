Proyecto Análisis y Diseño de Software 2020-2 grupo Chipleki Chipleki ®

# Dependencias
## Backend
npm i express sequelize pg pg-hstore bcrypt jsonwebtoken dotenv cors

npm i -D nodemon sequelize-cli
## Frontend
npx create-react-app frontend --use-npm

npm i react-bootstrap bootstrap axios @reduxjs/toolkit react-redux react-router-dom moment

# Por Implementar
* ~~Agregar Requerimientos al proyecto (Historia de Usuario)~~
  + Intentar detectar automaticamente el Id del Analista que lo crea (fácil si lo hace un analista pues está en su token la info, complicado si lo crea un Manager, hay que pensar eso). O si no cambiar que el creador del requerimiento se obtenga por email y no id, pues es único en el sistema, en el peor de los casos borrar esa columna de la BD yera.
* Vista de Requerimientos (Con redux supongo, similar a vista de proyectos)
* Editar requerimientos (tanto en redux como en la base de datos)
* En el backend agregar autentificación por token (Lo implementan al final del video de login backend), quizás con las restricciones del frontend no es necesario, esto para despúes.
#### Cosas a futuro
* Que el usuario ingresado pueda solamente ver sus projectos (y no los ajenos)
* ¿Se puede editar la información de un proyecto (Cliente, Analista, Fecha de entrega, etc) En caso de que si, falta implementarlo
