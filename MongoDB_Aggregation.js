
// Step 1: Insert only the sample from your question (Store A)
db.sales.insertMany([
  {
    _id: ObjectId("66522f4b8e4f5f1a789a1a01"),
    date: ISODate("2024-06-15T00:00:00Z"),
    store: "Store A",
    items: [
      { name: "item1", quantity: 5, price: 10.0 },
      { name: "item2", quantity: 3, price: 20.0 }
    ]
  }
]);

// Step 2: Aggregation pipeline
db.sales.aggregate([
  {
    $unwind: "$items"
  },
  {
    $project: {
      store: 1,
      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
      revenue: { $multiply: ["$items.quantity", "$items.price"] },
      price: "$items.price"
    }
  },
  {
    $group: {
      _id: { store: "$store", month: "$month" },
      totalRevenue: { $sum: "$revenue" },
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: 1
    }
  },
  {
    $sort: { store: 1, month: 1 }
  }
]);

/*The expected output should be something like this:
json:
[
  {
    "store": "Store A",
    "month": "2024-06",
    "totalRevenue": 230.0,
    "averagePrice": 20.0
  }
] */
