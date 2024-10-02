#include <Arduino.h>
#include <ESP32Servo.h>
#if defined(ESP32)
  #include <WiFi.h>
#elif defined(ESP8266)
  #include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Nile"
#define WIFI_PASSWORD "bossbabs_20"

// Insert Firebase project API Key
#define API_KEY  "AIzaSyCuupt8sd7IurqFUDIxw1uYgkLV2VpGybE"


// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://dual-control-system-default-rtdb.firebaseio.com/" 


const int green_pin = 14;
const int blue_pin = 12;
const int transparent_pin = 13;
const int potentiometer_pin = 33;
const int servo_pin = 23;
const int rgb_red_pin =19;
const int rgb_blue_pin =4;
const int rgb_green_pin =2;
const int admin_switch_one =18;
const int admin_switch_two =17; // on right now
const int admin_led = 16;


int button_one = 26;
int button_two = 27;
int button_three =25;
int button_four =32;


unsigned long debounceDelay = 50; // Debounce delay in milliseconds

// Variables for debounce
unsigned long lastDebounceTime1 = 0;
unsigned long lastDebounceTime2 = 0;
unsigned long lastDebounceTime3 = 0;
unsigned long lastDebounceTime4 = 0;

bool lastButtonState1 = LOW;
bool lastButtonState2 = LOW;
bool lastButtonState3 = LOW;
bool lastButtonState4 = LOW;

bool ledState1 = LOW;
bool ledState2 = LOW;
bool ledState3 = LOW;
int rgbMode = 0;
int cycleCount = 0;





String mode = "";
int degree_manual = 0;
int phase_one = 0;
int phase_two = 0;
unsigned long previousMillis_one = 0;
const long interval_one = 5000;       

//Define Firebase Data object
Servo myServo;
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;
String green_store = "";
String blue_store = "";
String transparent_store = "";
String admin_store = "";
int admin_time = 0;
int degree_store = 0;

void setRGBColor(int red, int green, int blue) {
  analogWrite(rgb_red_pin, red);
  analogWrite(rgb_green_pin, green);
  analogWrite(rgb_blue_pin, blue);
}

void software_green_read(){
  if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "green")){

      if (fbdo.stringData() == "OFF"){
        digitalWrite(green_pin, LOW);
      }
      else if (fbdo.stringData() == "ON"){
        digitalWrite(green_pin, HIGH);
      }
      Serial.println("PASSED");
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}
void software_blue_read(){
  if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "blue")){
      
      if (fbdo.stringData() == "OFF"){
        digitalWrite(blue_pin, LOW);
      }
      else if (fbdo.stringData() == "ON") {
        digitalWrite(blue_pin, HIGH);
      }
      Serial.println("PASSED");
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}
void software_transparent_read(){
  if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "transparent")){
      
      if (fbdo.stringData() == "OFF"){
        digitalWrite(transparent_pin, LOW);
      }
      else if (fbdo.stringData() == "ON") {
        digitalWrite(transparent_pin, HIGH);
      }
      Serial.println("PASSED");
      
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}
void software_degree_read(){
  if (Firebase.RTDB.getInt(&fbdo, "Dual_control/0", "deg")){
      Serial.println("PASSED");
      myServo.write(fbdo.intData());
    }
    else {

      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}
void software_mode_read(){
  if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "mode")){
      

      if(fbdo.stringData() == "" ){
        cycleCount = 0;
        setRGBColor(0, 0, 0); 
        String string_a =fbdo.stringData();
        mode =  string_a ;


      }
      else if(fbdo.stringData() == "S_master" ){
        cycleCount = 1;
        setRGBColor(255, 105, 180); 
        String string_b =fbdo.stringData();
        mode = string_b;


      }
      else if(fbdo.stringData() == "H_master" ){
        cycleCount = 2;
        setRGBColor(255, 255, 0);
        String string_c =fbdo.stringData();
        mode = string_c;

      }
      Serial.println("PASSED");
      
    }
    else {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
}
void software_admin_read(){

      if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "admin")){
      

      if(fbdo.stringData() == "online" ){
        admin_store = "online";  
      }

      else if(fbdo.stringData() == "manual" ){
        admin_store = "manual";
      }

      }

}


String admin_item_two_name(){

      if (Firebase.RTDB.getString(&fbdo, "Dual_control/0", "admin")){
      
      if(fbdo.stringData() == "online" ){
        return "online";  
      }

      else if(fbdo.stringData() == "manual" ){
        return "manual";
      }

      }

}

void software_admin_time_read(){
      if (Firebase.RTDB.getInt(&fbdo, "Dual_control/0", "time")){
        admin_time = fbdo.intData(); 
      }
}

int admin_item_two_time(){
      if (Firebase.RTDB.getInt(&fbdo, "Dual_control/0", "time")){
         return fbdo.intData(); 
      }
}




void setting_green_store(){

  if (!(green_store == "")){

        if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/green", green_store)){
                Serial.println("PASSED"); 
              }
              else {
                Serial.println("FAILED");
                Serial.println("REASON: " + fbdo.errorReason());
       }
  }
    
}
void setting_blue_store(){

  if (!(blue_store == "")){

        if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/blue", blue_store)){
                Serial.println("PASSED"); 
              }
        else {
                Serial.println("FAILED");
                Serial.println("REASON: " + fbdo.errorReason());
       }

    }
}
void setting_degree_store(){
        if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/deg", degree_store)){
                Serial.println("PASSED"); 
              }
              else {
                Serial.println("FAILED");
                Serial.println("REASON: " + fbdo.errorReason());
       }

}
void setting_transparent_store(){

  if (!(transparent_store == "")){
        if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/transparent", transparent_store)){

              
                Serial.println("PASSED"); 
              }
              else {
                Serial.println("FAILED");
                Serial.println("REASON: " + fbdo.errorReason());
       }

    
  }
}
void setting_mode(){
        if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/mode", mode)){
                Serial.println("PASSED"); 
              }
              else {
                Serial.println("FAILED");
                Serial.println("REASON: " + fbdo.errorReason());
      }

    
}




void setting_green_manual(){

        if(!digitalRead(green_pin) == LOW){

                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/green", "OFF")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/green", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
                  }
        else{
                  if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/green", "ON")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/green", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
        }
              
}
void setting_blue_manual(){

        if(!digitalRead(blue_pin) == LOW){

                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/blue", "OFF")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/blue", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
                  }
        else{
                  if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/blue", "ON")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/blue", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
        }
              
}
void setting_transparent_manual(){

        if(!digitalRead(transparent_pin) == LOW){

                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/transparent", "OFF")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/transparent", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
                  }
        else{
                  if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/transparent", "ON")){
                            Serial.println("PASSED"); 
                    }
                    else if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/transparent", "")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
        }
              
}
void setting_degree_manual(){

                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/deg", degree_manual)){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
              
}

void setting_admin_manual(){
        if( admin_store == "online" || admin_store == ""){

                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/admin", "online")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
                  }
        else if( admin_store == "manual"){
                  if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/admin", "manual")){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
        }

}
void setting_admin_time_manual(){
        
                    if (Firebase.RTDB.setString(&fbdo, "Dual_control/0/time", admin_time)){
                            Serial.println("PASSED"); 
                    }
                    else {
                            Serial.println("FAILED");
                            Serial.println("REASON: " + fbdo.errorReason());
                    }  
            
  
}


void manual_nobackup_degree(){
  int potValue = analogRead(potentiometer_pin);
  Serial.println(potValue);
  degree_manual = map(potValue, 0, 4095, 0, 180);
  myServo.write(degree_manual);
}
void manual_nobackup_button(int buttonPin, unsigned long &lastDebounceTime, bool &lastButtonState, bool &ledState, int ledPin) {
  bool reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (buttonPin == 26){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin));  
      
            }
        }
    }
    else if (buttonPin == 27){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin)); 
                  
        }
      }
    }
    else if (buttonPin == 25){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin));  
                  
            }
        }
  }
  
  lastButtonState = reading;
}
}

void manual_control_degree(){
  int potValue = analogRead(potentiometer_pin);
  Serial.println(potValue);
  degree_manual = map(potValue, 0, 4095, 0, 180);
  degree_store = degree_manual;
  myServo.write(degree_manual);
  
}
void manual_control_button(int buttonPin, unsigned long &lastDebounceTime, bool &lastButtonState, bool &ledState, int ledPin) {
  bool reading = digitalRead(buttonPin);
  if (reading != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (buttonPin == 26){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin));  
                  if(!digitalRead(ledPin) == LOW){
                        green_store = "OFF"; 
                  }
                  else{
                        green_store = "ON"; 
                }
            }
        }
    }
    else if (buttonPin == 27){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin)); 
                  if(!digitalRead(ledPin) == LOW){
                        blue_store = "OFF"; 
                  }
                  else{
                        blue_store = "ON"; 
           }      
        }
      }
    }
    else if (buttonPin == 25){
            if (reading != ledState) {
                  ledState = reading; 
            if (ledState == HIGH) {
                  digitalWrite(ledPin, !digitalRead(ledPin));  
                  if(!digitalRead(ledPin) == LOW){
                        transparent_store = "OFF"; 
                  }
                  else{
                        transparent_store = "ON"; 
                  }
            }
        }
  }
  
  lastButtonState = reading;
}
}
void manual_control_mode(int buttonPin) {
  static unsigned long lastDebounceTime4 = 0;
  static bool lastButtonState4 = LOW;
  
  bool reading = digitalRead(buttonPin);
  if (reading != lastButtonState4) {
    lastDebounceTime4 = millis();
  }
  
  if ((millis() - lastDebounceTime4) > debounceDelay) {
    if (reading != lastButtonState4) {
      lastButtonState4 = reading;
      if (lastButtonState4 == HIGH) {
        cycleCount = (cycleCount + 1) % 3;
        switch (cycleCount) {
          case 0:
            setRGBColor(255, 255, 0); // Yellow
            mode = "H_master";
            break;
          case 1:
            setRGBColor(0, 0, 0); // Off
            mode = "";
            break;
          case 2:
            setRGBColor(255, 105, 180); // Pink
            mode = "S_master";
            break; 
        }
      }
    }
  }
}
void manual_button_control_conditioner(){
      if(((digitalRead(transparent_pin)) == LOW)){
        digitalWrite(blue_pin, LOW);
        digitalWrite(green_pin, LOW);
        blue_store = "OFF";
        green_store ="OFF";
      }
      if((((digitalRead(blue_pin)) == HIGH) && ((digitalRead(green_pin)) == LOW)) || (((digitalRead(green_pin)) == HIGH) && ((digitalRead(blue_pin)) == LOW))){
        digitalWrite(transparent_pin, LOW);
        transparent_store = "OFF";
      }
      

      if(((digitalRead(transparent_pin)) == HIGH)){
        digitalWrite(blue_pin, HIGH);
        digitalWrite(green_pin, HIGH);
        blue_store = "ON";
        green_store ="ON";
      }
     
}
void manual_control_admin(){
      if (digitalRead(admin_switch_one) == HIGH  &&  digitalRead(admin_switch_two) == LOW){
            phase_one = millis();

      }

      if (digitalRead(admin_switch_two) == HIGH  &&  digitalRead(admin_switch_one) == LOW){
            phase_two = millis();

      }

      if (!(phase_one == 0) || !(phase_two == 0) ){
            if ((phase_one > phase_two) && digitalRead(admin_led)== HIGH){
                digitalWrite(admin_led, LOW);
                admin_store = "online";
                admin_time = millis();
            }
            if ((phase_one > phase_two) && digitalRead(admin_led)== LOW){
                digitalWrite(admin_led, HIGH);
                admin_store = "manual";
                admin_time = millis();
            }
            if ((phase_two > phase_one) && digitalRead(admin_led)== HIGH){
                digitalWrite(admin_led, LOW);
                admin_store = "online";
                admin_time = millis();
            }
            if ((phase_two > phase_one) && digitalRead(admin_led)== LOW){
                digitalWrite(admin_led, HIGH);
                admin_store = "manual";
                admin_time = millis();
            }

      }
}
void manual_button_nobackup_conditioner(){
      if(((digitalRead(transparent_pin)) == LOW)){
        digitalWrite(blue_pin, LOW);
        digitalWrite(green_pin, LOW);
        
      }
      else if((((digitalRead(blue_pin)) == HIGH) && ((digitalRead(green_pin)) == LOW)) || (((digitalRead(green_pin)) == HIGH) && ((digitalRead(blue_pin)) == LOW))){
        digitalWrite(transparent_pin, LOW);
        transparent_store = "OFF";
      }
      

      if(((digitalRead(transparent_pin)) == HIGH)){
        digitalWrite(blue_pin, HIGH);
        digitalWrite(green_pin, HIGH);
        
      }
     
}


void connect_to_firebase(){
  Serial.println(WiFi.localIP());
  Serial.println();
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}
void admin_decider(){
  if(admin_store==""){
    admin_store == "online";

  }
  String admin_one = admin_store;
  int admin_one_time = admin_time;
  String admin_two = admin_item_two_name();
  int admin_two_time = admin_item_two_time();



    if(!(admin_one == admin_two)){
       if(admin_one_time > admin_two_time){
            admin_store= admin_one;
            admin_time= admin_one_time;
            setting_admin_manual();
            setting_admin_time_manual();
       }
       if(admin_two_time > admin_one_time){
            admin_store= admin_two;
            admin_time= admin_two_time;
            setting_admin_manual();
            setting_admin_time_manual();
       }
    }
    if((admin_one == admin_two)){
       if(admin_one_time > admin_two_time){
            admin_store= admin_one;
            admin_time = admin_one_time;
            setting_admin_manual();
            setting_admin_time_manual();
       }
       if(admin_two_time > admin_one_time){
            admin_store= admin_two;
            admin_time= admin_two_time;
            setting_admin_manual();
            setting_admin_time_manual();
       }


    }

  
}




void setup(){
  pinMode(blue_pin, OUTPUT);
  pinMode(green_pin, OUTPUT);
  pinMode(transparent_pin, OUTPUT);

  pinMode(admin_switch_one, INPUT);
  pinMode(admin_switch_two, INPUT);

  pinMode(button_one, INPUT_PULLUP);
  pinMode(button_two, INPUT_PULLUP);
  pinMode(button_three, INPUT_PULLUP);
  pinMode(button_four, INPUT_PULLUP);
  pinMode(admin_led, INPUT);

  pinMode(rgb_red_pin, OUTPUT);
  pinMode(rgb_blue_pin, OUTPUT);
  pinMode(rgb_green_pin, OUTPUT);


  digitalWrite(green_pin, LOW);
  digitalWrite(blue_pin, LOW);
  digitalWrite(transparent_pin, LOW);
  setRGBColor(0, 0, 0);
  myServo.attach(servo_pin);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  Serial.println();
  if ((WiFi.status() == WL_CONNECTED)){
        connect_to_firebase();              
}
}

void loop() {
  // put your main code here, to run repeatedly:
  
  

  

  if ((Firebase.ready()) && signupOK && (( ((millis()) - (sendDataPrevMillis > 10)) || sendDataPrevMillis == 0)) ){
            Serial.println("0000000000000000000000000");
            sendDataPrevMillis = millis();

            admin_decider();

            if(admin_store == "manual"){
                          Serial.println("broooooo2");
                          if (mode == "S_master"){
                                              manual_control_admin();
                                              manual_control_mode(button_four);
                                              software_green_read();
                                              software_blue_read();
                                              software_transparent_read();
                                              software_degree_read();
                                              software_mode_read(); 
                                              software_admin_read(); 
                                              software_admin_time_read(); 
                                              setting_mode();    
                          }

                          if (mode == "H_master"){
                                      if( green_store == "" && blue_store == "" && transparent_store == "" && degree_store == 0){
                                              
                                              manual_control_admin();
                                              manual_nobackup_degree();
                                              manual_nobackup_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                              manual_nobackup_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                              manual_nobackup_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                              manual_button_nobackup_conditioner();
                                              manual_control_mode(button_four);
                                              setting_admin_manual();
                                              setting_admin_time_manual();
                                              setting_degree_manual();
                                              setting_green_manual();
                                              setting_blue_manual();
                                              setting_transparent_manual();
                                              setting_mode();
                                              
                                      }
                                       else{  
                                              manual_control_mode(button_four);
                                              manual_control_admin();
                                              setting_blue_store();
                                              setting_green_store();
                                              setting_transparent_store();
                                              setting_degree_store();
                                              setting_admin_manual();
                                              setting_admin_time_manual();
                                              setting_mode();
                                              green_store = "";
                                              blue_store = "";
                                              transparent_store = ""; 
                                              degree_store = 0;  
                                      
                                        }


                          }

                          if (mode == ""){
                                      if( green_store == "" && blue_store == "" && transparent_store == "" && degree_store == 0){
                                            
                                              
                                                            setting_admin_manual();
                                                            setting_admin_time_manual();
                                                            software_green_read();
                                                            software_blue_read();
                                                            software_transparent_read();
                                                            software_degree_read();
                                                            software_mode_read();   
                                                            manual_nobackup_degree();                               
                                                            manual_nobackup_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                                            manual_nobackup_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                                            manual_nobackup_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                                            manual_button_nobackup_conditioner();
                                                            manual_control_mode(button_four);
                                                            manual_control_admin();
                                                            setting_degree_manual();
                                                            setting_green_manual();
                                                            setting_blue_manual();
                                                            setting_transparent_manual();
                                                            setting_mode();
                                      }
                                      else{  
                                              manual_control_mode(button_four);
                                              manual_control_admin();
                                              setting_blue_store();
                                              setting_green_store();
                                              setting_transparent_store();
                                              setting_degree_store();
                                              setting_admin_manual();
                                              setting_admin_time_manual();
                                              setting_mode();
                                              green_store = "";
                                              blue_store = "";
                                              transparent_store = ""; 
                                              degree_store = 0;  
                                      
                        }
              }

            if(admin_store == "online" || admin_store == ""){
              Serial.println("broooooo3");
                          if (mode == "S_master"){
                                manual_control_admin();
                                software_green_read();
                                software_blue_read();
                                software_transparent_read();
                                software_degree_read();
                                software_mode_read(); 
                                software_admin_read(); 
                                software_admin_time_read(); 
                      
                          }  
                          if (mode == "H_master"){
                                      
                                manual_control_admin();
                                manual_nobackup_degree();
                                manual_nobackup_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                manual_nobackup_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                manual_nobackup_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                manual_button_nobackup_conditioner();
                                software_mode_read(); 
                                software_admin_read(); 
                                software_admin_time_read();    
                                setting_degree_manual();
                                setting_green_manual();
                                setting_blue_manual();
                                setting_transparent_manual();
                                setting_mode();

                                              
                                      
                          }
                          if (mode == ""){
                                manual_control_admin();     
                                software_green_read();
                                software_blue_read();
                                software_transparent_read();
                                software_degree_read();
                                software_mode_read();
                                software_admin_read(); 
                                software_admin_time_read();       
                                manual_nobackup_degree();
                                manual_nobackup_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                manual_nobackup_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                manual_nobackup_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                manual_button_nobackup_conditioner();
                                setting_degree_manual();
                                setting_green_manual();
                                setting_blue_manual();
                                setting_transparent_manual();
                                setting_mode();
                                      

                          }
              
              }

            }

      }

    
  if (!(Firebase.ready())){
                  
                  unsigned long currentMillis_one = millis();
                  if (WiFi.status() != WL_CONNECTED || WiFi.status() == 3) {
                          if (currentMillis_one - previousMillis_one >= interval_one) {
                            previousMillis_one = currentMillis_one;
                            Serial.println("Attempting to connect to WiFi...");
                            WiFi.begin(WIFI_SSID, WIFI_PASSWORD);  // Attempt to reconnect to WiFi
                          }
                  }

                  if (admin_store = "manual"){
                              if (((mode == "S_master")||(mode == "H_master")||(mode == "")) &&  (WiFi.status() == WL_CONNECTED)){
                                        connect_to_firebase();
                              }
                              Serial.println(admin_store);
                              Serial.println(mode);
                              Serial.println(WiFi.status());



                              if (((mode == "H_master") || (mode == "") ) &&  (!((WiFi.status() == WL_CONNECTED))||((WiFi.status() == 3)) )){
                                        Serial.println("------------------------------");

                                        manual_control_admin();
                                        manual_control_degree();
                                        manual_control_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                        manual_control_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                        manual_control_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                        manual_button_control_conditioner();
                                        manual_control_mode(button_four);  
                                        
                              }

                              if (((mode == "S_master") ) &&  (WiFi.status() != WL_CONNECTED)){
                              Serial.println("-------------++++++++++++++++++++++++++-----------------");

                                        manual_control_admin();
                                        manual_control_mode(button_four); 
                                        green_store = "";
                                        blue_store = "";
                                        transparent_store = ""; 
                                        degree_store = 0;  
                              }       
                  }

                  if (admin_store == "online"   || admin_store == ""){
                                        Serial.println("onlinnnneeee");

                              if (((mode == "S_master")||(mode == "H_master")||(mode == "")) &&  (WiFi.status() == WL_CONNECTED)){
                                        connect_to_firebase();
                              }

                              if (((mode == "H_master")) &&  (WiFi.status() != WL_CONNECTED)){
                                        manual_control_admin();
                                        manual_control_degree();
                                        manual_control_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                        manual_control_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                        manual_control_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                        manual_button_control_conditioner();  
                                        
                              }

                              if (((mode == "")) &&  (WiFi.status() != WL_CONNECTED)){
                                        manual_control_admin();
                                        manual_nobackup_degree();
                                        manual_nobackup_button(button_one, lastDebounceTime1, lastButtonState1, ledState1, green_pin);
                                        manual_nobackup_button(button_two, lastDebounceTime2, lastButtonState2, ledState2, blue_pin);
                                        manual_nobackup_button(button_three, lastDebounceTime3, lastButtonState3, ledState3, transparent_pin);
                                        manual_button_nobackup_conditioner();        
                                        
                              }

                              if (((mode == "S_master") ) &&  (WiFi.status() != WL_CONNECTED)){
                                      manual_control_admin();
                                      green_store = "";
                                      blue_store = "";
                                      transparent_store = ""; 
                                      degree_store = 0;  

                              }

         
                  }
    
  }
}