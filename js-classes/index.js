class BaseBuilder {
  constructor(value) {
    this.value = value;
  }

  plus(...values) {
    this.value = values.reduce((acc, cur) => acc + cur, this.value);
    return this.value;
  }
}

class IntBuilder {

}

class StringBuilder {
}