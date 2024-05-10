const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vaulttec_db'
  });

console.log(`                                                                                                     
▓▓▓▓    ▓▓▓▓ ▓▓▓▓▓    ▓▓▓▓  ▓▓▓▓  ▓▓▓  ▒▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓ ▓▓▓▓▓▓▓   ░▓▓▓▓▓▓         
 ▓▓▓▓  ▓▓▓▓  ▓▓▓▓▓    ▓▓▓▓  ▓▓▓▓  ▓▓▓     ▓▓▓░          ▓▓▓▓    ▓▓▓▓     ▓▓▓▓▒  ▓         
 ▒▓▓▓  ▓▓▓▒ ▓▓▓▓▓▓▒   ▓▓▓▓  ▓▓▓▓  ▓▓▓     ▓▓▓▒          ▓▓▓▓    ▓▓▓▓    ▓▓▓▓              
  ▓▓▓▓▓▓▓▓  ▓▓▓ ▓▓▓   ▓▓▓▓  ▓▓▓▓  ▓▓▓▒    ▓▓▓▒  ▓▓▓▓▓▓   ▓▓▓    ▓▓▓▓▓▓▒ ▓▓▓▓              
   ▓▓▓▓▓▓▓ ▓▓▓▓ ▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▓    ▓▓▓▒  ▓▓▓▓▓▓   ▓▓▓    ▓▓▓▓▒▒▒ ▓▓▓▓              
   ▓▓▓▓▓▓  ▓▓▓▓▓▓▓▓▓  ▓▓▓▓  ▓▓▓▓  ▓▓▓▒    ▓▓▓▒           ▓▓▓    ▓▓▓▓    ▒▓▓▓▓             
    ▓▓▓▓  ▓▓▓▓▓▓▓▓▓▓░ ▓▓▓▓▓▓▓▓▓▒  ▓▓▓▓▓▓▓ ▓▓▓▒           ▓▓▓    ▓▓▓▓▓▓▓  ▒▓▓▓▓▓▓▓         
    ▒▓▓▓  ▓▓▓░   ▓▓▓▓  ▒▓▓▓▓▓▓    ▓▓▓▓▓▓▒ ▓▓▓▒           ▓▓▓    ▓▓▓▓▓▓▓     ░▓▓▓▓         
                                                                                          
                                   ▒▓▓▓▓▓▓▓▓▓▓                                            
                               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒                                        
                            ░▓▓▓▓▓▓▓         ░▓▓▓▓▓▓                                      
       ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░                
       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ▒▒▓▓▓▒       ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░                
                         ▓▓▓▓     ▒▓▓▓▓▓▓▓▓▓▓▓      ▓▓▓▓                                  
                        ▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ▓▓▓▓▒                                 
░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░▓▓▓▓     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓▓▓▓░░░░░░░░░░░░░░▒▒▒▒▒▒▒ 
                        ▓▓▓▓     ░▓▓▓▓▓▓▓▓▓▓▓▓▓     ▓▓▓▓                                  
         ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  
      ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓               
          ▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓              ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                   
                             ▒▓▓▓▓▓▓▓▒░░░░░░▓▓▓▓▓▓▓                                       
                                ░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                         
                                      ▓▓▒▓▓                                               `);



connection.connect(function (err) {
   if (err) throw err;
   console.log(`WELCOME TO VAULT-TEC EMPLOYEE MANAGER.`);
   promptUser();
});

const promptUser = () => {
   inquirer
     .prompt([
       {
         type: 'list',
         message: 'Options:',
         name: 'options',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
       },
     ])
 
     .then((choices) => {
 
       if (choices.options === 'View all departments') {
         getDepartments();
       }
       if (choices.options === 'View all roles') {
         getAllRoles();
       }
       if (choices.options === 'View all employees') {
         getAllEmployees();
       }
       if (choices.options === 'Add a department') {
         addDepartment();
       }
       if (choices.options === 'Add a role') {
         addRole();
       }
       if (choices.options === 'Add an employee') {
         addEmployee();
       }
       if (choices.options === 'Update an employee role') {
         updateEmployee();
       }
     });
 };
 

const getDepartments = () => {
   let sql = 'SELECT * FROM department';
   connection.query(sql, (err, result) => {
     if (err) throw err;
     console.table(result);
     promptUser();
   });
}

const getAllRoles = () => {
   let sql = `SELECT 
   id,
   title,
   salary,
   department
FROM 
   roles`;
   connection.query(sql, (err, result) => {
     if (err) throw err;
     console.table(result);
     promptUser();
   });
}

const getAllEmployees = () => {
   let sql = `SELECT 
      id,
      first_name,
      last_name,
      manager,
      title,
      salary,
      department
   FROM 
      employee`;
   connection.query(sql, (err, result) => {
     if (err) throw err;
     console.table(result);
     promptUser();
   });
}

const addDepartment = () => {
   inquirer
     .prompt([
       {
         name: 'newDepartment',
         type: 'input',
         message: 'Add new department: ',
       }
     ])
     .then((answer) => {
       let sql = 'INSERT INTO department (department) VALUES (?)';
       connection.query(sql, answer.newDepartment, (err, res) => {
         if (err) throw err;
         console.table(answer.newDepartment + ' department created.');
         getDepartments();
       });
     });
 };

 const addRole = () => {
   connection.query('SELECT * FROM department', (err, departments) => {
       if (err) throw err;

       const departmentChoices = departments.map(department => {
           return {
               name: department.department,
               value: department.id
           };
       });

       inquirer
           .prompt([
            {
              name: 'department',
              type: 'list',
              message: 'Select the department for the new role:',
              choices: departmentChoices
          },
               {
                   name: 'newRole',
                   type: 'input',
                   message: 'Add new role: ',
               },
               {
                   name: 'salary',
                   type: 'input',
                   message: 'Enter salary for new role: ',
                   validate: function (value) {
                       const isValid = /^\d+$/.test(value);
                       if (isValid) {
                           return true;
                       } else {
                           return 'Please enter a valid salary (numbers only).';
                       }
                   }
               }
           ])
           .then((answer) => {
               let sql = 'INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)';
               let addRole = [answer.newRole, answer.department, answer.salary];
               connection.query(sql, addRole, (err, res) => {
                   if (err) throw err;
                   console.log(answer.newRole + ' role created with a salary of $' + answer.salary + ' in the ' + departments.find(dep => dep.id === answer.department).department + ' department');

                   connection.query('UPDATE roles r LEFT JOIN department d ON r.department_id = d.id SET r.department = d.department', (err, result) => {
                       if (err) throw err;
                       getAllRoles(); 
                   });
               });
           });
   });
};


const addEmployee = () => {
  connection.query('SELECT * FROM roles', (err, roles) => {
      if (err) throw err;

      const roleChoices = roles.map(role => {
          return {
              name: role.title,
              value: role.id
          };
      });

      connection.query('SELECT * FROM employee', (err, employees) => {
          if (err) throw err;

          const managerChoices = employees.map(employee => {
              return {
                  name: employee.first_name + ' ' + employee.last_name,
                  value: employee.id
              };
          });

          inquirer
              .prompt([
                {
                    name: 'newEmployeeFirst',
                    type: 'input',
                    message: 'Enter new employee first name: ',
                },
                {
                    name: 'newEmployeeLast',
                    type: 'input',
                    message: 'Enter new employee last name: '
                },
                  {
                      name: 'role',
                      type: 'list',
                      message: 'Select the role for the new employee:',
                      choices: roleChoices
                  },
                  {
                      name: 'manager',
                      type: 'list',
                      message: 'Select the manager for the new employee:',
                      choices: managerChoices
                  }
              ])
              .then((answer) => {
                  let sql = 'INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)';
                  let addNewEmployee = [answer.newEmployeeFirst, answer.newEmployeeLast, answer.role, answer.manager];
                  connection.query(sql, addNewEmployee, (err, res) => {
                      if (err) throw err;
                      console.log(answer.newEmployeeFirst + ' ' + answer.newEmployeeLast + ' added as a new employee with the role ' + roles.find(role => role.id === answer.role).title + ' and manager ' + employees.find(employee => employee.id === answer.manager).first_name + ' ' + employees.find(employee => employee.id === answer.manager).last_name);

                    
                      connection.query(`
                          UPDATE employee e
                          LEFT JOIN employee m ON e.manager_id = m.id
                          LEFT JOIN roles r ON e.roles_id = r.id
                          LEFT JOIN department d ON r.department_id = d.id
                          SET e.manager = CONCAT(m.first_name, ' ', m.last_name),
                              e.title = r.title,
                              e.salary = r.salary,
                              e.department = d.department
                      `, (err, result) => {
                          if (err) throw err;
                          console.log('Employee information updated successfully.');
                          getAllEmployees();
                      });
                  });
              });
      });
  });
};

const updateEmployee = () => {
  let sql = 'SELECT * FROM employee';
  let employeesNames = [];
  let allEmployees;
  let allRoles;

  connection.query(sql, (err, res) => {
      allEmployees = res;
      if (err) throw err;
      allEmployees.forEach((employee) => {
          employeesNames.push({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
          });
      });

      let sql = 'SELECT roles.id, roles.title FROM roles';
      connection.query(sql, (err, res) => {
          if (err) throw err;
          let chooseRoles = [];
          allRoles = res;
          allRoles.forEach((role) => {
              chooseRoles.push({
                  name: role.title,
                  value: role.id
              });
          });

          inquirer
              .prompt([
                  {
                      name: 'chosenName',
                      type: 'list',
                      message: 'Which employee would you like to update?',
                      choices: employeesNames
                  },
                  {
                      name: 'chosenRole',
                      type: 'list',
                      message: 'Choose the employee\'s new role:',
                      choices: chooseRoles
                  },
                  {
                      name: 'chosenManager',
                      type: 'list',
                      message: 'Choose the employee\'s new manager:',
                      choices: employeesNames
                  }
              ])
              .then((answer) => {
                  let newRoleId = answer.chosenRole;
                  let newManagerId = answer.chosenManager;

                  let sql = 'UPDATE employee SET roles_id = ?, manager_id = ? WHERE id = ?';
                  connection.query(sql, [newRoleId, newManagerId, answer.chosenName], (err, res) => {
                      if (err) throw err;
                      console.log(`${allEmployees.find(employee => employee.id === answer.chosenName).first_name} ${allEmployees.find(employee => employee.id === answer.chosenName).last_name}'s role and manager updated.`);

                      connection.query(`
                          UPDATE employee e
                          LEFT JOIN employee m ON e.manager_id = m.id
                          LEFT JOIN roles r ON e.roles_id = r.id
                          LEFT JOIN department d ON r.department_id = d.id
                          SET e.manager = CONCAT(m.first_name, ' ', m.last_name),
                              e.title = r.title,
                              e.salary = r.salary,
                              e.department = d.department
                      `, (err, result) => {
                          if (err) throw err;
                          console.log('Employee information updated successfully.');
                          getAllEmployees();
                      });
                  });
              });
      });
  });
};


