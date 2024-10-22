import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Initializing Stripe with secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from the frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Frontend URL (will be used for success and cancel URLs)

  try {
    // Creating a new order with user ID, items, amount, and address
    const newOrder = new orderModel({
      userId: req.body.userId, // User ID obtained from middleware
      items: req.body.items, // Items in the order
      amount: req.body.amount, // Total amount for the order
      address: req.body.address, // Delivery address
    });

    // Save the new order to the database
    await newOrder.save();

    // Clear the user's cart data after placing the order
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Mapping the items in the order to Stripe's line_items format for payment processing
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: 'inr', // Changed to Thai Baht (THB)
        product_data: {
          name: item.name, // Product name
        },
        unit_amount: item.price * 100 * 80, // Price in Thai Baht (converted to cents)
      },
      quantity: item.quantity, // Quantity of the item
    }));

    // Adding delivery charges as a line item in the order
    line_items.push({
      price_data: {
        currency: 'inr', // Delivery charges in Thai Baht
        product_data: {
          name: "Delivery Charges", // Name for the delivery fee
        },
        unit_amount: 2*100*80, // 2$ for delivery, converted to cents and converted to baht
      },
      quantity: 1, // Fixed quantity for delivery charges
    });

    // Creating a Stripe checkout session with the line items
    const session = await stripe.checkout.sessions.create({
      line_items: line_items, // Items to be charged in the session
      mode: "payment", // Payment mode set to 'payment'
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, // Redirect URL on successful payment
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`, // Redirect URL on canceled payment
    });

    console.log("Stripe session created:", session);
    

    // Sending back the session URL to the frontend to complete the payment
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Order placement failed. Please try again later.",
      });

  }
};

const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if(success==="true") {
      await orderModel.findByIdAndUpdate(orderId, {payment: true});
      res.json({ success: true, message: "Paid" });
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error)
    res.json({success: false, message: "Error"})
  }
}

export { placeOrder, verifyOrder };
