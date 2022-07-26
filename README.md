# Skill Test N 2 - Trabajo Práctico - Mathías Ezequiel Latrónico

## Grupo de dos

- Mathías Ezequiel Latrónico - [GitHub](https://github.com/mathiezelat)
- Lucas Alvarez - [GitHub](https://github.com/lucasna4)

## 1. Sintaxis de la base de datos de La Tablita
```sql
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

### Stored Procedures
```sql
CREATE PROCEDURE `addOrEditCategories` (
    IN _id INT, 
    IN _name VARCHAR(50)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO categories (name) 
        VALUES (_name);

        SET _id = LAST_INSERT_ID();
    ELSE 
        UPDATE categories 
        SET NAME = _name 
        WHERE id = _id;
    END IF;

    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditCustomers` (
    IN _id INT, 
    IN _name VARCHAR(50), 
    IN _email VARCHAR(100)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO customers (name, email) 
        VALUES (_name, _email);
        
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE customers 
        SET name = _name, email = _email 
        WHERE id = _id;
    END IF;

    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditOrder_products` (
    IN _id INT, 
    IN _quantity INT, 
    IN _total FLOAT, 
    IN _order_id INT, 
    IN _product_id INT
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO order_products (quantity, total, order_id, product_id) 
        VALUES (_quantity, _total, _order_id, _product_id);
        
        SET _id = LAST_INSERT_ID();
    ELSE 
        UPDATE order_products 
        SET quantity = _quantity, total = _total, order_id = _order_id, product_id = _product_id 
        WHERE id = _id;
    END IF;
      
    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditOrders`(
    IN _id INT,
    IN _status BIT,
    IN _store_id INT,
    IN _staff_id INT,
    IN _customer_id INT
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO orders (status, store_id, staff_id, customer_id) 
        VALUES (_status, _store_id, _staff_id, _customer_id);
        
        SET _id = LAST_INSERT_ID();
    ELSE 
        UPDATE orders 
        SET status = _status, store_id = _store_id, staff_id = _staff_id, customer_id = _customer_id 
        WHERE id = _id;
    END IF;
      
    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditPosition` (
    IN _id INT, 
    IN _name VARCHAR(50)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO position (name) 
        VALUES (_name);
        
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE position
        SET name = _name 
        WHERE id = _id;
    END IF;

    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditProducts` (
    IN _id INT,
    IN _name VARCHAR(50),
    IN _price FLOAT,
    IN _categories_id INT
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO products (name, price, categories_id) 
        VALUES (_name, _price, _categories_id);
          
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE products 
        SET name = _name, price = _price, categories_id = _categories_id 
        WHERE id = _id;
    END IF;
      
    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditStaff` (
    IN _id INT, 
    IN _name VARCHAR(50), 
    IN _position_id INT, 
    IN _store_id INT
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO staff (name, position_id, store_id) 
        VALUES (_name, _position_id, _store_id);
          
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE staff 
        SET name = _name, position_id = _position_id, store_id = _store_id 
        WHERE id = _id;
    END IF;
      
    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditStocks` (
    IN _id INT, 
    IN _quantity INT, 
    IN _store_id INT, 
    IN _product_id INT
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO stocks (quantity, store_id, product_id) 
        VALUES (_quantity, _store_id, _product_id);

        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE stocks 
        SET quantity = _quantity, store_id = _store_id, product_id = _product_id 
        WHERE id = _id;
    END IF;

    SELECT _id AS id;
END
```
```sql
CREATE PROCEDURE `addOrEditStores` (
    IN _id INT, 
    IN _name VARCHAR(50), 
    IN _city VARCHAR(50)
)
BEGIN
    IF _id = 0 THEN
        INSERT INTO stores (name, city) 
        VALUES (_name, _city);
          
        SET _id = LAST_INSERT_ID();
    ELSE
        UPDATE stores 
        SET name = _name, city = _city 
        WHERE id = _id;
    END IF;
      
    SELECT _id AS id;
END
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
1. Inicializamos el proyecto con `npm init -y`
2. Instalamos los paquetes de producción con `npm install express mysql morgan` y los paquetes de desarrollo con `npm install nodemon -D`
3. Creamos la carpeta src y dentro el archivo index.js que va a contener como funcionalidad la iniciación del servidor con express
4. Agregamos dos script en el package.json uno para el desarrollo con nodemon con el siguiente comando `"dev": "nodemon src/index.js"` y otro para producción con el comando `"start": "node src/index.js"`
5. Creamos una carpeta routes y dentro todas las rutas de la base de datos de La Tablita con su CRUD
6. Creamos una carpeta views con el HTML usando PUG de la presentación de La Tablita
7. Iniciamos el servidor con el comando `npm run dev` para desarrollo o `npm start` para producción