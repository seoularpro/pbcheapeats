import "./styles.css";
import * as React from "react";

export function getQueryStringValue(key) {
  // Get the query string from the current URL
  const queryString = window.location.search;

  // Create a new URLSearchParams object from the query string
  const searchParams = new URLSearchParams(queryString);

  // Use the get method to retrieve the value for the specified key
  const value = searchParams.get(key);

  return value;
}
const Status = {
  0: "submitted",
  1: "delivering",
  2: "done",
};

function sortByTip(arr) {
  return arr.sort((a, b) => b.tip - a.tip);
}
function moveDoneToEnd(arr) {
  return arr.sort(
    (a, b) =>
      (a.status === Status[2] ? 1 : 0) - (b.status === Status[2] ? 1 : 0)
  );
}

export default function App() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [restaurant, setRestaurant] = React.useState("");
  const [tip, setTip] = React.useState(5);
  const [orderId, setOrderId] = React.useState(5);

  const [orderList, setOrderList] = React.useState([
    {
      name: "aaaaaaaa",
      phone: "1111111111",
      restaurant: "mcdonalds",
      tip: 7,
      status: Status[0],
      orderId: 0,
    },
    {
      name: "bbbbbbb",
      phone: "222222222",
      restaurant: "burger king",
      tip: 9,
      status: Status[0],
      orderId: 1,
    },
    {
      name: "ccccccccc",
      phone: "33333333",
      restaurant: "olive",
      tip: 10,
      status: Status[0],
      orderId: 2,
    },
    {
      name: "dddddddd",
      phone: "444444444",
      restaurant: "banhmi",
      tip: 8,
      status: Status[0],
      orderId: 3,
    },
    {
      name: "eeeeee",
      phone: "555555",
      restaurant: "wingstop",
      tip: 11,
      status: Status[0],
      orderId: 4,
    },
  ]);

  React.useEffect(() => {
    const sortedTasks = moveDoneToEnd(orderList);
    setOrderList(sortedTasks);
  }, [orderList]);

  let submitOrder = () => {
    let oldOrderList = orderList.slice();
    oldOrderList.push({
      orderId: orderId,
      name: name,
      phone: phone,
      restaurant: restaurant,
      tip: tip,
      status: Status[0],
    });
    console.log(oldOrderList);
    setOrderList(moveDoneToEnd(sortByTip(oldOrderList)));
    setOrderId(orderId + 1);
  };

  let deleteOrder = (orderId) => {
    let oldOrderList = orderList.slice();
    let foundIndex = orderList.findIndex((row) => row.orderId == orderId);
    oldOrderList.splice(foundIndex, 1);
    setOrderList(oldOrderList);
  };
  let updateOrder = (orderId) => {
    let oldOrderList = orderList.slice();
    let foundIndex = orderList.findIndex((row) => row.orderId == orderId);
    console.log(foundIndex);
    console.log(oldOrderList[foundIndex]);
    if (oldOrderList[foundIndex].status == Status[0]) {
      oldOrderList[foundIndex].status = Status[1];
    } else if (oldOrderList[foundIndex].status == Status[1]) {
      oldOrderList[foundIndex].status = Status[2];
    }
    setOrderList(oldOrderList);
  };

  return (
    <div className="App">
      <form>
        <div style={{ textAlign: "left" }}>
          <label>
            Name:
            <input
              style={{ marginLeft: "36px", width: "30%" }}
              type="text"
              name="name"
              onChange={function (e) {
                var value = e.target.value;
                setName(value);
              }}
            />
          </label>
        </div>
        <div style={{ textAlign: "left" }}>
          <label>
            Phone:
            <input
              style={{ marginLeft: "32px", width: "30%" }}
              type="text"
              name="phone"
              onChange={function (e) {
                var value = e.target.value;
                setPhone(value);
              }}
            />
          </label>
        </div>
        <div style={{ textAlign: "left" }}>
          <label>
            Restaurant:
            <input
              style={{ width: "30%" }}
              type="text"
              name="restaurant"
              onChange={function (e) {
                var value = e.target.value;
                setRestaurant(value);
              }}
            />
          </label>
        </div>
        <div style={{ textAlign: "left" }}>
          <label>
            Tip:
            <input
              style={{ width: "30%", marginLeft: "57px" }}
              type="text"
              name="restaurant"
              onChange={function (e) {
                var value = e.target.value;
                setTip(value);
              }}
              defaultValue={5}
            />
          </label>
        </div>
        <div
          style={{ textAlign: "left", marginLeft: "40px", marginTop: "20px" }}
        >
          <input
            type="submit"
            value="Submit"
            style={{
              textAlign: "left",
              marginLeft: "4px",
              color: "green",
              fontWeight: "500",
            }}
            onClick={(e) => {
              e.preventDefault();
              submitOrder();
              return;
            }}
          />
        </div>
      </form>

      <table style={{ marginTop: "10px" }}>
        <tr>
          <th style={{ width: "75px" }}>Order ID</th>
          <th style={{ width: "75px" }}>Tip</th>
          <th style={{ width: "100px" }}>Status</th>
          {true ? <th> Delete </th> : <></>}
          {true ? <th> Update </th> : <></>}
        </tr>
        {orderList.map((order) => (
          <tr>
            <td>{order.orderId}</td>
            <td>{order.tip}</td>
            <td
              style={
                order.status == Status[0]
                  ? { color: "blue" }
                  : { color: "green" }
              }
            >
              {order.status}
            </td>
            {true ? (
              <td>
                <input
                  type="submit"
                  value="Delete"
                  style={{ color: "red", fontWeight: "500" }}
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOrder(order.orderId);
                    return;
                  }}
                />
              </td>
            ) : (
              <></>
            )}
            {true ? (
              <td>
                <input
                  type="submit"
                  value="Update"
                  style={{ color: "orange", fontWeight: "500" }}
                  onClick={(e) => {
                    e.preventDefault();
                    updateOrder(order.orderId);
                    return;
                  }}
                />
              </td>
            ) : (
              <></>
            )}
          </tr>
        ))}
      </table>

      {true ? (
        <table style={{ marginTop: "10px" }}>
          <tr>
            <th style={{ width: "75px" }}>Order ID</th>
            <th style={{ width: "75px" }}>Name</th>
            <th style={{ width: "75px" }}>Phone</th>
            <th style={{ width: "125px" }}>Restaurant</th>
            <th style={{ width: "75px" }}>Tip</th>
            {/* {true ? <th> Delete </th> : <></>}
          {true ? <th> Update </th> : <></>} */}
          </tr>
          {orderList.map((order) => (
            <tr>
              <td>{order.orderId}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.restaurant}</td>
              <td>{order.tip}</td>
            </tr>
          ))}
        </table>
      ) : (
        <> </>
      )}
    </div>
  );
}

// getQueryStringValue("isPro") == "ogChristian"
