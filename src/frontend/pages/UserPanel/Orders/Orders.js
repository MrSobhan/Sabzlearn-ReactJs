import React, { useEffect, useState } from "react";

import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  const showOrderDetails = (orderID) => {
      console.log(orderID);
  }

  return (
    <div class="col-9">
      <div class="order">
        <table class="order__table">
          <thead class="order__table-header">
            <tr class="order__table-header-list">
              <th class="order__table-header-item">شناسه</th>
              <th class="order__table-header-item">تاریخ</th>
              <th class="order__table-header-item">وضعیت</th>
              <th class="order__table-header-item">دوره</th>
              <th class="order__table-header-item">مبلغ</th>
              <th class="order__table-header-item">عملیات ها</th>
            </tr>
          </thead>
          <tbody class="order__table-body">
            {orders.map((order, index) => (
              <tr class="order__table-body-list">
                <td class="order__table-body-item">
                  <a href="#" class="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td class="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                <td class="order__table-body-item">تکمیل شده</td>
                <td class="order__table-body-item">
                 {order.course.name}
                </td>
                <td class="order__table-body-item">
                 {order.price}
                </td>
                <td class="order__table-body-item" onClick={() => showOrderDetails(order._id)}>
                  <a class="order__table-body-btn" href="#">
                    نمایش
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
