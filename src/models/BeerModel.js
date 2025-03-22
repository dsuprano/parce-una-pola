import { makeAutoObservable } from 'mobx';

class BeerModel {
  id = null;

  mainId = null;

  name = '';

  brand = '';

  image = '';

  price = 0;

  stock = 0;

  cant = 0;

  addedBy = null;

  constructor(id, mainId, name, brand, image, price, stock, cant, addedBy) {
    this.id = id;
    this.mainId = mainId || id;
    this.name = name;
    this.brand = brand;
    this.image = image;
    this.price = price;
    this.stock = stock;
    this.cant = cant;
    this.addedBy = addedBy;

    makeAutoObservable(this);
  }

  add() {
    if (this.cant >= this.stock) {
      return false;
    }

    this.cant = this.cant + 1;
    return true;
  }

  remove() {
    if (this.cant <= 0) {
      return false;
    }

    this.cant = this.cant - 1;
    return true;
  }

  get totalStock() {
    return this.stock - this.cant;
  }

  get totalPrice() {
    return this.price * this.cant;
  }

  static fromJson({ id, mainId, name, brand, image, price, stock, cant, addedBy = null }) {
    return new BeerModel(id, mainId, name, brand, image, price, stock, cant, addedBy);
  }
}

export default BeerModel;
