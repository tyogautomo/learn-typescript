class Department {
  // name: string; // you dont need specify public modifier bcs its default
  protected employees: string[] = [];

  constructor(private readonly id: string, private name: string) { }; // if you give a modifier to parameter, it becomes a property
  describe(this: Department) { // this always refer to this class
    console.log(`Department (${this.id}): ${this.name}`);
  };

  addEmployee(employee: string) {
    this.employees.push(employee);
  };

  printEmployeesInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  };
};

class IT extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }
}

class Accounting extends Department {
  private _lastReport: string;

  constructor(id: string, private reports: string[]) {
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
const accounting = new Accounting('d2', []);

const itCopy = { describe: it.describe };

it.describe();
// itCopy.describe(); // this will error compile bcs this not refer to Department, except we add 'name' key on itCopy

it.addEmployee('Dono');
it.addEmployee('Kasino');
// it.employees[2] = 'Dadang'; // this will error compile bcs employees is a private property

it.printEmployeesInfo();

console.log(it);

accounting.addReport('money lose');
accounting.addEmployee('Max');
accounting.addEmployee('Jondo');
accounting.printReports();
accounting.printEmployeesInfo();
console.log(accounting.lastReport);