export const createRolesQuery = `CREATE TYPE roles_type AS ENUM('Manager', 'Developer', 'HR', 'Sales', 'Intern')`

export const createEmployeeDataQuery = `CREATE TABLE employee_data(
ID SERIAL PRIMARY KEY, 
Name VARCHAR(50) NOT NULL, 
Email VARCHAR(50) NOT NULL UNIQUE, 
Age SMALLINT NOT NULL CHECK (Age > 17), 
Salary DECIMAL(8, 2) NOT NULL, 
Roles roles_type NOT NULL
)`

export const addEmployeeValueQuery = `INSERT INTO employee_data(Name, Email, Age, Salary, Roles) 
VALUES($1, $2, $3, $4, COALESCE($5::roles_type)) RETURNING *`

export const getAllEmployeeDataQuery = `SELECT * FROM employee_data`

export const getSpecificEmployeeDataQuery = `SELECT * FROM employee_data WHERE ID = $1` 

export const updateEmployeeDataQuery = `UPDATE employee_data SET 
Name = COALESCE($1, Name), 
Email = COALESCE($2, Email), 
Age = COALESCE($3, Age), 
Salary = COALESCE($4, Salary), 
Roles = COALESCE($5::roles_type, Roles)


WHERE ID = $6 
RETURNING *`

export const deleteEmployeeDataQuery = `DELETE FROM employee_data WHERE ID = $1`
