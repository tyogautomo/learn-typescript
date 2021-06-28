// decorator
export function autobind(_: any, __: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value; // get the original method function
  const newDescriptor: PropertyDescriptor = {
    get() {
      return method.bind(this); // bind the method to this
    }
  };
  return newDescriptor;
}
