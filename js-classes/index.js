class BaseBuilder {
  constructor(value) {
    this.value = value;
    this.operations = [];
  }

  plus(...values) {
    this.operations.push((current) =>
        values.reduce((acc, cur) => acc + cur, current));
    return this;
  }

  get() {
    for (const operation of this.operations) {
      this.value = operation(this.value);
    }
    this.operations = [];
    return this.value;
  }
}

class IntBuilder extends BaseBuilder {
  constructor(value) {
    super(value);
  }

  minus(...values) {
    this.operations.push((current) =>
        values.reduce((acc, cur) => acc - cur, current)
    );
    return this;
  }

  multiply(n) {
    this.operations.push((current) =>
        current * n
    );
    return this;
  }

  divide(n) {
    this.operations.push((current) =>
        current / n
    );
    return this;
  }

  mod(n) {
    this.operations.push((current) =>
        current % n
    );
    return this;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (from - to + 1) + to);
  }
}


class StringBuilder extends BaseBuilder {
  constructor(value = "") {
    super(value);
  }

  minus(n) {
    this.operations.push((current) => current.slice(0, -n));
    return this;
  }

  multiply(n) {
    this.operations.push((current) => current.repeat(n));
    return this;
  }

  divide(n) {

    this.operations.push((current) => {
          const k = Math.floor(current.length / n);
          return current.substring(0, k);
        }
    );
    return this;
  }

  remove(str) {
    this.operations.push((current) => current.split(str).join(''));
    return this;
  }

  sub(from, n) {
    this.operations.push((current) => current.substring(from, from + n));
    return this;
  }
}
