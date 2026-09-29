// Central config: edit everything here.
export const site = {
  team: "Team Name", members: ["Member 1", "Member 2"], title: "FARMO-BOT",
  tagline: "Edge-AI Powered Smart Farming Assistant",
  links: { github: "#", demo: "#", team: "#", contact: "#" },
  photos: ["/robot-1.jpg", "/robot-2.jpg"],
};
export const nav = [["Home","#home"],["Problem","#problem"],["Solution","#solution"],["Technology","#tech"],["Live Demo","#demo"],["Impact","#impact"],["Roadmap","#roadmap"]];
export const problems = ["Delayed crop disease detection","Pest infestations","Water stress","Over/under irrigation","Heat stress","Environmental risks","Manual field inspection","Poor connectivity in remote areas","Unnecessary blanket intervention"];
export const solutions = [
  ["Crop Health Monitoring","Camera frames are analysed by a YOLO model to flag possible disease.","ESP32-CAM streams frames over Wi-Fi to a local computer running YOLO + OpenCV."],
  ["Pest Detection & Early Warning","Planned extension: pest classes added to the detection model.","PLANNED: needs a pest dataset and model training."],
  ["Smart Irrigation Management","Soil moisture and temperature drive an irrigation recommendation.","Prototype threshold logic; can later add weather forecasts and crop models."],
  ["Environmental Risk Monitoring","Heat and water stress from sensors; rain/flood is an extension.","Rain and water-level sensors are NOT in the current prototype."],
  ["Edge AI Processing","Detection and decisions run locally, not in a cloud service.","Current setup: local computer runs YOLO; ESP32 controls robot and sensors."],
  ["Farmer Advisory System","Detections and sensor states become plain-language alerts.","Rule-based messages today; mobile delivery is planned."],
];
export const workflow = [["SENSE","ESP32-CAM + environmental sensors"],["DETECT","YOLO + OpenCV"],["ANALYZE","Crop and environmental condition analysis"],["DECIDE","Local decision logic"],["NAVIGATE","Robot movement based on target position"],["INTERVENE","Targeted pump activation"],["ADVISE","Actionable farmer recommendation"]];
export const hardware: [string,string,boolean][] = [
  ["ESP32 Dev Module","Robot controller: motors, sensors, relay",true],["ESP32-CAM","Live camera stream",true],["L298N Motor Driver","Drives the DC motors",true],["DC/N20 Motors","Locomotion",true],["Ultrasonic Sensor","Obstacle distance, safety stop at 15 cm",true],["Soil Moisture Sensor","Soil water reading",true],["Temperature & Humidity Sensor","Ambient readings",true],["Relay Module","Switches the pump",true],["Water Pump","Targeted watering",true],["Battery / Power System","Powers robot and electronics",true],
];
export const roadmap = ["Working robotic prototype","Environmental sensor integration","Smart irrigation recommendations","Pest detection models","Environmental risk monitoring","Mobile farmer advisory","GPS / field mapping / historical analytics","Multi-crop and large-scale deployment"];
export const capabilities = ["Live camera monitoring","YOLO-based crop disease detection","Visual target positioning","Autonomous/manual robot control","Ultrasonic safety stop at 15 cm","Wi-Fi/HTTP communication","Relay-controlled pump intervention"];
