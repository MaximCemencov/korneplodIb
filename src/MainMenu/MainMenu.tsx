import React, { useState } from 'react';
import axios from 'axios';

const MainMenu = () => {
    // Создаем состояния для каждого поля
    const [direction, setDirection] = useState('');
    const [date, setDate] = useState('');
    const [wagonType, setWagonType] = useState('');
    const [seatCount, setSeatCount] = useState(1);
    const [preferences, setPreferences] = useState({
        upper: false,
        lower: false,
        coupe: false,
    });

    const [tickets, setTickets] = useState([]);

    // Функция отправки данных на сервер
    const handleSearchTickets = async () => {
        try {
            const response = await axios.post('http://your-server.com/api/tickets', {
                direction,
                date,
                wagonType,
                seatCount,
                preferences,
            });
            setTickets(response.data);
        } catch (error) {
            console.error('Ошибка при поиске билетов:', error);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Бронирование билетов</h1>

            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Выберите направление и параметры поездки</h2>

                {/* Направление */}
                <div className="mb-4">
                    <label className="block text-gray-700">Направление</label>
                    <select
                        value={direction}
                        onChange={(e) => setDirection(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Выберите направление</option>
                        <option value="moscow">Москва</option>
                        <option value="spb">Санкт-Петербург</option>
                        <option value="kazan">Казань</option>
                    </select>
                </div>

                {/* Дата */}
                <div className="mb-4">
                    <label className="block text-gray-700">Дата</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Тип вагона */}
                <div className="mb-4">
                    <label className="block text-gray-700">Тип вагона</label>
                    <select
                        value={wagonType}
                        onChange={(e) => setWagonType(e.target.value)}
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Выберите тип вагона</option>
                        <option value="econom">Плацкарт</option>
                        <option value="business">Купе</option>
                    </select>
                </div>

                {/* Количество мест */}
                <div className="mb-4">
                    <label className="block text-gray-700">Количество мест</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={seatCount}
                        onChange={(e) => setSeatCount(Number(e.target.value))}
                        className="mt-1 w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                {/* Предпочтительные места */}
                <div className="mb-4">
                    <label className="block text-gray-700">Предпочтительные места</label>
                    <div className="flex space-x-4 mt-2">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={preferences.upper}
                                onChange={() =>
                                    setPreferences((prev) => ({ ...prev, upper: !prev.upper }))
                                }
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Верхняя полка</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={preferences.lower}
                                onChange={() =>
                                    setPreferences((prev) => ({ ...prev, lower: !prev.lower }))
                                }
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Нижняя полка</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={preferences.coupe}
                                onChange={() =>
                                    setPreferences((prev) => ({ ...prev, coupe: !prev.coupe }))
                                }
                                className="form-checkbox text-blue-500"
                            />
                            <span className="ml-2 text-gray-700">Купе</span>
                        </label>
                    </div>
                </div>

                {/* Кнопка поиска */}
                <button
                    onClick={handleSearchTickets}
                    className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
                >
                    Найти билеты
                </button>
            </div>

            {/* Список доступных билетов */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Доступные билеты</h2>
                <div className="space-y-4">
                    {tickets.length > 0 ? (
                        tickets.map((ticket: any, index: number) => (
                            <div
                                key={index}
                                className="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-medium">{ticket.trainNumber}</h3>
                                    <p className="text-gray-500">
                                        {ticket.direction}: {ticket.date}
                                    </p>
                                </div>
                                <span className="text-lg font-semibold text-blue-600">
                  {ticket.price} ₽
                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Нет доступных билетов.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainMenu;