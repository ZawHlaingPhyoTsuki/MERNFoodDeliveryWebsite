import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      console.log("URL:", url);
      console.log("Token:", token);
      fetchOrders();
    }
  }, [token]);

  return <div className="my-orders">
    <h2>My Orders</h2>
    <div className="container">
        {data.map((order,index) => {
            return(
                <div className="my-orders-order" key={index}>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item, index) => {
                        // using this we can access the last item of the user order
                        if (index === order.items.length - 1) { 
                            return item.name+ ' x ' + item.quantity
                        } else {
                            return item.name+ ' x ' + item.quantity + ', '
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                    
                </div>
            )
        })}
    </div>
  </div>;
};

export default MyOrders;
