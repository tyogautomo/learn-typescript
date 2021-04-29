class DataStorage<T> {
  private data: T[] = [];

  getData() {
    return this.data;
  }

  addData(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
}

const storage = new DataStorage<string>();

storage.addData('wannabe');
storage.addData('ngepetmania');
storage.addData('babonkece');
