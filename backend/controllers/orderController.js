// Import required modules
import express from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Create a new Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173"; // Replace with your actual frontend URL  

// Define the Express router
const orderRouter = express.Router();

// Function to place an order
const placeOrder = async (req, res) => {
  try {
    
    const items = req.body.items;

    const newOrder = new orderModel({
        userId: req.body.userId,
        items: items, 
        amount: req.body.amount,
        address: req.body.address
      });
      
      await newOrder.save();
      
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
      

    // Construct line items for Stripe checkout session
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity
    }));

    // Add delivery charges line item
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2 * 100 * 80
      },
      quantity: 1
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    // Send the session URL to the client
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    // Handle errors
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
      if (success === "true") {
          await orderModel.findByIdAndUpdate(orderId, { payment: true });
          res.json({ success: true, message: "Paid" });
      } else {
          await orderModel.findByIdAndDelete(orderId);
          res.json({ success: false, message: "Not Paid" });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
      const orders = await orderModel.find({ userId: req.body.userId });
      res.json({ success: true, data: orders });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};




export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };  




