-- Example starting data --
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Support");

INSERT INTO role (title, salary, department_id)
    VALUES ("Salesperson", 40000.00, 1);
INSERT INTO role (title, salary, department_id)
    VALUES ("Sales Lead", 100000.00, 1); 

INSERT INTO role (title, salary, department_id)
    VALUES ("Junior Engineer", 40000.00, 2);
INSERT INTO role (title, salary, department_id)
    VALUES ("Lead Engineer", 150000.00, 2); 
    
INSERT INTO role (title, salary, department_id)
    VALUES ("Junior Support Tech", 35000.00, 3);
INSERT INTO role (title, salary, department_id)
    VALUES ("Lead Support Tech", 80000.00, 3); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Flora", "Aubergine", 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Brand", "Petersen", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Random", "Maxima", 2, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Julian", "Redmond", 1, 3);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Corwin", "Alexander", 6, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES("Merlin", "Wilbert", 5, 5); 


