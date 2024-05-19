const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
    if(!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expire = 3 * 24 * 60 * 60 * 1000;

        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expire)
        });
    }

    next()
}