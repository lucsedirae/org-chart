const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email,  github, role) {
        super(name, id, email, role);
        this.role = "Engineer";
        this.github = github;
        this.getGithub = function () {
            return this.github;
        }
    };
}

module.exports = Engineer;