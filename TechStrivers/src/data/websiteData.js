export const statsData = [
  { value: "6+", label: "Years of Experience", count: 6, suffix: "+" },
  { value: "2800+", label: "Projects & Prototypes", count: 2800, suffix: "+" },
  { value: "200+", label: "Workshops Conducted", count: 200, suffix: "+" },
  { value: "10+", label: "Technology Domains", count: 10, suffix: "+" },
  { value: "5000+", label: "Students Trained", count: 5000, suffix: "+" }
];

export const servicesData = [
  {
    id: "engineering-projects",
    icon: "GraduationCap",
    title: "Engineering Projects",
    description: "Mini, Major & Final Year Projects with complete guidance, hardware schematics, and mentorship support.",
    color: "#FF6B00",
    linkText: "Explore →"
  },
  {
    id: "iot-embedded",
    icon: "Cpu",
    title: "IoT & Embedded Systems",
    description: "Learn and build connected devices using ESP32, STM32, Raspberry Pi, LoRa, and cloud IoT dashboards.",
    color: "#3B82F6",
    linkText: "Explore →"
  },
  {
    id: "robotics-automation",
    icon: "Bot",
    title: "Robotics & Automation",
    description: "Design, build and program intelligent automated systems, ROS quadrupeds, autonomous rovers, and industrial arms.",
    color: "#10B981",
    linkText: "Explore →"
  },
  {
    id: "ai-computer-vision",
    icon: "Brain",
    title: "AI & Computer Vision",
    description: "Real-world AI solutions with edge hardware integration, OpenCV, YOLO object detection, and TensorFlow Lite.",
    color: "#EC4899",
    linkText: "Explore →"
  },
  {
    id: "pcb-design",
    icon: "Zap",
    title: "PCB Design & Electronics",
    description: "From concept to circuit - custom schematic design, multi-layer PCB layout prototyping, and hardware testing.",
    color: "#8B5CF6",
    linkText: "Explore →"
  },
  {
    id: "training-internships",
    icon: "Users",
    title: "Training & Internships",
    description: "Practical, project-based hands-on training with physical hardware kits, mentorship, and industry certification.",
    color: "#06B6D4",
    linkText: "Explore →"
  }
];

export const featuredProjects = [
  {
    id: "smart-waste",
    title: "Smart Waste Management System",
    category: "IoT",
    image: "/images/smart_waste.jpg",
    tags: ["IoT", "ESP32", "GPS", "Web App"],
    shortDesc: "Solar-powered smart bin prototype with fill level monitoring, automated lid control, and real-time cloud analytics dashboard.",
    fullDesc: "An end-to-end smart city innovation designed to optimize waste collection routes. Utilizes ultrasonic level sensors, GPS telemetry, solar charging circuits, and a React-based cloud monitoring platform.",
    hardware: ["ESP32 Microcontroller", "HC-SR04 Ultrasonic Sensors", "NEO-6M GPS Module", "10W Solar Panel & TP4056 Charger", "SG90 Servo Motors"],
    software: ["Arduino C++", "Firebase Realtime DB", "React Web Dashboard"]
  },
  {
    id: "ai-drone",
    title: "AI Drone Detection System",
    category: "AI/ML",
    image: "/images/drone_detection.jpg",
    tags: ["Raspberry Pi", "AI/ML", "Computer Vision"],
    shortDesc: "Autonomous drone equipped with edge AI object detection, perimeter monitoring, and real-time video stream analytics.",
    fullDesc: "Combines OpenCV and YOLOv8 lightweight neural network running on an onboard Raspberry Pi 4 paired with a Coral Edge TPU. Detects unauthorized intrusions, personnel, and thermal anomalies in real time.",
    hardware: ["Raspberry Pi 4 (8GB)", "Google Coral Edge TPU", "Pixhawk Flight Controller", "ArduCam Optical Zoom Camera", "4S LiPo Battery"],
    software: ["Python", "YOLOv8 Edge", "OpenCV", "MAVLink Protocol"]
  },
  {
    id: "smart-bridge",
    title: "Smart Bridge Health Monitoring",
    category: "Sensors",
    image: "/images/bridge_monitoring.jpg",
    tags: ["IoT", "Sensors", "Structural Health"],
    shortDesc: "Wireless sensor mesh for structural integrity monitoring, vibration spectrum analysis, and strain detection on bridges.",
    fullDesc: "A multi-node structural monitoring system deploying strain gauges, accelerometers, and flex sensors linked via LoRa mesh networking. Detects micro-cracks and resonance spikes before structural degradation occurs.",
    hardware: ["STM32 Nucleo Board", "LoRa SX1276 Transceivers", "ADXL345 3-Axis Accelerometers", "Strain Gauge Amplifiers (HX711)", "Piezo Vibration Sensors"],
    software: ["Embedded C", "LoRaWAN Gateway", "Grafana Live Telemetry Dashboard"]
  },
  {
    id: "autonomous-rover",
    title: "ROS Autonomous Obstacle Rover",
    category: "Robotics",
    image: "/images/hero_lab.jpg",
    tags: ["Robotics", "ROS 2", "LiDAR", "SLAM"],
    shortDesc: "4WD rover using ROS 2, 2D LiDAR SLAM mapping, and depth cameras for autonomous warehouse navigation.",
    fullDesc: "Built for automated material transport. Performs real-time map generation using Hector SLAM, path planning via Nav2 stack, and dynamic obstacle avoidance.",
    hardware: ["Jetson Orin Nano", "RPLiDAR A1M8", "Intel RealSense Depth Camera", "Encrypted Motor Drivers"],
    software: ["ROS 2 Humble", "Python", "Nav2", "Cartographer SLAM"]
  }
];

export const whyChooseUsData = [
  {
    icon: "Wrench",
    title: "Hands-on Approach",
    description: "Learn by doing with real microcontrollers, sensors, actuators, and live industrial hardware components."
  },
  {
    icon: "Award",
    title: "Expert Mentorship",
    description: "Personalized guidance from experienced hardware engineers, embedded developers, and AI researchers."
  },
  {
    icon: "Layers",
    title: "Industry-Relevant Skills",
    description: "Work on bleeding-edge technologies used in modern R&D labs, automotive tech, and smart city infrastructure."
  },
  {
    icon: "Briefcase",
    title: "Build Your Portfolio",
    description: "Create fully functional, working physical prototypes that set your resume and engineering profile apart."
  },
  {
    icon: "ShieldCheck",
    title: "End-to-End Support",
    description: "From component selection, schematic design, PCB fabrication to final report documentation and viva prep."
  },
  {
    icon: "Zap",
    title: "Real Hardware & Tools",
    description: "Access high-end oscilloscopes, 3D printers, logic analyzers, and rapid prototyping tools."
  }
];

export const testimonialsData = [
  {
    quote: "Amazing support and guidance throughout my final year project. The team is very knowledgeable, patient, and helped us debug complex hardware issues effortlessly.",
    name: "Rohit M",
    branch: "ECE",
    college: "RV College of Engineering",
    rating: 5
  },
  {
    quote: "The IoT and Embedded Systems training was very practical and hands-on. I built my own functional prototype and gained confidence in hardware integration.",
    name: "Sneha K",
    branch: "CSE",
    college: "BMS College of Engineering",
    rating: 5
  },
  {
    quote: "Great place for students who want to actually learn and build real tech rather than just buying readymade kits. Highly recommended project platform!",
    name: "Aditya S",
    branch: "Mechatronics",
    college: "REVA University",
    rating: 5
  },
  {
    quote: "The AI Drone Detection project guidance exceeded our expectations. We scored top marks in our final year viva thanks to the thorough mentorship from TechStrivers.",
    name: "Harshita R",
    branch: "EEE",
    college: "M S Ramaiah Institute of Technology",
    rating: 5
  }
];

export const partnerUniversities = [
  { name: "REVA University", code: "REVA", logo: "/images/universities/reva-uni.jpg" },
  { name: "Sri Venkateswara College of Engineering", code: "SVCE", logo: "/images/universities/svce.png" },
  { name: "Brindavan Group of Institutions", code: "BRINDAVAN", logo: "/images/universities/brindavan.jfif" },
  { name: "CMR Group of Institutions", code: "CMR", logo: "/images/universities/cmr.jpg" },
  { name: "Nitte Meenakshi Institute of Technology", code: "NITTE", logo: "/images/universities/Nitte-Meenakshi-Institute-of-Technology.webp" },
  { name: "M S Ramaiah Institute of Technology", code: "MSRIT", logo: "/images/universities/Ramaiah-logo.webp" },
  { name: "BMS Institute of Technology & Management", code: "BMSIT", logo: "/images/universities/B.M.S._Institute_of_Technology_and_Management_logo.png" },
  { name: "HKBK College of Engineering", code: "HKBK", logo: "/images/universities/HKBK.png" },
  { name: "Cambridge Institute of Technology", code: "CIT", logo: "/images/universities/cambridge.jfif" },
  { name: "GITAM University", code: "GITAM", logo: "/images/universities/gitam.jpg" },
  { name: "Acharya Institutes", code: "ACHARYA", logo: "/images/universities/acharya.jfif" },
  { name: "Nagarjuna College of Engineering", code: "NCET", logo: "/images/universities/nagarjuna.jfif" },
  { name: "Akash Group of Institutions", code: "AKASH", logo: "/images/universities/akash.jfif" },
  { name: "Aditya Group of Institutions", code: "ADITYA", logo: "/images/universities/aditya.jpeg" }
];

export const journeyTimeline = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Started with a vision to make technology learning practical, accessible, and project-centered for engineering students."
  },
  {
    year: "2021",
    title: "Expanded Programs",
    description: "Introduced advanced hands-on training, workshops, and multi-domain hardware development support."
  },
  {
    year: "2023",
    title: "Growing Community",
    description: "Trained over 1000+ students and successfully completed 100+ hardware & software prototypes across 10+ technology domains."
  },
  {
    year: "Today",
    title: "Towards a Brighter Future",
    description: "Continuing to innovate, collaborate with top institutions, and build real-world technological solutions."
  }
];

export const missionVisionValues = {
  mission: {
    title: "Our Mission",
    description: "To make advanced technology accessible through practical learning, dedicated mentorship, and real-world project innovation."
  },
  vision: {
    title: "Our Vision",
    description: "To build a generation of engineers who don't just understand technology — they active create and shape it for tomorrow."
  },
  values: [
    "Hands-on Learning First",
    "Innovation & Curiosity",
    "Integrity & Engineering Rigor",
    "Student & Innovator Success",
    "Continuous Practical Growth"
  ]
};

export const coursesCatalog = [
  {
    id: "iot-embedded-masterclass",
    title: "IoT & Embedded Systems Masterclass",
    duration: "6 Weeks",
    level: "Beginner to Advanced",
    topics: ["ESP32 & STM32 Microcontrollers", "Sensors & Actuators Interfacing", "MQTT & HTTP Protocols", "Firebase & Blynk Cloud Dashboards", "PCB Layout Basics"],
    description: "Master hardware development from microcontrollers to live cloud telemetry. Includes physical kit."
  },
  {
    id: "robotics-ros-mastery",
    title: "Robotics & ROS 2 Autonomous Systems",
    duration: "8 Weeks",
    level: "Intermediate",
    topics: ["Kinematics & Motor Control", "ROS 2 Nodes & Topics", "LiDAR 2D/3D SLAM Mapping", "Nav2 Autonomous Path Planning", "Gazebo Simulation"],
    description: "Learn to design, simulate, and deploy autonomous mobile robots."
  },
  {
    id: "edge-ai-computer-vision",
    title: "Edge AI & Computer Vision with Python",
    duration: "6 Weeks",
    level: "Intermediate",
    topics: ["OpenCV Image Processing", "YOLO Object Detection", "TensorFlow Lite Edge Deployment", "Raspberry Pi & Jetson Hardware Integration", "Real-Time Video Analytics"],
    description: "Deploy deep learning models onto embedded edge devices for smart surveillance and automation."
  },
  {
    id: "pcb-design-altium",
    title: "Altium PCB Design & Prototyping",
    duration: "4 Weeks",
    level: "All Levels",
    topics: ["Schematic Capture & Netlists", "Component Footprint Creation", "Multi-layer Routing & Design Rules", "Gerber Generation for Manufacturing", "Soldering & Hardware Assembly"],
    description: "Turn breadboard prototypes into commercial-grade printed circuit boards."
  }
];
