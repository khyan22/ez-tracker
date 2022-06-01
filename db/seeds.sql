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