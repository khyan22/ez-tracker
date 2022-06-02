const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');
const app = require('../app');

const getAllDepartments = () => {
    const sql = `
        SELECT departments.id, departments.name
        AS departments
        FROM departments
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
        // app.app();
    })
};

const getAllRoles = () => {
    const sql = `
        SELECT roles.id, roles.title AS Title, roles.salary AS Salary, departments.name AS Department
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.table(results);
    })
};

module.exports = {
    getAllDepartments,
    getAllRoles,

};