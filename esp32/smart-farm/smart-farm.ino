#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <WiFiSecrets.h>

// WiFi 설정
const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;

// DHT11 센서
#define DHTPIN 18
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// 펜 모듈
#define FAN_PIN 15

// 빛 감지 센서
#define LIGHT_SENSOR_PIN 34

// 토양 습도 센서
#define SOILSENSORPIN 33

// LED 모듈
#define LED_PIN 4

// 초기 기준값 설정
int lightThreshold = 50;
int lightRange = 10;
float temperatureThreshold = 25.0;
float tempRange = 10.0;
int humidityThreshold = 60;
int humidityRange = 10;
int soilHumidityThreshold = 500;
int soilHumidityRange = 10;

WebServer server(80);

void setup() {
  Serial.begin(9600);

  // 빛 감지 센서 핀 설정
  pinMode(LIGHT_SENSOR_PIN, INPUT);

  // LED 모듈 설정
  pinMode(LED_PIN, OUTPUT);

  // 펜 모듈 설정
  pinMode(FAN_PIN, OUTPUT);
  
  // WiFi 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  dht.begin();
  
  // API 엔드포인트
  server.enableCORS(); // CORS 활성화
  server.on("/api/sensors", HTTP_GET, handleSensorData);
  server.on("/api/threshold", HTTP_POST, handleThreshold); 
  
  server.begin();
}

void handleSensorData() {
  StaticJsonDocument<200> doc;
  
  // 현재 시간 추가
  doc["timestamp"] = millis();
  
  // DHT11 센서 데이터
  JsonObject dht11Data = doc.createNestedObject("dht11");
  dht11Data["temperature"] = dht.readTemperature();
  dht11Data["humidity"] = dht.readHumidity();

  // 빛 감지 센서 데이터
  JsonObject lightData = doc.createNestedObject("light");
  int lightValue = analogRead(LIGHT_SENSOR_PIN);
  lightData["percentage"] = map(lightValue, 0, 4095, 0, 100);  // 0-4095를 0-100%로 변환
  
  // 토양 센서 데이터
  JsonObject soilData = doc.createNestedObject("soil");
  int soilHumidityValue = analogRead(SOILSENSORPIN);
  soilData["soilHumidity"] = map(soilHumidityValue, 0, 4095, 0, 100);

  String response;
  serializeJson(doc, response);
  
  server.send(200, "application/json", response);
}

void handleThreshold() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    Serial.println("Received body: " + body); // 디버깅 로그 
    
    StaticJsonDocument<400> doc; 
    DeserializationError error = deserializeJson(doc, body);
    
    if (!error) {
      if (doc.containsKey("light")) lightThreshold = doc["light"];
      if (doc.containsKey("lightRange")) lightRange = doc["lightRange"]; 
      if (doc.containsKey("temperature")) temperatureThreshold = doc["temperature"];
      if (doc.containsKey("tempRange")) tempRange = doc["tempRange"];
      if (doc.containsKey("humidity")) humidityThreshold = doc["humidity"];
      if (doc.containsKey("humidityRange")) humidityRange = doc["humidityRange"]; 
      if (doc.containsKey("soilHumidity")) soilHumidityThreshold = doc["soilHumidity"];
      if (doc.containsKey("soilHumidityRange")) soilHumidityRange = doc["soilHumidityRange"]; 
      
      // 성공 응답
      StaticJsonDocument<100> responseDoc;
      responseDoc["status"] = "success";
      responseDoc["message"] = "Thresholds updated successfully";
      
      String responseStr;
      serializeJson(responseDoc, responseStr);
      server.send(200, "application/json", responseStr);
      
      // 디버깅 로그
      Serial.println("Updated thresholds:");
      Serial.println("Light: " + String(lightThreshold) + " (Range: " + String(lightRange) + ")");
      Serial.println("Soil Humidity: " + String(soilHumidityThreshold) + " (Range: " + String(soilHumidityRange) + ")");
      Serial.println("Humidity: " + String(humidityThreshold) + " (Range: " + String(humidityRange) + ")");
    } else {
      // 에러 처리
      Serial.println("JSON parsing error: " + String(error.c_str()));
      StaticJsonDocument<100> responseDoc;
      responseDoc["status"] = "error";
      responseDoc["message"] = String("Invalid JSON: ") + error.c_str();
      
      String responseStr;
      serializeJson(responseDoc, responseStr);
      server.send(400, "application/json", responseStr);
    }
  } else {
    // 데이터가 없는 경우
    StaticJsonDocument<100> responseDoc;
    responseDoc["status"] = "error";
    responseDoc["message"] = "No data received";
    
    String responseStr;
    serializeJson(responseDoc, responseStr);
    server.send(400, "application/json", responseStr);
  }
}

void loop() {
  server.handleClient();

  // 현재 센서값 읽기
  int currentLight = analogRead(LIGHT_SENSOR_PIN);
  int currentLightPercentage = map(currentLight, 0, 4095, 0, 100);
  
  float currentTemperature = dht.readTemperature();
  float currentHumidity = dht.readHumidity();
  
  int currentSoilHumidity = analogRead(SOILSENSORPIN);
  int currentSoilHumidityPercentage = map(currentSoilHumidity, 0, 4095, 0, 100); 
  
  // 조도 제어
  if (currentLightPercentage < (lightThreshold - lightRange)) {
    digitalWrite(LED_PIN, HIGH); 
  } else {
    digitalWrite(LED_PIN, LOW); 
  }
  
  // 토양습도 제어
  if (currentSoilHumidityPercentage < (soilHumidityThreshold - soilHumidityRange)) {
    Serial.println("물펌프 가동: 현재 토양습도(" + String(currentSoilHumidityPercentage) + 
                  "%)가 임계값(" + String(soilHumidityThreshold - soilHumidityRange) + "%)보다 낮습니다");
  }
  
  // 습도 제어
  if (currentHumidity > humidityThreshold) {
    digitalWrite(FAN_PIN, HIGH);
  } else {
    digitalWrite(FAN_PIN, LOW);
  }

  delay(1000);
}