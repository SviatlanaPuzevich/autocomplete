class BaseBuilder {
  constructor(value) {
    this.value = value;
  }

  plus(...values) {
    this.value = values.reduce((acc, cur) => acc + cur, this.value);
    return this;
  }

  get() {
    return this.value;
  }
}

class IntBuilder extends BaseBuilder {
  constructor(value) {
    super(value);
  }

  minus(...values) {
    this.value = values.reduce((acc, cur) => acc - cur, this.value);
    return this;
  }

  multiply(n) {
    this.value *= n;
    return this;
  }

  divide(n) {
    this.value /= n;
    return this;
  }

  mod(n) {
    this.value %= n;
    return this;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (from - to + 1) + to);
  }
}

class StringBuilder {
}