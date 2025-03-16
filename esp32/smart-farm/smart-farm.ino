#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <FirebaseESP32.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#include "./security/WiFiSecrets.h"
#include "./security/Auth.h"

#define DHTPIN 18 // DHT11 센서
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
#define FAN_PIN 15 // 펜 모듈
#define LIGHT_SENSOR_PIN 34 // 빛 감지 센서
#define LED_PIN 4 // LED 모듈
#define SOILSENSORPIN 33 // 토양 습도 센서
#define HUM_PIN 12 // 가습기 모듈

// Firebase 객체 생성
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;
bool signupOK = false;
unsigned long sendDataPrevMillis = 0;
const int dataInterval = 5000; // 5초마다 데이터 전송

// 초기 기준값 설정
int lightThreshold = 50;
int lightRange = 10;
float temperatureThreshold = 25.0;
float tempRange = 10.0;
int humidityThreshold = 60;
int humidityRange = 10;
int soilHumidityThreshold = 50;
int soilHumidityRange = 10;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("연결 중인 Wi-Fi: ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("Wi-Fi 연결됨");
  Serial.println("IP 주소: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(9600);

  pinMode(LIGHT_SENSOR_PIN, INPUT); // 빛 감지 센서 핀 설정
  pinMode(LED_PIN, OUTPUT); // LED 모듈 설정
  pinMode(FAN_PIN, OUTPUT); // 펜 모듈 설정
  pinMode(HUM_PIN, OUTPUT); // 가습기 모듈 설정
  
  // WiFi 연결
  setup_wifi();
  
  dht.begin();

  // Firebase 설정
  config.api_key = FIREBASE_AUTH;
  config.database_url = FIREBASE_HOST;

  // Firebase 로그인
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase 연결 성공");
    signupOK = true;
  } else {
    Serial.printf("Firebase 연결 실패: %s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  firebaseData.setResponseSize(4096);
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > dataInterval || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    
    // 센서 데이터 읽기
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    
    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    int lightPercentage = map(lightValue, 0, 4095, 0, 100);
    
    int soilValue = analogRead(SOILSENSORPIN);
    int soilHumidityPercentage = map(soilValue, 0, 4095, 0, 100);
    
    // DHT11(온도, 습도) 데이터 전송
    json.clear();
    json.set("temperature", temperature);
    json.set("humidity", humidity);
    if (Firebase.RTDB.setJSON(&firebaseData, "/sensorData/dht11", &json)) {
      Serial.println("DHT11 데이터 전송 성공");
    } else {
      Serial.println("DHT11 데이터 전송 실패: " + firebaseData.errorReason());
    }
    
    // 빛 센서 데이터 전송
    if (Firebase.RTDB.setInt(&firebaseData, "/sensorData/light/percentage", lightPercentage)) {
      Serial.println("조도 데이터 전송 성공");
    } else {
      Serial.println("조도 데이터 전송 실패: " + firebaseData.errorReason());
    }
    
    // 토양 습도 데이터 전송
    if (Firebase.RTDB.setInt(&firebaseData, "/sensorData/soil/humidity", soilHumidityPercentage)) {
      Serial.println("토양습도 데이터 전송 성공");
    } else {
      Serial.println("토양습도 데이터 전송 실패: " + firebaseData.errorReason());
    }
    
    // 타임스탬프 저장
    if (Firebase.RTDB.setInt(&firebaseData, "/sensorData/timestamp", millis())) {
      Serial.println("타임스탬프 전송 성공");
    } else {
      Serial.println("타임스탬프 전송 실패: " + firebaseData.errorReason());
    }
    
    // 센서 데이터 로그 출력
    Serial.println("\n===== 센서 데이터 =====");
    Serial.println("조도: " + String(lightPercentage) + "%");
    Serial.println("온도: " + String(temperature) + "°C");
    Serial.println("습도: " + String(humidity) + "%");
    Serial.println("토양습도: " + String(soilHumidityPercentage) + "%");
    Serial.println("==============================");

    // 조도 제어
    if (lightPercentage < (lightThreshold - lightRange)) {
      digitalWrite(LED_PIN, HIGH); 
    } else {
      digitalWrite(LED_PIN, LOW); 
    }
    
    // 토양습도 제어
    if (soilHumidityPercentage < (soilHumidityThreshold - soilHumidityRange)) {
      digitalWrite(HUM_PIN, HIGH);
    } else {
      digitalWrite(HUM_PIN, LOW);
    }
    
    // 습도 제어
    if (humidity > humidityThreshold) {
      digitalWrite(FAN_PIN, HIGH);
    } else {
      digitalWrite(FAN_PIN, LOW);
    }
  }
}