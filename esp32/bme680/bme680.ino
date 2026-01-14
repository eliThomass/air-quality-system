#include <Wire.h>
// Below 3 are for posting to database
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
// Acts as a .env (with gitignore)
#include "arduino_env.h"

// Pins I used for IC2 Communication with BME
#define I2C_SDA 21
#define I2C_SCL 22

// Networks creds
const char* ssid = NETWORK_SSID;
const char* password = NETWORK_PASS;

// Django endpoint
const char* serverName = SERVERNAME;

Adafruit_BME680 bme;

void setup() {
  Serial.begin(115200);

  if(!bme.begin()) {
    Serial.println("Could not find BME680");
    while(1);
  }

  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    if(!bme.performReading()) return;

    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    // Create JSON
    StaticJsonDocument<200> post_data;
    post_data["temperature"] = bme.temperature;
    post_data["humidity"] = bme.humidity;
    post_data["pressure"] = bme.pressure;
    post_data["gas_resistance"] = bme.gas_resistance;

    String jsonResponse;
    serializeJson(post_data, jsonResponse);

    int httpResponseCode = http.POST(jsonResponse);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    http.end();
  }
  
  // 15 minute delay between readings
  delay(900000);
}

