type Primitives = string | number | boolean;

class DataStorage<T extends Primitives> {
  private data: T[] = [];

  getData() {
    return this.data;
  }

  addData(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }
}

const storage = new DataStorage<string>();

storage.addData('wannabe');
storage.addData('ngepetmania');
storage.addData('babonkece');

storage.removeItem('ngepetmania');

console.log(storage.getData());

// const storage2 = new DataStorage<object>(); // this will error bcs the class type only for primitives type

// const telolet = {
//   sound: 'telolet'
// };
// storage2.addData(telolet);
// storage2.addData({ sound: 'bumbum' });

// storage2.removeItem(telolet); // object is a reference type

// console.log(storage2.getData());
