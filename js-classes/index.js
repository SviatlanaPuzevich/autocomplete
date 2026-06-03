function BaseBuilder (value) {
  this.value = value;
  this.operations = [];

  this.plus = function(...values) {
    this.operations.push((current) =>
        values.reduce((acc, cur) => acc + cur, current));
    return this;
  }

  this.get = function() {
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


function StringBuilder (value = "") {

  BaseBuilder.call(this, value);

  this.minus = function(n) {
    this.operations.push((current) => current.slice(0, -n));
    return this;
  }

  this.multiply = function(n) {
    this.operations.push((current) => current.repeat(n));
    return this;
  }

  this.divide = function(n) {
    this.operations.push((current) => {
          const k = Math.floor(current.length / n);
          return current.substring(0, k);
        }
    );
    return this;
  }

  this.remove = function (str) {
    this.operations.push((current) => current.split(str).join(''));
    return this;
  }

  this.sub = function(from, n) {
    this.operations.push((current) => current.substring(from, from + n));
    return this;
  }
}
