import React, { createContext, useContext, useState, useEffect } from 'react';
import { featuredProjects, coursesCatalog } from '../data/websiteData';

const DataContext = createContext();

const initialAdminProfile = {
  name: "System Administrator",
  email: "admin@techstrivers.in",
  phone: "+91 85499 0019",
  role: "Lead Hardware Administrator",
  password: "admin123",
  twoFactorEnabled: false,
  twoFactorMethod: "authenticator", // 'authenticator' or 'sms'
  secretKey: "TS-ERP-9842-7710-KEY"
};

const initialLeads = [
  {
    id: "lead-101",
    name: "Arjun Rao",
    email: "arjun.ece@rvce.edu.in",
    phone: "+91 98450 12345",
    college: "RV College of Engineering",
    domain: "Mini/Major Project",
    message: "Looking for AI Drone Detection hardware schematic and code for final year project.",
    date: "2026-09-18 14:30",
    status: "New",
    notes: "Requires Raspberry Pi + Coral TPU setup."
  },
  {
    id: "lead-102",
    name: "Pooja Hegde",
    email: "pooja.h@bmsce.ac.in",
    phone: "+91 97312 88900",
    college: "BMS College of Engineering",
    domain: "IoT & Embedded",
    message: "Enquiring about 6-week IoT & Embedded Systems masterclass and physical hardware kit.",
    date: "2026-09-18 16:45",
    status: "Contacted",
    notes: "Sent curriculum PDF on WhatsApp."
  },
  {
    id: "lead-103",
    name: "Karan Patel",
    email: "karan.mechatronics@reva.edu.in",
    phone: "+91 91080 44556",
    college: "REVA University",
    domain: "Internship Program",
    message: "Want to join 3-month advanced hardware internship program starting next month.",
    date: "2026-09-19 09:15",
    status: "In Progress",
    notes: "Scheduled phone interview for Monday 11 AM."
  }
];

const initialInternships = [
  {
    id: "intern-1",
    title: "1-Month Fast-Track Prototyping Internship",
    duration: "4 Weeks",
    category: "Fast-Track",
    popular: false,
    highlights: ["Hands-on Embedded & IoT Prototyping", "1 Live Project Development", "Mentor Code Review & Debugging", "Government Recognized Certification"],
    color: "border-blue-200 bg-blue-50/30"
  },
  {
    id: "intern-2",
    title: "3-Month Advanced Hardware & R&D Internship",
    duration: "12 Weeks",
    category: "Advanced",
    popular: true,
    highlights: ["Multi-domain IoT & AI Vision Projects", "PCB Schematic & Layout Prototyping", "Hardware Troubleshooting & Testing", "Publication & Patent Support", "Industry Internship Certificate"],
    color: "border-amber-300 bg-amber-50/50 shadow-md"
  },
  {
    id: "intern-3",
    title: "6-Month Full Prototyping & Placement Fellowship",
    duration: "24 Weeks",
    category: "Fellowship",
    popular: false,
    highlights: ["End-to-End Product Engineering", "ROS 2 Autonomous Systems / AI Edge", "Physical Kit Allocation", "Job Placement Assistance & LOR"],
    color: "border-purple-200 bg-purple-50/30"
  }
];

const initialWorkshops = [
  {
    id: "ws-1",
    title: "Hands-on ESP32 & Cloud IoT Bootcamp",
    date: "2026-10-05",
    time: "10:00 AM - 4:00 PM",
    venue: "TechStrivers Bengaluru Lab / Online Stream",
    domain: "IoT & Embedded",
    seatsLeft: 12,
    fee: "Free / Sponsored",
    instructor: "Senior Embedded Engineer"
  },
  {
    id: "ws-2",
    title: "ROS 2 Autonomous Rover Navigation Workshop",
    date: "2026-10-18",
    time: "09:30 AM - 5:00 PM",
    venue: "Bengaluru Innovation Lab",
    domain: "Robotics",
    seatsLeft: 8,
    fee: "₹499 (Kit Provided)",
    instructor: "Robotics Research Lead"
  }
];

const initialBlogs = [
  {
    id: "blog-1",
    title: "Building an Edge AI Object Detection System with Raspberry Pi 4 and YOLOv8",
    slug: "building-edge-ai-object-detection-raspberry-pi",
    author: "TechStrivers R&D Team",
    category: "AI & Embedded",
    readTime: "6 min read",
    coverImage: "/images/drone_detection.jpg",
    publishDate: "2026-09-15",
    excerpt: "Learn how to deploy lightweight neural network models on embedded edge hardware for real-time computer vision applications without cloud latency.",
    content: `Edge AI is revolutionizing how automated surveillance, quadcopters, and industrial robotics process computer vision data in real-time.

### Why Edge Intelligence Matters
Traditional computer vision solutions rely heavily on cloud APIs to process high-definition video frames. However, in applications such as autonomous drone navigation or critical perimeter security, cloud round-trip latency (typically 150ms-500ms) is unacceptable.

### Hardware Setup & Prerequisites
To follow along with this tutorial, you will need:
- Raspberry Pi 4 Model B (4GB or 8GB RAM)
- Google Coral USB Accelerator TPU (Optional for 60FPS inference)
- Sony IMX219 Camera Module
- Python 3.10+ with OpenCV and Ultralytics YOLOv8 PyTorch dependencies

### Code Snippet: Real-Time Frame Capture & Inference
\`\`\`python
import cv2
from ultralytics import YOLO

# Load lightweight Nano model tuned for ARM architecture
model = YOLO('yolov8n.pt')

cap = cv2.VideoCapture(0)
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    results = model(frame, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            cv2.rectangle(frame, (int(x1)), (int(y1)), (0, 255, 0), 2)

    cv2.imshow("TechStrivers Edge Vision", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
\`\`\`

### Results & Next Steps
With INT8 quantization applied, inference latency drops to just 18ms per 1080p frame! Stay tuned for our follow-up masterclass on mounting this module onto Pixhawk flight controllers.`,
    status: "Published"
  },
  {
    id: "blog-2",
    title: "How to Design Multi-Layer PCBs in Altium Designer for High-Speed IoT Circuits",
    slug: "design-multi-layer-pcbs-altium-designer-iot",
    author: "Hardware Design Lead",
    category: "PCB & Electronics",
    readTime: "8 min read",
    coverImage: "/images/hero_lab.jpg",
    publishDate: "2026-09-10",
    excerpt: "A step-by-step guide on stackup design, impedance matching, power plane decoupling, and noise suppression for ESP32 and STM32 hardware boards.",
    content: `Designing printed circuit boards for high-frequency IoT radios requires careful attention to trace impedance, power plane integrity, and EMI shielding.

### Key Rules for 4-Layer Stackups
1. Top Layer: High-Speed Signals & Antenna Feedline (50 Ohm Controlled Impedance)
2. Layer 2: Continuous Ground Plane (GND)
3. Layer 3: Solid Power Plane (3.3V / 5V Rails)
4. Bottom Layer: General I/O Traces & Test Points

By keeping the Ground plane directly underneath the signal layer, return current loops are minimized, reducing radiation noise by over 20dB.`,
    status: "Published"
  }
];

const initialGallery = [
  {
    id: "gal-1",
    title: "AI Edge Quadcopter Drone Integration",
    category: "Projects",
    image: "/images/drone_detection.jpg",
    description: "Custom AI vision quadcopter integrated with Raspberry Pi and Coral TPU for real-time aerial object detection and autonomous navigation.",
    date: "2026-09-15"
  },
  {
    id: "gal-2",
    title: "Smart Waste Solar Monitoring Bin Prototype",
    category: "Projects",
    image: "/images/smart_waste.jpg",
    description: "IoT-enabled smart trash bin prototype equipped with ultrasonic level sensors, solar power management, and GSM cloud alert telemetry.",
    date: "2026-09-14"
  },
  {
    id: "gal-3",
    title: "ESP32 & Cloud IoT Bootcamp Practical Session",
    category: "Workshops",
    image: "/images/hero_lab.jpg",
    description: "Students building hands-on Wi-Fi and Bluetooth sensor nodes using ESP32 microcontrollers during our weekend cloud IoT bootcamp.",
    date: "2026-09-12"
  },
  {
    id: "gal-4",
    title: "LoRa Bridge Structural Health Monitoring Mesh",
    category: "Projects",
    image: "/images/bridge_monitoring.jpg",
    description: "Long-range LoRa wireless sensor node array for continuous strain, vibration, and temperature monitoring on bridge structures.",
    date: "2026-09-10"
  },
  {
    id: "gal-5",
    title: "Advanced Hardware Prototyping & PCB Design Lab",
    category: "Internships",
    image: "/images/hero_lab.jpg",
    description: "Interns routing multi-layer PCB schematics in Altium and assembling surface-mount SMD components using hot air soldering stations.",
    date: "2026-09-08"
  },
  {
    id: "gal-6",
    title: "Embedded Systems Masterclass Practical Kit Assembly",
    category: "Courses",
    image: "/images/smart_waste.jpg",
    description: "Comprehensive hands-on hardware kit distribution and microcontroller sensor wiring during the embedded hardware masterclass.",
    date: "2026-09-05"
  }
];

export function DataProvider({ children }) {
  const [adminProfile, setAdminProfile] = useState(() => {
    const saved = localStorage.getItem('ts_admin_profile');
    return saved ? JSON.parse(saved) : initialAdminProfile;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('ts_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('ts_projects');
    return saved ? JSON.parse(saved) : featuredProjects;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('ts_courses');
    return saved ? JSON.parse(saved) : coursesCatalog;
  });

  const [internships, setInternships] = useState(() => {
    const saved = localStorage.getItem('ts_internships');
    return saved ? JSON.parse(saved) : initialInternships;
  });

  const [workshops, setWorkshops] = useState(() => {
    const saved = localStorage.getItem('ts_workshops');
    return saved ? JSON.parse(saved) : initialWorkshops;
  });

  const [blogs, setBlogs] = useState(() => {
    const saved = localStorage.getItem('ts_blogs');
    return saved ? JSON.parse(saved) : initialBlogs;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem('ts_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const safeSetStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`localStorage save error for key "${key}":`, err);
    }
  };

  useEffect(() => {
    safeSetStorage('ts_admin_profile', adminProfile);
  }, [adminProfile]);

  useEffect(() => {
    safeSetStorage('ts_leads', leads);
  }, [leads]);

  useEffect(() => {
    safeSetStorage('ts_projects', projects);
  }, [projects]);

  useEffect(() => {
    safeSetStorage('ts_courses', courses);
  }, [courses]);

  useEffect(() => {
    safeSetStorage('ts_internships', internships);
  }, [internships]);

  useEffect(() => {
    safeSetStorage('ts_workshops', workshops);
  }, [workshops]);

  useEffect(() => {
    safeSetStorage('ts_blogs', blogs);
  }, [blogs]);

  useEffect(() => {
    safeSetStorage('ts_gallery', gallery);
  }, [gallery]);

  // Admin Profile Methods
  const updateAdminProfile = (data) => {
    setAdminProfile(prev => ({ ...prev, ...data }));
  };

  const updateAdminPassword = (currentPass, newPass) => {
    if (currentPass !== adminProfile.password) {
      return { success: false, message: "Current password is incorrect." };
    }
    setAdminProfile(prev => ({ ...prev, password: newPass }));
    return { success: true, message: "Password updated successfully!" };
  };

  const toggle2FA = (enabled, method = 'authenticator') => {
    setAdminProfile(prev => ({ 
      ...prev, 
      twoFactorEnabled: enabled, 
      twoFactorMethod: method 
    }));
  };

  // Lead Methods
  const addLead = (leadData) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      ...leadData,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "New",
      notes: ""
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id, newStatus, newNote) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, status: newStatus, notes: newNote !== undefined ? newNote : lead.notes } : lead
    ));
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  // Project Methods
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      ...projectData
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id, projectData) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...projectData } : p));
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Course Methods
  const addCourse = (courseData) => {
    const newCourse = {
      id: `course-${Date.now()}`,
      ...courseData
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (id, courseData) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, ...courseData } : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Internship Methods
  const addInternship = (data) => {
    const item = { id: `intern-${Date.now()}`, ...data };
    setInternships(prev => [item, ...prev]);
  };

  const updateInternship = (id, data) => {
    setInternships(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  };

  const deleteInternship = (id) => {
    setInternships(prev => prev.filter(i => i.id !== id));
  };

  // Workshop Methods
  const addWorkshop = (data) => {
    const item = { id: `ws-${Date.now()}`, ...data };
    setWorkshops(prev => [item, ...prev]);
  };

  const updateWorkshop = (id, data) => {
    setWorkshops(prev => prev.map(w => w.id === id ? { ...w, ...data } : w));
  };

  const deleteWorkshop = (id) => {
    setWorkshops(prev => prev.filter(w => w.id !== id));
  };

  // Blog Methods
  const addBlog = (blogData) => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      slug: blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      publishDate: new Date().toISOString().substring(0, 10),
      readTime: "5 min read",
      status: "Published",
      ...blogData
    };
    setBlogs(prev => [newBlog, ...prev]);
  };

  const updateBlog = (id, blogData) => {
    setBlogs(prev => prev.map(b => b.id === id ? { ...b, ...blogData } : b));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  // Gallery Methods
  const addGalleryItem = (galleryData) => {
    const newItem = {
      id: `gal-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      ...galleryData
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateGalleryItem = (id, galleryData) => {
    setGallery(prev => prev.map(item => item.id === id ? { ...item, ...galleryData } : item));
  };

  const deleteGalleryItem = (id) => {
    setGallery(prev => prev.filter(item => item.id !== id));
  };

  const resetToDefaults = () => {
    setAdminProfile(initialAdminProfile);
    setLeads(initialLeads);
    setProjects(featuredProjects);
    setCourses(coursesCatalog);
    setInternships(initialInternships);
    setWorkshops(initialWorkshops);
    setBlogs(initialBlogs);
    setGallery(initialGallery);
    localStorage.removeItem('ts_admin_profile');
    localStorage.removeItem('ts_leads');
    localStorage.removeItem('ts_projects');
    localStorage.removeItem('ts_courses');
    localStorage.removeItem('ts_internships');
    localStorage.removeItem('ts_workshops');
    localStorage.removeItem('ts_blogs');
    localStorage.removeItem('ts_gallery');
  };

  return (
    <DataContext.Provider value={{
      adminProfile,
      updateAdminProfile,
      updateAdminPassword,
      toggle2FA,
      leads,
      projects,
      courses,
      internships,
      workshops,
      blogs,
      gallery,
      addLead,
      updateLeadStatus,
      deleteLead,
      addProject,
      updateProject,
      deleteProject,
      addCourse,
      updateCourse,
      deleteCourse,
      addInternship,
      updateInternship,
      deleteInternship,
      addWorkshop,
      updateWorkshop,
      deleteWorkshop,
      addBlog,
      updateBlog,
      deleteBlog,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
