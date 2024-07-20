const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    network: 5432,
    database: 'employees_db'
});

function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"],
            name: 'action'
        },

    ]).then(answers => {
        if (answers.action === "View Departments") {
            viewDepartments();
        }
        else if (answers.action === "View Roles") {
            viewRoles();
        }
        else if (answers.action === "View Employees") {
            viewEmployees();
        }
        else if (answers.action === "Add Department") {
            addDepartment();
        }
        else if (answers.action === "Add Role") {
            addRole();
        }
        else if (answers.action === "Add Employee") {
            addEmployee();
        }
        else if (answers.action === "Update Employeer Role") {
            updateEmployeeRole();
        }
    });
};


function viewDepartments() {
    pool.query("SELECT * FROM departments", (err, res) => {
        if (err) throw err

        console.log(res.rows)
        init();
    });
};

function viewRoles() {
    pool.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err

        console.log(res.rows)
        init();
    });
};

function viewEmployees() {
    pool.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err

        console.log(res.rows)
        init();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the department you would like to add?",
            name: 'new_department'
        }
    ])
    .then (response => {
        pool.query(`INSERT INTO departments (name) VALUES ($1)`, [response.new_department], (err, res) => {
            if (err) throw err
    
            console.log(res.rows)
            init();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the name of the role you would like to add?",
            name: 'new_role'
        },
        {
            type: 'input',
            message: "What is the salary for the new role?",
            name: 'new_salary'
        },
        {
            type: 'input',
            message: 'What is the department ID?',
            name: 'new_dept_id'
        }
    ])
    .then (response => {
        pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`, [response.new_role, response.new_salary, response.new_dept_id], (err, res) => {
            if (err) throw err
    
            console.log(res.rows)
            init();
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the first name of the employee you would like to add?",
            name: 'new_fn'
        },
        {
            type: 'input',
            message: "What is the last name?",
            name: 'new_ln'
        },
        {
            type: 'input',
            message: 'What is the role ID?',
            name: 'new_role_id'
        },
        {
            type: 'input',
            message: 'What is the manager ID?',
            name: 'new_manager_id'
        }
    ])
    .then (response => {
        pool.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [response.new_fn, response.new_ln, response.new_role_id, response.new_manager_id], (err, res) => {
            if (err) throw err
    
            console.log(res.rows)
            init();
        });
    });
};

function updateEmployeeRole() {
    pool.query("SELECT * FROM employees", (err, res) => {
        if (err) throw err

        const employeeList = result.rows.map((employees) => ({
            value: employees.id,
            name: `${employees.first_name} ${employees.last_name}`,
    }))
})

    pool.query('SELECT * FROM roles', function (err, result) {
        if (err) {
            console.error(err)
        }
        const roleList = result.rows.map((roles) => ({
            value: roles.id,
            name: roles.title

        }))
    })

    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update?',
            choices: employeeList
        },
        {
            type: 'list',
            message: 'What is the new role?',
            choices: roleList
        }
    ])
    .then (response => {
        pool.query(`UPDATE employees SET role_id = $1 WHERE id = $2`, [response.role, response.employees],(err, res) => {
            if (err) throw err
    
            console.log(res.rows)
            init();
        });
    });
};

pool.connect();

init();

app.listen(PORT, () => {
    console.log('success');
})


