import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import BeerModel from './BeerModel';

class BreweryModel {
  id = null;

  title = '';

  latitude = 0;

  longitude = 0;

  data = [];

  constructor(id, title, latitude, longitude, data, cart, me) {
    this.id = id;
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;

    const cartFiltered = cart.filter((c) => c.addedBy.id === me.id);
    const parsedData = data.map((d) => BeerModel.fromJson(d));
    const mergeData = _.unionBy(cartFiltered, parsedData, 'mainId');

    this.data = mergeData;

    makeAutoObservable(this);
  }

  static fromJson({ id, title, latitude, longitude, data = [] }, cart, me) {
    return new BreweryModel(id, title, latitude, longitude, data, cart, me);
  }
}

export default BreweryModel;
