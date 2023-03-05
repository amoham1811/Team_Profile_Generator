const Employee = require("./Employee");

// Engineer class definition which inherits from employee and exporting ofthe Engineer class.
class Engineer extends Employee {
    constructor(name,id,email,github){
        super(name,id,email);
        this.github = github
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;