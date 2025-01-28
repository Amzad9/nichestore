import express from 'express';

import { asyncHandler } from '../utils/asyncHandler.js';
import cartModel from '../models/cart.madel.js';
import productModel from '../models/product.model.js';


const cartCreate = asyncHandler(async (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        const product = await productModel.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = new cartModel({ user: userId, items: [] }); // Ensure userId is passed here
        }

        const existingItem = cart.items.find(item => item.product.equals(productId));

        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price = product.price * existingItem.quantity;
        } else {
            cart.items.push({
                product: productId,
                title: product.title,
                quantity,
                image: product.image,
                price: product.price * quantity,
            });
        }

        cart.totalQuantity += quantity;
        cart.totalPrice += product.price * quantity;

        await cart.save();

        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


const fetchCart = asyncHandler(async (req, res) => {
    try {
        const cart = await cartModel.find().populate('items.product');

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


const fetchCartByID = asyncHandler(async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.params.userId }).populate('items.product');
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { itemId, quantity } = req.body;
    try {
        const id = req.params.id
        const cartId = id
        const findcatId = await cartModel.findById(id);
        console.log({ findcatId })
        const cart = await cartModel.findOneAndUpdate(
            { _id: cartId, 'items._id': itemId },
            {
                $set: {
                    'items.$.quantity': quantity,  // Update the quantity of the specific item
                    'updatedAt': Date.now()  // Optionally update the cart's `updatedAt` timestamp
                }
            },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart or item not found" });
        }

        // Optionally recalculate total quantity and price
        cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item quantity", error });
    }
});


export { cartCreate, fetchCartByID, fetchCart, updateCartItemQuantity };
