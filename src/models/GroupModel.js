import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import BreweryModel from './BreweryModel';
import BeerModel from './BeerModel';
import theme from 'theme';

export const GROUP_CART_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  DELIVERED: 'delivered',
};

export const GROUP_CART_STATUS_TEXT = {
  [GROUP_CART_STATUS.OPEN]: 'Abierto',
  [GROUP_CART_STATUS.CLOSED]: 'En camino',
  [GROUP_CART_STATUS.DELIVERED]: 'Entregado',
};

export const GROUP_CART_STATUS_COLOR = {
  [GROUP_CART_STATUS.OPEN]: theme.green,
  [GROUP_CART_STATUS.CLOSED]: theme.red,
  [GROUP_CART_STATUS.DELIVERED]: theme.blue,
};

class GroupModel {
  id = null;

  name = '';

  members = [];

  createdBy = null;

  createdAt = null;

  status = GROUP_CART_STATUS.OPEN;

  cart = [];

  breweries = [];

  constructor(id, name, members, createdBy, createdAt, status, cart, breweries, groupService, me) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.status = status;
    this.cart = cart?.map((b) => BeerModel.fromJson(b)) || [];
    this.breweries = breweries.map((b) => BreweryModel.fromJson(b, this.cart, me));
    this.groupService = groupService;
    this.syncCart = _.debounce(this._syncCart, 1000);
    this.me = me;

    makeAutoObservable(this);
  }

  _syncCart = (me) => {
    this.groupService.syncCart(this.id, this.cart, me);
  };

  async addToGroupCart(beer, me) {
    const findBeer = this.cart.find((item) => item.id === `${me.id}-${beer.mainId}`);

    if (!findBeer) {
      beer.add();
      this.cart.push({ ...beer, addedBy: { id: me.id, email: me.email }, id: `${me.id}-${beer.mainId}` });

      console.log('Notificar cerveza agregada');
      this.syncCart(me);
      return;
    }

    if (beer.add()) {
      findBeer.cant = beer.cant;
      this.syncCart(me);
    }
  }

  async removeFromGroupCart(beer, me) {
    const findBeer = this.cart.find((item) => item.id === `${me.id}-${beer.mainId}`);

    if (!findBeer) {
      return;
    }

    if (beer.remove()) {
      if (findBeer.cant <= 0) {
        console.log('Notificar cerveza eliminada');
      }

      findBeer.cant = beer.cant;
      this.syncCart(me);
    }
  }

  setStatus(status) {
    this.status = status;

    this.groupService.changeGroupStatus(this.id, status);

    if (status === GROUP_CART_STATUS.DELIVERED) {
      console.log('Notificar pedido recibido');
    }
  }

  get filteredCart() {
    return this.cart.filter((item) => item.cant > 0);
  }

  get totalItemsCart() {
    return this.cart.reduce((acc, item) => acc + item.cant, 0);
  }

  get totalAmountCart() {
    return this.cart.reduce((acc, item) => acc + item.price * item.cant, 0);
  }

  get canPlaceOrder() {
    return this.totalItemsCart > 0;
  }

  get isMyGroup() {
    return this.createdBy.id === this.me.id;
  }

  static fromJson({ id, name, members, createdBy, createdAt, status, cart = [], breweries = [] }, groupService, me) {
    return new GroupModel(id, name, members, createdBy, createdAt, status, cart, breweries, groupService, me);
  }
}

export default GroupModel;
