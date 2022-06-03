INSERT INTO departments (name)
    VALUES 
        ('Managment'),--id:1--
        ('Software Engineers'),--id:2--
        ('Game'),--id:3--
        ('Marketing');--id:4--

INSERT INTO roles (title, salary, department_id)
    VALUES
        ('Software Engineer Manager', '200000', 1),--id:1--
        ('Game Dev Manager', '200000', 1),--id:2--
        ('Marketing Manager', '200000', 1),--id:3--
        ('Back-End Engineer', '150000', 2),--id:4--
        ('Front-End Engineer', '150000', 2),--id:5--
        ('Full-Stack Engineer', '170000', 2),--id:6--
        ('Game Dev', '170000', 3),--id:7--
        ('3D Modeler', '120000', 3),--id:8--
        ('Sound Design', '100000', 3),--id:9--
        ('VFX Artist', '150000', 3),--id:10--
        ('Script Writer', '150000', 3),--id:11--
        ('Marketer', '90000', 4),--id:12--
        ('Junior Marketer', '70000', 4);--id:13--

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