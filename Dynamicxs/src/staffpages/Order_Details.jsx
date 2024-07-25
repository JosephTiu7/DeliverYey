import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Nav from '../components/Nav';

function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const updateCompletedOrders = (order) => {
    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    completedOrders.push(order);
    localStorage.setItem('completedOrders', JSON.stringify(completedOrders));
    console.log('Updated Completed Orders:', completedOrders);
  };
  
  const handleAcceptOrder = (order) => {
    const updatedOrder = { ...order, status: 'Accepted' };
    setOrders(prevOrders => prevOrders.map(o => o.id === order.id ? updatedOrder : o));
    updateCompletedOrders(updatedOrder);
    navigate("/OrderDetails", { state: order });
  };
  
  const handleRemoveOrder = (orderId) => {
    const orderToRemove = orders.find(order => order.id === orderId);
    const updatedOrder = { ...orderToRemove, status: 'Rejected' };
    updateCompletedOrders(updatedOrder);
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
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

        <div className="flex-grow py-11 shadow-sm">
          <div className="text-2xl font-bold text-center text-black mb-5">Orders</div>
          <div className="flex gap-3 mb-5 justify-center">
            <button onClick={() => navigate("/order_details")} className="px-4 py-3 rounded-lg border-2 border-orange-600 bg-orange-600 text-white">New Orders</button>
          </div>
          <div className="max-w-[984px] mx-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-200 text-orange-600">
                  <th className="px-6 py-3 border border-orange-700">Name</th>
                  <th className="px-6 py-3 border border-orange-700">Contact</th>
                  <th className="px-6 py-3 border border-orange-700">Item Ordered</th>
                  <th className="px-6 py-3 border border-orange-700">Total Items</th>
                  <th className="px-6 py-3 border border-orange-700">Total Price</th>
                  <th className="px-6 py-3 border border-orange-700">Order Date</th>
                  <th className="px-6 py-3 border border-orange-700"></th>
                </tr>
              </thead>
              <tbody>
                {orders.filter(order => order.status === 'Pending').map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 border border-gray-200">{order.name}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.contact}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.item_order}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.totalItems}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.totalPrice}</td>
                    <td className="px-6 py-4 border border-gray-200">{order.orderDate}</td>
                    <td className="px-6 py-4 border border-gray-200">
                      <button onClick={() => handleAcceptOrder(order)} className="px-4 py-2 bg-green-500 text-white rounded">Accept</button>
                      <button onClick={() => handleRemoveOrder(order.id)} className="px-4 py-2 bg-red-500 text-white rounded">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;