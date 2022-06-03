INSERT INTO departments (name)
    VALUES 
        ('Managment'),
        ('Software Engineers'),
        ('Game'),
        ('Marketing');

INSERT INTO roles (title, salary, department_id)
    VALUES
        ('Software Engineer Manager', '200000', 1),
        ('Game Dev Manager', '200000', 1),
        ('Marketing Manager', '200000', 1),
        ('Back-End Engineer', '150000', 2),
        ('Front-End Engineer', '150000', 2),
        ('Full-Stack Engineer', '170000', 2),
        ('Game Dev', '170000', 3),
        ('3D Modeler', '120000', 3),
        ('Sound Design', '100000', 3),
        ('VFX Artist', '150000', 3),
        ('Script Writer', '150000', 3),
        ('Marketer', '90000', 4),
        ('Junior Marketer', '70000', 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
        ('Leroy', 'Jenkins', 1, null),
        ('Hideo', 'Kojima', 2, null),
        ('Jesus', 'Christ', 3, null),
        ('Erik', 'Klein', 4, 1),
        ('Mike', 'Wazowski', 5, 1),
        ('Mari', 'The Llama', 6, 1),
        ('Gerard', 'Manella', 7, 2),
        ('Angel', 'Rosario', 8, 2),
        ('Joshua', 'Jackson', 9, 2),
        ('Khyan', 'Alvarez', 10, 2),
        ('Syd', 'Writer-Woman', 11, 2),
        ('Dan', 'Povenmire', 12, 3),
        ('John', 'Goodman', 13, 3);