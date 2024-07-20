

\c employees_db

INSERT INTO departments (name)
VALUES
    ('Sales'),
    ('Accounting'),
    ('Customer Service'),
    ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Regional Manager', 100, 1),
    ('Assistant to the Regional Manager', 99, 1),
    ('Accountant', 101, 2),
    ('Receptionist', 102, 3),
    ('Customer Service Representative', 103, 3),
    ('Human Resources Representative', 104, 4),
    ('Salesperson', 105, 1);
    

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Michael', 'Scott', 1, NULL),
    ('Pam', 'Beasley', 4, 1),
    ('Kelly', 'Kapoor', 3, 1),

    ('Toby', 'Flenderson', 6, NULL),

    ('Angela', 'Martin', 3, 1),
    ('Oscar', 'Martinez', 3, 1),
    ('Kevin', 'Malone', 3, 1),

    ('Dwight', 'Schrute', 2, 1),
    ('Jim', 'Halpert', 7, 1),
    ('Stanley', 'Hudson', 7, 1),
    ('Phyllis', 'Lapin', 7, 1);



