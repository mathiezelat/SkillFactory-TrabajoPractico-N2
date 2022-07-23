# Skill Test N 2 - Trabajo Práctico - Mathías Ezequiel Latrónico

## 1. Sintaxis de la base de datos de La Tablita
```
CREATE DATABASE IF NOT EXISTS LaTablita;
USE LaTablita;

CREATE TABLE customers (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE stores (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE position (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE staff (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  position_id INT NOT NULL,
  store_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (position_id) REFERENCES position (id),
  FOREIGN KEY (store_id) REFERENCES stores (id)
);

CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL,
  categories_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (categories_id) REFERENCES categories (id)
);

CREATE TABLE stocks (
  id INT NOT NULL AUTO_INCREMENT,
  quantity INT NOT NULL,
  store_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (store_id) REFERENCES stores (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE orders (
  id INT NOT NULL AUTO_INCREMENT,
  status BIT NOT NULL,
  store_id INT NOT NULL,
  staff_id INT NOT NULL,
  customer_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (store_id) REFERENCES stores (id),
  FOREIGN KEY (staff_id) REFERENCES staff (id),
  FOREIGN KEY (customer_id) REFERENCES customers (id)
);

CREATE TABLE order_products (
  id INT NOT NULL AUTO_INCREMENT,
  quantity INT NOT NULL,
  total FLOAT NOT NULL,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);
```

## 2. Servidor de express
Servidor express con todas las rutas posibles, usando la sintaxis de express, utilizando los paquetes de express, morgan, mysql y nodemon.

## 3. Respuestas del cuestionario
### a) ¿Qué es una base de datos?
Una base de datos es un almacén de información o datos que están conectados entre sí.

### b) ¿Qué es una tabla? ¿Cómo funciona?
Una tabla es dónde se guardan los datos de un modelo en especifico. Cada tabla contiene filas y columnas, donde cada fila contiene un campo de dato (clave), y cada columna contiene el valor de ese campo de dato (valor).

### c) ¿Qué comandos de SQL conoces? Describe su utilidad
- CREATE DATABASE: Crea una base de datos.
- USE: Usamos la base de datos.
- CREATE TABLE: Creamos una tabla en la base de datos.
- DESCRIBE: Describimos una tabla de la base de datos.
- INSERT INTO: Insertamos nuevos registros en una tabla de la base de datos.
- SELECT: Seleccionamos datos de una tabla de la base de datos.
- UPDATE: Modificamos registros de una tabla de la base de datos.
- DELETE: Eliminamos registros de una tabla de la base de datos.
- LEFT JOIN: Seleccionamos todos los datos de la tabla izquierda, y los datos que coincidan de la tabla derecha.
- RIGHT JOIN: Seleccionamos todos los datos de la tabla derecha, y los datos que coincidan de la tabla izquierda.
- INNER JOIN: Selecciona los datos que tienen valores que coinciden en ambas tablas.

## 4) Describo paso a paso el procedimiento del punto 2
1. Inicializamos el proyecto con `npm init -y` y `git init`
2. Instalamos los paquetes de producción con `npm install express mysql morgan` y los paquetes de desarrollo con `npm install nodemon -D`
3. Creamos la carpeta src y dentro el archivo index.js que va a contener como funcionalidad la iniciación del servidor con express
4. Agregamos dos script en el package.json uno para el desarrollo con nodemon con el siguiente comando `"dev": "nodemon src/index.js"` y otro para producción con el comando `"start": "node src/index.js"`
5. Creamos una carpeta routes y dentro todas las rutas de la base de datos de La Tablita con su CRUD
6. Creamos una carpeta public con el HTML de la presentación de La Tablita
7. Iniciamos el servidor con el comando `npm run dev` para desarrollo o `npm start` para producción