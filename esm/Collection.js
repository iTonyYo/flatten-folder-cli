"use strict";

class Collection {
  constructor() {
    return {
      list: [],
      add: function (item) {
        this.list.push(item);
      },
      getAll: function () {
        return this.list;
      }
    };
  }

}

module.exports = Collection;