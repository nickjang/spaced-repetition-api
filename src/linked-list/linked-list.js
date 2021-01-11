class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let currNode = this.head;
      while (currNode.next !== null)
        currNode = currNode.next;
      currNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, key) {
    if (this.head.value === key) {
      this.insertFirst(item);
    } else {
      let prevNode = this.head;
      let currNode = this.head.next;
      while (currNode) {
        if (currNode.value === key) {
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        } else {
          prevNode = currNode;
          currNode = currNode.next;
        }
      }
    }
  }

  insertAfter(item, key) {
    let currNode = this.head;
    while (currNode) {
      if (currNode.value === key) {
        const node = new _Node(item, currNode.next);
        currNode.next = node;
        return;
      } else {
        currNode = currNode.next;
      }
    }
  }

  insertAt(item, position) {
    if (position === 0) {
      this.insertFirst(item);
    } else {
      let prevNode = this.head;
      let currNode = this.head.next;
      let idx = 1;
      while (currNode) {
        if (idx === position) {
          // update next values of previous word and word to insert before inserting
          prevNode.value.next = item.id;
          item.next = currNode.value.id;
          const node = new _Node(item, currNode);
          prevNode.next = node;
          return;
        }
        prevNode = currNode;
        currNode = currNode.next;
        idx++;
      }
      // if position is greater than list's length, return last node's value
      prevNode.value.next = item.id;
      item.next = null;
      prevNode.next = new _Node(item, null);
      return;
    }
  }

  find(id) { // modified to find word with id
    let currNode = this.head;
    while (currNode) {
      if (currNode.value.id === id) return currNode;
      currNode = currNode.next;
    }
    return null;
  }

  remove(id) { // modified to compare word ids
    if (!this.head) {
      return;
    } else if (this.head.value.id === id) {
      this.head = this.head.next;
      return;
    }

    let prevNode = this.head;
    let currNode = this.head.next;

    while (currNode) {
      if (currNode.value.id === id) {
        prevNode.next = currNode.next;
        return;
      }
      prevNode = currNode;
      currNode = currNode.next;
    }
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;