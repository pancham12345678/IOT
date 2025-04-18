const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('products.db');

const sampleProducts = [
  {
    name: "Smart LED Bulb",
    price: 29.99,
    image: "https://th.bing.com/th/id/OIP.x58WLz8rv-1N7dk0nUhCWAHaHa?w=229&h=190&c=7&r=0&o=5&dpr=1.9&pid=1.7",
    stock_count: 50,
    category: "Electronics"
  },
  {
    name: "WiFi Security Camera",
    price: 79.99,
    image: "https://th.bing.com/th/id/R.e65fb7e6394e5619fde08d4deffd0048?rik=Vnjzth3HNxhLEw&riu=http%3a%2f%2fwww.eneltec-led.com%2fLED-Lighting-Blog%2fwp-content%2fuploads%2f2013%2f10%2fled-bulb.jpg&ehk=dCFzwOw5G8KidJYxF0Ipcj%2f1brR1%2baaRlCzzjVMamys%3d&risl=&pid=ImgRaw&r=0",
    stock_count: 30,
    category: "Electronics"
  },
  {
    name: "Smart Thermostat",
    price: 199.99,
    image: "https://example.com/thermostat.jpg",
    stock_count: 25,
    category: "Home & Garden"
  },
  {
    name: "Smart Door Lock",
    price: 159.99,
    image: "https://example.com/door-lock.jpg",
    stock_count: 15,
    category: "Home & Garden"
  },
  {
    name: "IoT Development Kit",
    price: 89.99,
    image: "https://example.com/dev-kit.jpg",
    stock_count: 40,
    category: "Electronics"
  }
];

db.serialize(() => {
  // Clear existing products
  db.run("DELETE FROM products");

  // Insert sample products
  const stmt = db.prepare("INSERT INTO products (name, price, image, stock_count, category) VALUES (?, ?, ?, ?, ?)");
  
  sampleProducts.forEach(product => {
    stmt.run(product.name, product.price, product.image, product.stock_count, product.category);
  });

  stmt.finalize();

  console.log("Database seeded successfully!");
});

db.close();