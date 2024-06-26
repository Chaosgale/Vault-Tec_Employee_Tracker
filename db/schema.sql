DROP DATABASE IF EXISTS vaulttec_db;
CREATE DATABASE vaulttec_db;

USE vaulttec_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

ALTER TABLE roles
ADD COLUMN department VARCHAR(30);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL,
    roles_id INT,
    FOREIGN KEY (roles_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);

ALTER TABLE employee
ADD COLUMN manager VARCHAR(60),
ADD COLUMN title VARCHAR(30),
ADD COLUMN salary DECIMAL(10, 0),
ADD COLUMN department VARCHAR(30);


