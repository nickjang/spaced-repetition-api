function reverseList(list) {
  if (!list.head || !list.head.next) return list;

  list.head = reverseHelper(list.head);
  return list;
}

function reverseHelper(node, prev = null) {
  if (!node.next) {
    node.next = prev;
    return node;
  }
  let head = reverseHelper(node.next, node);
  node.next = prev;
  return head;
}

function display(list) {
  let str = '';

  if (list.head === null)
    return 'head -> null';
  else {
    str += `(head -> ${list.head.value.id}, ${list.head.value.next})`;

    let currNode = list.head.next;
    while (currNode) {
      str += ` -> ${currNode.value.id}, ${currNode.value.next}`;
      currNode = currNode.next;
    }
    str += ' -> null';
    console.log(str);
  }
}

function getPrevious(list, id) {
  if (!list.head || list.head.value.id === id) return null;
  else {
    let prevNode = list.head;
    while (prevNode.next) {
      if (prevNode.next.value.id === id) return prevNode.value;
      else prevNode = prevNode.next;
    }
  }
}

module.exports = { reverseList, display, getPrevious };