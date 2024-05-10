INSERT INTO department (department)
VALUES ('Science'),
       ('Management'),
       ('Security'),
       ('Medical');

INSERT INTO roles (title, department_id, salary)
VALUES ('Scientist', 1, 110000),
       ('Chief Scientist', 1, 200000),
       ('Engineer', 1, 120000),
       ('Chief Engineer', 1, 210000),
       ('Chief Executive Officer', 2, 800000),
       ('Senior Vice President', 2, 420000),
       ('Senior Executive', 2, 340000),
       ('Junior Executive', 2, 260000),
       ('Executive Assistant', 2, 210000),
       ('Chief of Security', 3, 120000),
       ('Vault Security', 3, 60000),
       ('Chief Physician', 4, 300000),
       ('Physician', 4, 280000);

UPDATE roles r
LEFT JOIN department d ON r.department_id = d.id
SET r.department = d.department;

INSERT INTO employee (first_name, last_name, manager_id, roles_id)
VALUES ('Giles', 'Wolstencroft', NULL, 5),
       ('Bud', 'Askins', 1, 6),
       ('Barb', 'Howard', 2, 7),
       ('George', 'Yaffe', 3, 8),
       ('Sarah', 'Clements', 3, 8),
       ('Steph', 'Harper', 3, 8),
       ('Betty', 'Pearson', 2, 9),
       ('Henry', 'MacLean', 1, 9),
       ('John', 'Malleus', 2, 2),
       ('Jim', 'Flint', 9, 1),
       ('Kenneth', 'Collins', 9, 1),
       ('Luis', 'Bateman', 9, 1),
       ('Carl', 'Maynard', 2, 4),
       ('Aaron', 'Bradie', 13, 3),
       ('Jameson', 'Grillo', 13, 3),
       ('Miguel', 'Caldera', 13, 3),
       ('Jerec', 'Maddix', 2, 10),
       ('Nathan', 'Simms', 17, 11),
       ('John', 'Andersen', 17, 11),
       ('Stanley', 'Doe', 17, 11),
       ('Wayne', 'Merrick', 2, 12),
       ('John', 'Bennison', 21, 13),
       ('Ted', 'Riley', 21, 13),
       ('Ella', 'Ames', 21, 13);
    
UPDATE employee e
LEFT JOIN employee m ON e.manager_id = m.id
LEFT JOIN roles r ON e.roles_id = r.id
LEFT JOIN department d ON r.department_id = d.id
SET e.manager = CONCAT(m.first_name, ' ', m.last_name),
    e.title = r.title,
    e.salary = r.salary,
    e.department = d.department;

