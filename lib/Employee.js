
class Employee {

    constructor(name, email) {
        this.name = name;
        Employee.lastId++;
        this.id = Employee.lastId;
        this.email = email;
    }
}

Employee.lastId = 0;



module.exports = Employee;