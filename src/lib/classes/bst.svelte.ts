export class BSTNode {
	left: BSTNode | null = $state(null);
	right: BSTNode | null = $state(null);
	value: number;

	constructor(value: number) {
		this.value = value;
	}
}

export class BST {
	root: BSTNode | null = $state(null);

	insert(value: number): BSTNode | Error {
		const newNode = new BSTNode(value);
		if (!this.root) {
			this.root = newNode;
			return this.root;
		}
		return insert(this.root, newNode);
	}

	search(value: number): BSTNode | null {
		return this.root ? search(this.root, value) : null;
	}

	getDepth(): number {
		return this.root ? getDepth(this.root) : 0;
	}

	getNodesAtDepthLeft(depth: number): BSTNode[] {
		return this.root ? getNodesAtDepthLeft(this.root.left, depth) : [];
	}

	getNodesAtDepthRight(depth: number): BSTNode[] {
		return this.root ? getNodesAtDepthLeft(this.root.right, depth) : [];
	}
}

function getNodesAtDepthLeft(node: BSTNode | null, depth: number): BSTNode[] {
	if (!node || depth < 0) {
		return [];
	}
	if (depth === 0) {
		return [node];
	}
	return getNodesAtDepthLeft(node.left, depth - 1).concat(
		getNodesAtDepthLeft(node.right, depth - 1)
	);
}

function getDepth(node: BSTNode | null): number {
	if (!node) {
		return 0;
	}
	return Math.max(getDepth(node.left), getDepth(node.right)) + 1;
}

function insert(node: BSTNode, newNode: BSTNode): BSTNode | Error {
	if (newNode.value == node.value) {
		return new Error('Value already exists');
	}
	if (newNode.value > node.value) {
		if (node.right) {
			return insert(node.right, newNode);
		}
		node.right = newNode;
		return node.right;
	}
	if (node.left) {
		return insert(node.left, newNode);
	}
	node.left = newNode;
	return node.left;
}

function search(node: BSTNode, searchValue: number): BSTNode | null {
	if (searchValue === node.value) {
		return node;
	}
	if (searchValue > node.value) {
		if (node.right) {
			return search(node.right, searchValue);
		}
		return null;
	}
	if (node.left) {
		return search(node.left, searchValue);
	}
	return null;
}

function remove(node: BSTNode, removeValue: number): BSTNode | null {
	if (removeValue === node.value) {
		return node;
	}
	if (removeValue > node.value) {
		if (node.right) {
			return search(node.right, removeValue);
		}
		return null;
	}
	if (node.left) {
		return search(node.left, removeValue);
	}
	return null;
}
