#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"

Adafruit_BME680 bme; 

void setup() {
  Serial.begin(115200);
  while (!Serial);
  Serial.println(F("BME680 Test"));

  // This internaly calls Wire.begin()
  // We try both common addresses: 0x77 and 0x76
  if (!bme.begin(0x77) && !bme.begin(0x76)) {
    Serial.println(F("Could not find sensor. Check wiring!"));
    while (1);
  }

  // Set up basic gas heater settings
  bme.setGasHeater(320, 150); 
}

void loop() {
  if (!bme.performReading()) {
    Serial.println(F("Failed to perform reading :("));
    return;
  }

  Serial.print(F("Temp: "));
  Serial.print(bme.temperature);
  Serial.println(F(" *C"));

  Serial.print(F("Gas: "));
  Serial.print(bme.gas_resistance / 1000.0);
  Serial.println(F(" KOhms"));

  delay(2000);
}