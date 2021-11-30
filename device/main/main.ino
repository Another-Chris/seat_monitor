// ===================== variables =====================
// Seat Id
int seatId = 0;

// Serial port
int baud = 115200;

// pinMap (for wemos)
const int trigger = 15;  //D8
const int echo = 13;    //D7
const int touch = 12;   //D6

// variables for ultrasonic
int prevDistance = 1;
int outOfRangeCount = 0;
int maxOutOfRange = 2;
int inRangeCount = 0;
int maxInRange = 2;
int objectRange = 50;

// sensor state
int objectOnDesk = 0;
int objectOnSeat = 0;
String prevState = "available";

const String seatAvailable = "available";
const String seatOccupied = "occupied";
const String seatSuspicious = "suspicious";

// count for the status duration
int counter = 0;

// ===================== utils  =====================

void printState(long distance, int touchState, String currState) {
  String content = "distance: ";
  content += distance;
  content += "    ";
  content += "touch: ";
  content += touchState;
  content += "\n";
  content += "status: ";
  content += currState;
  content += "\n";
  Serial.print(content);
}

String verifyCurrState() {
  String currState;
  if (objectOnDesk && objectOnSeat) {
    currState = seatOccupied;
  } else if (!objectOnDesk && objectOnSeat) {
    currState = seatOccupied;
  } else if (objectOnDesk && !objectOnSeat) {
    currState = seatSuspicious;
  } else {
    currState = seatAvailable;
  }
  return currState;
}

bool outOfRange(long distance) {
  if (distance >= objectRange) {
    if (prevDistance >= objectRange) {
      return true;
    }
  }
  return false;
}

void resetRangeCounts() {
  outOfRangeCount = 0;
  inRangeCount = 0;
}

long verifyDistance(long distance) {

  // out of range: no things detected
  if (outOfRange(distance)) {
    outOfRangeCount ++;
    if (outOfRangeCount >= maxOutOfRange) {
      Serial.println("[-] No object on desk");
      objectOnDesk = 0;
      resetRangeCounts();
    }
  }
  // in range: detect object
  else {
    inRangeCount ++;
    if (inRangeCount >= maxInRange) {
      Serial.println("[+] Detect object on desk");
      objectOnDesk = 1;
      resetRangeCounts();
    }
  }
  prevDistance = distance;
  return objectOnDesk;
}

// ===================== start =====================
void setup() {
  Serial.begin(baud);
  setUpSonic();
  setupWifi();
  setupTouch();
  Serial.println("ready to go.");
}

void loop() {
  // ultrasonic
  long distance = getDistance();
  objectOnDesk = verifyDistance(distance);

  // touch
  int touchState = getTouchState();
  objectOnSeat = touchState;
  

  // change status
  String currState = verifyCurrState();

  //print status
  printState(distance, touchState, currState);

  // http
  if (currState != prevState) {
    Serial.println("[+] change seat status");
    changeSeatState(seatId, currState);
    prevState = currState;
  }

  delay(1000);
  counter += 1;

  if (counter >= 60) {
    Serial.println("[+] 1min reached. The current duration extends.");
    oneMinDuration(seatId, counter); // tell server this seat's state has kept for 1 minute
    counter = 0;
  }
}
