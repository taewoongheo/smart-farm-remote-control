#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>

// WiFi 설정
const char* ssid = "2F 열람 좌석";
const char* password = "knulibrary";

// DHT11 센서
#define DHTPIN 18
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

WebServer server(80);

void setup() {
  Serial.begin(9600);
  Serial.println("안녕하세요");
  
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
  
  String response;
  serializeJson(doc, response);
  
  server.send(200, "application/json", response);
}

void loop() {
  server.handleClient();
  delay(100);
}