# BME680 Air Quality Monitoring System

A air quality system built for my house. Implements a microcontroller to read temperature, humidity, and CO2 levels. The data from the sensor is readable through an active website.

A full-stack IoT application that captures environmental data using an **Arduino Nano ESP32**, stores it in a **MySQL** database via a **Django REST API**, and visualizes real-time trends on a **React** dashboard.
The data is stored on a home server, and the ESP32 provides 24/7 air quality information. Below is a preview of the monitoring website.

![Dashboard Preview](dashboard.png)

## 🚀 Features
* **Real-time Tracking**: Monitor Temperature (°F), Humidity, Pressure, and Gas Resistance (VOCs).
* **Data Visualization**: Four interactive charts built with **Recharts**, featuring "Healthy Range" overlays.
* **Raw Data Access**: Toggle between visual graphs and a raw SQL data table for detailed inspection.
* **Responsive Design**: Fully mobile-friendly dashboard styled with modern CSS Grid and Flexbox.
* **Persistent Storage**: Historical data is logged to a MySQL database for long-term analysis.

---

## 🛠️ Tech Stack

### **Hardware**
* **Microcontroller**: Arduino Nano ESP32
* **Sensor**: BME680 (Temperature, Humidity, Pressure, Gas)
* **Communication**: Wi-Fi (HTTP POST)

### **Software**
* **Frontend**: React (Vite), TypeScript, Recharts
* **Backend**: Django, Django REST Framework
* **Database**: MySQL Workbench
* **Environment**: Neovim (Development Environment)

---

## 📁 Project Structure
```text
.
├── backend/            # Django project settings & configuration
├── sensor_api/         # Django App: Models, Views, and API logic
├── frontend/           # React application (Vite + TSX)
│   ├── src/
│   │   ├── api.ts      # Fetch logic for backend communication
│   │   ├── Dashboard.tsx
│   │   └── Dashboard.css
├── esp32/              # Arduino / C++ source code for Nano ESP32
└── manage.py           # Django entry point
```

---

## 🔧 Setup Instructions

### **1. Backend (Django & MySQL)**
1. Ensure your MySQL server is running and you have created a database (e.g., `air_quality_db`).
2. Create a `.env` file in the `backend/` folder and add your credentials:
   ```env
   DB_NAME=air_quality_db
   DB_USER=root
   DB_PASSWORD=your_password
   ```
3. Install dependencies and run migrations:
   ```bash
   pip install django django-cors-headers mysqlclient
   python manage.py migrate
   python manage.py runserver 0.0.0.0:8000
   ```

### **2. Frontend (React)**
1. Navigate to the `frontend/` folder:
   ```bash
   npm install
   npm run dev
   ```
2. The dashboard will be available at http://localhost:5173.

### **3. Hardware (Arduino)**
1. Open the `esp32/` sketch in the Arduino IDE.
2. Install the necessary libraries: Adafruit_BME680, Adafruit_Sensor.
3. Update the following variables in the code:
   - SSID: Your Wi-Fi name.
   - PASSWORD: Your Wi-Fi password.
   - SERVER_URL: http://<YOUR_IP>:8000/api/sensor/upload/
4. Upload to your Arduino Nano ESP32.
