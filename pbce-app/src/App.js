import "./styles.css";
import * as React from "react";
import axios from 'axios';

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
  2: "delivered",
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
  
  const [orderList, setOrderList] = React.useState([])
  const [orderId, setOrderId] = React.useState(120);


  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('https://safe-chamber-28420-2e8556f993b6.herokuapp.com/orders');
        console.log(response);
        setOrderList(response);
        if(response.length > 0){
          setOrderId(response[response.length - 1].orderId + 1)
        }
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  }, [])

  // React.useState([
  //   {
  //     name: "Ronald Weasley",
  //     phone: "4102925189",
  //     restaurant: "mcdonalds",
  //     tip: 7,
  //     status: Status[0],
  //     orderId: 0,
  //   },
  //   {
  //     name: "Jon Snow",
  //     phone: "6192342000",
  //     restaurant: "burger king",
  //     tip: 9,
  //     status: Status[0],
  //     orderId: 1,
  //   },
  //   {
  //     name: "Mike Tomlin",
  //     phone: "8581329999",
  //     restaurant: "olive",
  //     tip: 10,
  //     status: Status[0],
  //     orderId: 2,
  //   },
  //   {
  //     name: "Bryce Young",
  //     phone: "6194350000",
  //     restaurant: "banhmi",
  //     tip: 8,
  //     status: Status[0],
  //     orderId: 3,
  //   },
  //   {
  //     name: "Travis Kelce",
  //     phone: "6198334555",
  //     restaurant: "wingstop",
  //     tip: 11,
  //     status: Status[0],
  //     orderId: 4,
  //   },
  // ]);

  // React.useEffect(() => {
  //   const sortedTasks = moveDoneToEnd(orderList);
  //   setOrderList(sortedTasks);
  // }, [orderList]);

  let submitOrder = () => {
    // let oldOrderList = orderList.slice();
    // oldOrderList.push({
    //   orderId: orderId,
    //   name: name,
    //   phone: phone,
    //   restaurant: restaurant,
    //   tip: tip,
    //   status: Status[0],
    // });
    // console.log(oldOrderList);
    // setOrderList(moveDoneToEnd(sortByTip(oldOrderList)));


    const addOrder = async () => {
      try {
        const { data: response } = await axios.post('https://safe-chamber-28420-2e8556f993b6.herokuapp.com/addOrder',
          {
            orderId: orderId,
            name: name,
            phone: phone,
            restaurant: restaurant,
            tip: tip,
            status: Status[0],
            time: new Date().toLocaleTimeString()
          }
        );
        console.log(response);
        setOrderList(moveDoneToEnd(sortByTip(response)));
      } catch (error) {
        console.error(error)
      }
    };

    addOrder();

    setOrderId(orderId + 1);
  };

  let deleteOrder = (orderId) => {
    // let oldOrderList = orderList.slice();
    // let foundIndex = orderList.findIndex((row) => row.orderId == orderId);
    // oldOrderList.splice(foundIndex, 1);
    // setOrderList(oldOrderList);

    const removeOrder = async () => {
      try {
        const { data: response } = await axios.post('https://safe-chamber-28420-2e8556f993b6.herokuapp.com/removeOrder',
          { orderId: orderId }
        );
        console.log(response);
        setOrderList(moveDoneToEnd(sortByTip(response)));
      } catch (error) {
        console.error(error)
      }
    };

    removeOrder();


  };
  let updateOrder = (orderId) => {
    // let oldOrderList = orderList.slice();
    // let foundIndex = orderList.findIndex((row) => row.orderId == orderId);
    // console.log(foundIndex);
    // console.log(oldOrderList[foundIndex]);
    // if (oldOrderList[foundIndex].status == Status[0]) {
    //   oldOrderList[foundIndex].status = Status[1];
    // } else if (oldOrderList[foundIndex].status == Status[1]) {
    //   oldOrderList[foundIndex].status = Status[2];
    // }
    // setOrderList(oldOrderList);
    const updateStatus = async () => {
      try {
        const { data: response } = await axios.post('https://safe-chamber-28420-2e8556f993b6.herokuapp.com/updateOrder',
          { orderId: orderId }
        );
        console.log(response);
        setOrderList(moveDoneToEnd(sortByTip(response)));
      } catch (error) {
        console.error(error)
      }
    };
    updateStatus()


  };

  return (
    <div style={{ marginLeft: '30px' }} className="App">
      <h2 style={{ marginBottom: "20px", textAlign: "left", color: "#457EC0" }}>
        PB Cheap Eats
      </h2>
      <h5 style={{ marginBottom: "20px", textAlign: "left" }}>
        No fees, no delivery charges, just pay a minimum $5 tip.
      </h5>
      <form>
        <div style={{ textAlign: "left" }}>
          <label>
            Name:
            <input
              style={{ marginLeft: "38px", width: "30%" }}
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
              pattern="\d*"
              style={{ marginLeft: "34px", width: "30%" }}
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
              style={{ marginLeft: "2px", width: "30%" }}
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
              style={{ width: "30%", marginLeft: "59px" }}
              type="number"
              pattern="\d*"
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
              color: "white",
              fontWeight: "500",
              backgroundColor: "green",
              webkitBorderRadius: "5px",
              borderRadius: "5px",
            }}
            onClick={(e) => {
              e.preventDefault();
              submitOrder();
              return;
            }}
          />
        </div>
      </form>

      <h5 style={{ textAlign: "left", marginTop: "20px" }}>
        We will call you to obtain your order details.
      </h5>
      <h5 style={{ textAlign: "left", marginTop: "-15px" }}>
        Orders are prioritized by tip amount.
      </h5>    
      <h5 style={{ textAlign: "left", marginTop: "-15px" }}>
        Orders over $50 will require up-front payment.
      </h5>
      <h5 style={{ textAlign: "left", marginTop: "-15px" }}>
        Cash or Venmo only.
      </h5>


      <h3 style={{ marginBottom: "10px", marginLeft:"50px", textAlign: "left", color: "#457EC0" }}>
        Current Orders
      </h3>
      <table style={{ marginTop: "10px" }}>
        <tr>
          <th style={{ width: "75px" }}>Order ID</th>
          <th style={{ width: "75px" }}>Tip</th>
          <th style={{ width: "100px" }}>Status</th>
          {getQueryStringValue("isPro") == "ogChristian" ? <th> Delete </th> : <></>}
          {getQueryStringValue("isPro") == "ogChristian" ? <th> Update </th> : <></>}
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
            {getQueryStringValue("isPro") == "ogChristian" ? (
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
            {getQueryStringValue("isPro") == "ogChristian" ? (
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

      {getQueryStringValue("isPro") == "ogChristian" ? (
        <table style={{ marginTop: "10px" }}>
          <tr>
            <th style={{ width: "125px" }}>Time</th>
            <th style={{ width: "75px" }}>Order ID</th>
            <th style={{ width: "75px" }}>Tip</th>
            <th style={{ width: "150px" }}>Name</th>
            <th style={{ width: "75px" }}>Phone</th>
            <th style={{ width: "125px" }}>Restaurant</th>
            

            {/* {true ? <th> Delete </th> : <></>}
          {true ? <th> Update </th> : <></>} */}
          </tr>
          {orderList.map((order) => (
            <tr>
              <td>{order.time}</td>
              <td>{order.orderId}</td>

              <td>{order.tip}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.restaurant}</td>
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
