import BasketItem from '../models/basket.js'; 
import User from '../models/user.js';
import Product from '../models/product.js';


export const addToBasket = async(req, res) => {
    try {
        const {productId, userId} = req.body;
        const userExists = await User.exists({ _id: userId });
        const productExists = await Product.exists({ _id: productId });
        if (!userExists || !productExists) {
          return res.status(404).json({ message: "User or product not found." });
        }

        let basketItem = await BasketItem.findOne({ userId, productId });
        if (basketItem && basketItem.status === 'in_Cart') {
          basketItem.quantity += 1;
          await basketItem.save();
        } else {
          basketItem = new BasketItem({ userId, productId });
          await basketItem.save();
        }
    
        res.status(200).json({ message: "Item added to basket." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
      }
    };


    export const getFromBasket = async (req, res) => {
      try {
        const userId = req.params.userId;
        const basketItems = await BasketItem.find({ userId }).populate("productId");
        res.status(200).json(basketItems);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
      }
    };

    export const updateOneItemFromBasket = async(req, res) => {
      try {
        const {userId, productId} = req.params;
        await BasketItem.updateOne({ userId, productId, status: "in_cart" }, { status: "purchased" });
        res.status(200).json({ message: "Items purchased." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
      }
    }

    export const updateAllItemFromBasket = async(req, res) => {
      try {
        const {userId} = req.params;
        await BasketItem.updateMany({ userId, status: "in_cart" }, { status: "purchased" });
        res.status(200).json({ message: "Items purchased." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred." });
      }
    }

    export const updateQuantities = async(req, res) => {
      try {
        const { quantity, _id} = req.body;
        const {userId} = req.params;
        await BasketItem.findOneAndUpdate({productId: _id, userId, status: "in_cart"}, { quantity});
      
      } catch(error) {
        console.log(error);
        res.status(500).json({message: "Updated failed"})
      }
    }


    export const deleteItem = async (req, res) => {
      try {
        const {id} = req.params;
        await BasketItem.findByIdAndDelete({_id: id});
        res.status(200).json({message: 'Item is deleted'})
      } catch(e) {
        console.log(e);
        res.status(500).json({message: 'Deleted failed'})
      }
    }