-- DROP & CREATE database --
DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

-- USE employee_tracker_db for all transactions --
USE employee_tracker_db;

-- CREATE department table --
CREATE TABLE department (
	id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE role table --
CREATE TABLE role (
	id INTEGER AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

-- CREATE employee table --
CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (id) ON DELETE SET NULL
);

-- Example starting data --
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
    VALUES ("Salesperson", 40000.00, 1);
INSERT INTO role (title, salary, department_id)
    VALUES ("Sales Lead", 100000.00, 1); 

INSERT INTO role (title, salary, department_id)
    VALUES ("Junior Engineer", 40000.00, 2);
INSERT INTO role (title, salary, department_id)
    VALUES ("Lead Engineer", 150000.00, 2); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Flora", "Aubergine", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Brand", "Petersen", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Random", "Maxima", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Julian", "Redmond", 1, 3); 


