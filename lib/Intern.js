const Employee = require("./Employee");
// Intern class definition that inherits from Employee class and exporting the Intern class.
class Intern extends Employee {
    constructor(name,id,email,school){
        super(name,id,email);
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;