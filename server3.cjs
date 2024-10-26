
const express = require("express");
const app = express();
app.use(express.json());

app.post("/api/check-availability", (req, res) => {
  const { departure, arrival, departureDate, carType, seatCount } = req.body;
  const isAvailable = Math.random() > 0.5;  

  res.json({ seatsAvailable: isAvailable });
});

app.post("/api/book-ticket", (req, res) => {
  const { departure, arrival, departureDate, carType, seatCount } = req.body;
  const bookingSuccess = Math.random() > 0.2;  

  if (bookingSuccess) {
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "Ошибка при бронировании." });
  }
});

app.listen(3002, () => console.log("Сервер запущен на порту 3002"));
