#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>

// WiFi 설정
const char* ssid = "";
const char* password = "";

// DHT11 센서
#define DHTPIN 18
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// 빛 감지 센서
#define LIGHT_SENSOR_PIN 34

// 토양 습도 센서
#define SOILSENSORPIN 33

// LED 모듈
#define LED_PIN 4

// 조도 초기 기준값
int lightThreshold = 50;

WebServer server(80);

void setup() {
  Serial.begin(9600);
  Serial.println("안녕하세요");

  // 빛 감지 센서 핀 설정
  pinMode(LIGHT_SENSOR_PIN, INPUT);

  // LED 모듈 설정
  pinMode(LED_PIN, OUTPUT);
  
  // WiFi 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  
  // DHT11 센서 시작
  dht.begin();
  
  // API 엔드포인트
  server.enableCORS(); // CORS 활성화
  server.on("/api/sensors", HTTP_GET, handleSensorData);
  
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
  
  JsonObject soilData = doc.createNestedObject("soil");
  int soilHumidityValue = analogRead(SOILSENSORPIN);
  soilData["soilHumidity"] = soilHumidityValue;

  String response;
  serializeJson(doc, response);
  
  server.send(200, "application/json", response);
}

// 새로운 핸들러 함수 추가
void handleThreshold() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, body);
    
    if (!error) {
      lightThreshold = doc["lightThreshold"];
      server.send(200, "application/json", "{\"status\":\"success\"}");
    } else {
      server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"Invalid JSON\"}");
    }
  } else {
    server.send(400, "application/json", "{\"status\":\"error\",\"message\":\"No data received\"}");
  }
}

void loop() {
  server.handleClient();

  // LED 제어 로직 추가
  int currentLight = analogRead(LIGHT_SENSOR_PIN);
  int currentLightPercentage = map(currentLight, 0, 4095, 0, 100);
  
  if (currentLightPercentage < lightThreshold) {
    digitalWrite(LED_PIN, HIGH);  // LED 켜기
  } else {
    digitalWrite(LED_PIN, LOW);   // LED 끄기
  }

  delay(100);
}