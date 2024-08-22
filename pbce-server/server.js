const express = require('express')

const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

const Status = {
    0: "submitted",
    1: "delivering",
    2: "delivered",
};


let orders = [
    // {
    //     name: "Ronald Weasley",
    //     phone: "4102925189",
    //     restaurant: "mcdonalds",
    //     tip: 7,
    //     status: Status[0],
    //     orderId: 0,
    // },
    // {
    //     name: "Jon Snow",
    //     phone: "6192342000",
    //     restaurant: "burger king",
    //     tip: 9,
    //     status: Status[0],
    //     orderId: 1,
    // },
    // {
    //     name: "Mike Tomlin",
    //     phone: "8581329999",
    //     restaurant: "olive",
    //     tip: 10,
    //     status: Status[0],
    //     orderId: 2,
    // },
    // {
    //     name: "Bryce Young",
    //     phone: "6194350000",
    //     restaurant: "banhmi",
    //     tip: 8,
    //     status: Status[0],
    //     orderId: 3,
    // },
    // {
    //     name: "Travis Kelce",
    //     phone: "6198334555",
    //     restaurant: "wingstop",
    //     tip: 11,
    //     status: Status[0],
    //     orderId: 4,
    // },
];

app.get('/orders', (req, res) => {
    res.send(orders);
})

app.post('/addOrder', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).send(orders);
})

app.post('/removeOrder', (req, res) => {
    const orderId = req.body.orderId;
    const index = orders.findIndex((order) => order.orderId == orderId);
    if (index > -1) {
        orders.splice(index, 1);
    }
    res.status(200).send(orders);
})

// app.post('/editOrder', (req, res) => {
//     const orderId = req.body.orderId;
//     const newOrder = req.body.newOrder;
//     const index = orders.findIndex((order) => order.orderId == orderId);
//     if (index > -1) {
//         orders[index] = newOrder
//     }
//     res.status(200).send(newOrder);
// })

app.post('/updateOrder', (req, res) => {
    const orderId = req.body.orderId;
    const index = orders.findIndex((order) => order.orderId == orderId);
    if (index > -1) {
        if (orders[index].status == Status[0]) {
            orders[index].status = Status[1];
        } else if (orders[index].status == Status[1]) {
            orders[index].status = Status[2];
        }
    }
    res.status(200).send(orders);
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
