// ===================== variables =====================
int prevState = 1;
int outOfRangeCount = 0;
int maxOutOfRange = 5;
int inRangeCount = 0;
int maxInRange = 3;
int objectRange = 50; //cm

int objectOnDesktop = 0;
int objectOnSeat = 0;

int seatOccupied = false;
int seatId =1;                              // Seat Id

const String seatAvailable = "available";
const String seatOccupied = "occupied";
const String seatSuspicious = "suspicious";

int counter = 0;

// ===================== utils  =====================

bool outOfRange(long distance) {
  if (distance >= objectRange) {
    if (prevState >= objectRange) {
      return true;
    }
  }
  return false;
}

long calcDistance(long duration) {
  long distance = (duration / 2) / 29.1;  // 1/29.1 is the sound speed

  if (outOfRange(distance)) {
    if (seatOccupied) {
      outOfRangeCount ++;
      if (outOfRangeCount >= maxOutOfRange) {
        Serial.println("[-] No object on desk anymore");
        objectOnDesktop = 0
        seatOccupied = false;
        changeSeatState(seatId, seatAvailable);
        outOfRangeCount = 0;
        counter = 0;
      }
    }
  } else {
    if (!seatOccupied) {
      inRangeCount ++;
      if (inRangeCount >= maxInRange) {
        Serial.println("object detected, occupy seat");
        changeSeatState(seatId);
        seatOccupied = true;
        inRangeCount = 0;
        counter = 0;
      }
    } else {
      outOfRangeCount = 0;
    }
  }
  prevState = distance;
  return distance;
}

void setup() {
  Serial.begin(115200);
  setUpSonic();
  setupWifi();
  Serial.println("ready to go.");
}

void loop() {
  long duration;  // time the trigger being high
  sendPulse();
  duration = pulseIn(echo, HIGH);
  long distance = calcDistance(duration);
  Serial.println(distance);
  delay(1000);
  counter += 1;

  if (counter >= 60) {
    Serial.println("[+] 1min reached. The current duration extends.");
    oneMinDuration(seatId, counter); // tell server this seat's state has kept for 1 minute
    counter = 0;
  }
}
