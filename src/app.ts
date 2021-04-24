abstract class Department { // if you have an abstract method, you need to mark the class as abstract
  // name: string; // you dont need specify public modifier bcs its default
  protected employees: string[] = [];
  static fiscalYear = 2021;

  constructor(protected readonly id: string, private name: string) { }; // if you give a modifier to parameter, it becomes a property
  // describe(this: Department) { // this always refer to this class
  //   console.log(`Department (${this.id}): ${this.name}`);
  // };

  abstract describe(this: Department): void; // every class inherit from this class need to implement this method

  addEmployee(employee: string) {
    // console.log(Department.fiscalYear); // if you want access static property on class method, access from the class instead
    this.employees.push(employee);
  };

  printEmployeesInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  };

  static createEmployee(name: string) {
    // console.log(this.fiscalYear, 'from create employee'); // if you're accessing static property from static method, you can use 'this' directly
    return { name };
  }
};

class IT extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }

  describe() {
    console.log(`IT Departement - ID: ${this.id}`);
  }
}

class Accounting extends Department {
  private _lastReport: string;
  private static instance: Accounting;

  private constructor(id: string, private reports: string[]) { //give constructor private makeing it cant make new instance from outside
    super(id, 'Accounting');
    this._lastReport = reports[0];
  }

  get lastReport() {
    if (this._lastReport) {
      return this._lastReport;
    }
    throw new Error('404 last report not found.')
  }

  set lastReport(report: string) {
    if (!report) {
      throw new Error('Please input a valid value');
    }
    this.addReport(report);
  }

  static createInstance() { // singleton pattern logic (only 1 instance exist)
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Accounting('d2', []);
    return this.instance;
  }

  describe() {
    console.log(`Accounting Department - ID: ${this.id}`);
  }

  addEmployee(employee: string) {
    if (employee === 'Max') {
      return;
    }
    this.employees.push(employee);
  }

  addReport(report: string) {
    this.reports.push(report);
    this._lastReport = report;
  }

  printReports() {
    console.log(this.reports);
  }

}

const it = new IT('d1', ['Max']);
// const accounting = new Accounting('d2', []);
const accounting = Accounting.createInstance();
const accounting2 = Accounting.createInstance();
const employee = Department.createEmployee('Toni');

console.log(employee, ' ', Department.fiscalYear);

const itCopy = { describe: it.describe };

it.describe();
accounting.describe();
// itCopy.describe(); // this will error compile bcs this not refer to Department, 
// except we pass 'this' as parameter on describe() and add 'name' key on itCopy object

it.addEmployee('Dono');
it.addEmployee('Kasino');
// it.employees[2] = 'Dadang'; // this will error compile bcs employees is a private property

it.printEmployeesInfo();

console.log(it);
console.log(accounting);
console.log(accounting === accounting2, 'same ???');

accounting.addReport('money lose');
accounting.addEmployee('Max');
accounting.addEmployee('Jondo');
accounting.printReports();
accounting.printEmployeesInfo();
console.log(accounting.lastReport);
accounting.lastReport = 'taeguki';
console.log(accounting.lastReport);

console.log(accounting2); // this will refer to 'accounting' because its a singleton concept/pattern, refer the same reference
