class CartItem {
	constructor(id,quantity, productPrice, productTitle,productUrl) {
		this.id = id;
		this.quantity = quantity;
		this.url = productUrl;
		this.productPrice = productPrice;
		this.productTitle = productTitle;
	}
}

export default CartItem;
