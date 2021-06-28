const PropLogger = (target: any, propertyName: string | Symbol) => {
  console.log('Logging a prop logger...');
  console.log(target, '<<<< this is target class');
  console.log(propertyName, '<<<< this is property name');
}

const AccessorLogger = (target: any, accessorName: string, descriptor: PropertyDescriptor) => {
  console.log('Accessor logger...');
  console.log(target, '<<<< target');
  console.log(accessorName, '<<<< accessorName');
  console.log(descriptor, '<<<< descriptor');
};

const MethodLogger = (target: any, accessorName: string, descriptor: PropertyDescriptor) => {
  console.log('Method logger...');
  console.log(target, '<<<< target');
  console.log(accessorName, '<<<< accessorName');
  console.log(descriptor, '<<<< descriptor');
};

const ParameterLogger = (target: any, methodName: string | symbol, position: number) => {
  console.log('Parameter Logger...');
  console.log(target, '<<<< target');
  console.log(methodName, '<<<< methodName');
  console.log(position, '<<<< position');
}

class Product {
  @PropLogger
  title: string;

  constructor(title: string, private _price: number) {
    this.title = title;
  }

  @AccessorLogger
  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw new Error('not a valid price!');
    }
  }

  @MethodLogger
  getPriceWithTax(@ParameterLogger tax: number) {
    return this._price * (1 + tax);
  }
}

//===================== returning something on method decorator ========================

const AutoBind = (_: any, __: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  const adjustedMethod: PropertyDescriptor = {
    get() {
      return originalMethod.bind(this); // 'this' will refer to the class
    }
  }
  return adjustedMethod;
}

class Printer {
  message = 'This message from Printer';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector('button')!;
// button.addEventListener('click', printer.showMessage.bind(printer)); // you need to bind, becuse 'this' will refer to the event listener callback
button.addEventListener('click', printer.showMessage); // you need to bind, becuse 'this' will refer to the event listener callback
