import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state;

  const handleAccept = () => {
    updateOrderStatus('Accepted');
  };

  const handleReject = () => {
    updateOrderStatus('Rejected');
  };

  const updateOrderStatus = (status) => {
    const updatedOrder = { ...order, status };

    // Update the pending orders list by removing the current order
    let pendingOrders = JSON.parse(localStorage.getItem('pendingOrders')) || [];
    pendingOrders = pendingOrders.filter(o => o.id !== updatedOrder.id);
    localStorage.setItem('pendingOrders', JSON.stringify(pendingOrders));

    // Update the completed orders list
    let completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders = completedOrders.filter(o => o.id !== updatedOrder.id); // Remove any existing entry with the same id
    completedOrders.push(updatedOrder);
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));

    navigate('/Order_Details');
  };

  return (
    <div>
      <Nav />
      <div className="flex">
        <div className="bg-orange-50 h-screen w-60 flex flex-col items-center justify-center">
          <button onClick={() => navigate("/orders")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Orders</button>
          <button onClick={() => navigate("/menu")} className="px-12 py-7 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Menu</button>
          <button onClick={() => navigate("/order_history")} className="px-14 pt-4 pb-2.5 text-2xl bg-orange-200 rounded-xl shadow-sm mb-4">Order History</button>
        </div>

        <div className="flex-grow py-11 bg-amber-100 shadow-sm">
          <div className="text-2xl font-bold text-center text-black mb-5">Order Details</div>
          <div className="flex flex-col items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex items-center gap-4 mb-4">
                <img src="src/image/profile.jpg" alt="Profile" className="h-12 w-12 rounded-full" />
                <div>
                  <h2 className="text-lg font-semibold">{order.name}</h2>
                  <p className="text-gray-600">Thank you!</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <img src={`src/image/${order.item_order}`} alt="Item" className="h-20 w-20 rounded" />
                <div>
                  <h3 className="text-xl font-semibold">{order.totalItems}</h3>
                  <p className="text-red-500">{order.totalPrice} each</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Total Price</p>
                <p className="text-lg font-semibold">{order.totalPrice}</p>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-orange-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </svg>
                  <p>Delivery</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-orange-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </svg>
                  <p>NGE 103</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-orange-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </svg>
                  <p>{order.contact}</p>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
                <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;