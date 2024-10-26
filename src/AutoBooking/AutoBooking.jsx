import React, { useState, useEffect } from "react";
import "./AutoBooking.css";

const ticketData = {
    departure: "Москва",
    arrival: "Санкт-Петербург",
    departureDate: "2024-11-20",
    carType: "Купе",
    seatCount: 2,
};

const AutoBooking = () => {
    const [isAutoBookingEnabled, setIsAutoBookingEnabled] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);

    const showMessage = (message, success = true) => {
        setStatusMessage(message);
        setIsSuccess(success);
    };

    const checkAndBookTickets = async () => {
        if (!isAutoBookingEnabled) {
        showMessage("Автоматическое бронирование отключено.");
        return;
        }

        try {
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticketData),
        });

        const availability = await response.json();

        if (availability.seatsAvailable) {
            const bookingResponse = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticketData),
            });

            const bookingResult = await bookingResponse.json();

            if (bookingResult.success) {
            showMessage("Бронирование успешно!", true);
            } else {
            showMessage("Ошибка при бронировании: " + bookingResult.error, false);
            }
        } else {
            showMessage("Места недоступны. Повторная проверка через минуту...", false);
            setTimeout(checkAndBookTickets, 60000);
        }
        } catch (error) {
        showMessage("Ошибка: " + error.message, false);
        }
    };

    const handleStartCheck = () => {
        showMessage("Начинаем проверку...", true);
        checkAndBookTickets();
    };

    return (
            <div className="booking-settings">
                <h1>3 task</h1>
                <h2>Настройки бронирования</h2>
                <label>
                    <input
                    type="checkbox"
                    checked={isAutoBookingEnabled}
                    onChange={() => setIsAutoBookingEnabled(!isAutoBookingEnabled)}
                    />{" "}
                    Включить автоматическое бронирование
                </label>
                <div className="wrapped">
                    <button onClick={handleStartCheck}>
                        Начать проверку доступности мест
                    </button>
                    {statusMessage && (
                        <div className={`statusMessage ${isSuccess ? "success" : "error"}`}>
                            {statusMessage}
                        </div>
                    )}
                </div>
            </div>
    );
};

export default AutoBooking;
