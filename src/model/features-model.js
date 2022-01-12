import AbstractObservable from '../utils/abstract-observable.js';

export default class FeaturesModel extends AbstractObservable {
  #features = [];

  set features(features) {
    this.#features = features;
  }

  get features() {
    return this.#features;
  }
}
