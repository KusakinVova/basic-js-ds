const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor(){
    this.tree = null;
  }
  
  root() {
    return this.tree;
  }

  add(data) {
    if(!this.tree) this.tree = new Node(data);
    else {
      let branch = this.tree;
      while(branch){
        if(data < branch.data){
          if(branch.left) branch = branch.left;
          else {
            branch.left = new Node(data);
            break;
          }
        } else {
          if(branch.right) branch = branch.right;
          else {
            branch.right = new Node(data);
            break;
          }
        }
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let branch = this.tree;
    while(branch){
      if(branch.data === data) return branch;
      else branch.data > data ? branch = branch.left : branch = branch.right;
    }
    return null;
  }

  remove(data) {
    let node = this.find(data);
    if(node){
      let branch = this.tree;
      while(branch){
        if(branch.data === data){
          this.tree = node.right;
          this.goround(node.left);
          return;
        }

        if(branch.left && branch.left.data === data){
          branch.left = null;
          break;
        }
        else if(branch.right && branch.right.data === data){
          branch.right = null;
          break;
        }
        else {
          branch.data > data ? branch = branch.left : branch = branch.right;
        }

      }
      this.goround(node.right);
      this.goround(node.left);
    }
  }

  goround(node){
    if(!node) return;
    this.add(node.data);
    this.goround(node.right);
    this.goround(node.left);
  }

  min() {
    if(!this.tree) return null;

    let branch = this.tree;
    while(branch.left) branch = branch.left;
    return branch.data;
  }

  max() {
    if(!this.tree) return null;

    let branch = this.tree;
    while(branch.right) branch = branch.right;
    return branch.data;
  }

}