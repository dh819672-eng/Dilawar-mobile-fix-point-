export interface DeviceBrand {
  id: string;
  name: string;
  models: string[];
}

export interface RepairServiceItem {
  id: string;
  name: string;
  category: 'screen' | 'battery' | 'board' | 'water' | 'camera' | 'charging' | 'software';
  shortDesc: string;
  longDesc: string;
  turnaroundTime: string;
  warranty: string;
  symptoms: string[];
  startingPrice: number; // in USD
}

export interface RepairTicket {
  ticketId: string;
  customerName: string;
  deviceModel: string;
  issue: string;
  status: 'received' | 'diagnostic' | 'parts_ordered' | 'repairing' | 'testing' | 'ready';
  checkInDate: string;
  estimatedCompletion: string;
  technician: string;
  progressPercent: number;
  qualityChecklist: {
    displayTouch: boolean;
    cameraSensors: boolean;
    chargingRate: boolean;
    biometrics: boolean;
    networkAndWifi: boolean;
  };
  technicianNotes: string;
  repairPrice: number;
}

export const DEVICE_BRANDS: DeviceBrand[] = [
  {
    id: 'apple',
    name: 'Apple iPhone',
    models: [
      'iPhone 16 Pro Max',
      'iPhone 16 Pro',
      'iPhone 16',
      'iPhone 15 Pro Max',
      'iPhone 15 Pro',
      'iPhone 15',
      'iPhone 14 Pro Max',
      'iPhone 14 Pro',
      'iPhone 14',
      'iPhone 13 Pro',
      'iPhone 13',
      'iPhone 12 / 12 Pro',
      'iPhone 11'
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung Galaxy',
    models: [
      'Galaxy S24 Ultra',
      'Galaxy S24+',
      'Galaxy S24',
      'Galaxy S23 Ultra',
      'Galaxy S23',
      'Galaxy Z Fold 5',
      'Galaxy Z Flip 5',
      'Galaxy A55 5G',
      'Galaxy A35 5G',
      'Galaxy S22 Ultra'
    ]
  },
  {
    id: 'google',
    name: 'Google Pixel',
    models: [
      'Pixel 9 Pro XL',
      'Pixel 9 Pro',
      'Pixel 9',
      'Pixel 8 Pro',
      'Pixel 8',
      'Pixel 8a',
      'Pixel 7 Pro',
      'Pixel 7',
      'Pixel 7a',
      'Pixel 6 Pro'
    ]
  },
  {
    id: 'xiaomi',
    name: 'Xiaomi & Poco',
    models: [
      'Xiaomi 14 Ultra',
      'Xiaomi 14',
      'Redmi Note 13 Pro+',
      'Redmi Note 13',
      'Poco X6 Pro',
      'Poco F5',
      'Redmi Note 12',
      'Xiaomi 13T Pro'
    ]
  },
  {
    id: 'oneplus',
    name: 'OnePlus',
    models: [
      'OnePlus 12',
      'OnePlus 12R',
      'OnePlus 11',
      'OnePlus Open',
      'OnePlus Nord 3',
      'OnePlus Nord CE4',
      'OnePlus 10 Pro'
    ]
  },
  {
    id: 'vivo_oppo',
    name: 'Vivo & Oppo',
    models: [
      'Vivo X100 Pro',
      'Vivo V30 Pro',
      'Vivo Y200',
      'Oppo Find X7 Ultra',
      'Oppo Reno 11 Pro',
      'Oppo A79'
    ]
  }
];

export const REPAIR_SERVICES: RepairServiceItem[] = [
  {
    id: 'screen',
    name: 'OLED & Glass Screen Replacement',
    category: 'screen',
    shortDesc: 'Crisp factory-grade display panels with TrueTone / High Refresh Rate preservation.',
    longDesc: 'We specialize in optical bonding, cracked outer glass separation, and full original-grade OLED/Super AMOLED panel replacements. Every installation includes frame realignment, dust seals, and touch responsiveness verification.',
    turnaroundTime: '25 - 45 Minutes',
    warranty: '90 Days Warranty',
    symptoms: ['Shattered outer glass', 'Green lines or flickering display', 'Dead pixels or ink blotches', 'Unresponsive touch or ghost touches'],
    startingPrice: 65
  },
  {
    id: 'battery',
    name: 'High-Capacity Battery Renewal',
    category: 'battery',
    shortDesc: 'Genuine grade battery cells with zero warning pop-ups and full health reporting.',
    longDesc: 'Replace tired, degraded, or swollen batteries with certified Grade-A cells. We calibrate cycle counts, check thermal efficiency, and guarantee all-day battery life performance.',
    turnaroundTime: '20 - 30 Minutes',
    warranty: '6 Months Warranty',
    symptoms: ['Battery health below 80%', 'Phone shuts down at 20-30%', 'Rapid battery drain', 'Device bulging or heating up while idle'],
    startingPrice: 35
  },
  {
    id: 'board',
    name: 'Logic Board & Micro-Soldering',
    category: 'board',
    shortDesc: 'Component-level motherboard repair under stereoscopic microscopes.',
    longDesc: 'Where other repair shops declare devices unfixable, our master technicians perform micro-soldering: Power IC (PMIC) replacement, short-circuit clearing, charging IC (Tristar/Hydra) repair, and audio code troubleshooting.',
    turnaroundTime: '2 - 4 Hours',
    warranty: '90 Days Warranty',
    symptoms: ['Completely dead, no boot', 'No backlight or no sound', 'Stuck on manufacturer logo bootloop', 'Short circuit drawing high current'],
    startingPrice: 85
  },
  {
    id: 'water',
    name: 'Ultrasonic Liquid Damage Restoration',
    category: 'water',
    shortDesc: 'Full teardown, ultrasonic chemical bath, and corrosion eradication.',
    longDesc: 'Dropped in water, pool, or coffee? Do not put it in rice! We perform immediate teardown, remove RF shields, subject the motherboard to medical-grade ultrasonic solvent baths, and resolder corroded traces.',
    turnaroundTime: '3 - 6 Hours',
    warranty: '60 Days Warranty',
    symptoms: ['Dropped in liquid', 'Corrosion visible in port', 'Overheating after getting wet', 'Camera fog or muffled audio'],
    startingPrice: 50
  },
  {
    id: 'charging',
    name: 'Charging Port & Flex Assembly',
    category: 'charging',
    shortDesc: 'Fix loose cables, slow charging, and damaged USB-C or Lightning connectors.',
    longDesc: 'We clean compact debris or replace damaged charging sub-boards, mic flex cables, and headphone jack assemblies with OEM-spec components supporting Fast & SuperCharge protocols.',
    turnaroundTime: '30 - 40 Minutes',
    warranty: '90 Days Warranty',
    symptoms: ['Cable falls out easily', 'Charges only at a specific angle', 'Moisture detected false warnings', 'Slow or intermittent charging'],
    startingPrice: 30
  },
  {
    id: 'camera',
    name: 'Camera Sensor & Glass Lens Repair',
    category: 'camera',
    shortDesc: 'Restore crystal-clear photos, optical image stabilization (OIS), and focus.',
    longDesc: 'Cracked outer camera lens letting dust inside? Shaky optical stabilizer making a buzzing sound? We replace individual sapphire lens caps and full multi-lens optical modules.',
    turnaroundTime: '35 - 50 Minutes',
    warranty: '90 Days Warranty',
    symptoms: ['Cracked camera lens glass', 'Blurry or jittering camera', 'Black screen when opening camera', 'Dust specks on sensor'],
    startingPrice: 40
  }
];

export const INITIAL_TICKETS: RepairTicket[] = [
  {
    ticketId: 'DMF-8492',
    customerName: 'Hassan Raza',
    deviceModel: 'Apple iPhone 14 Pro',
    issue: 'Cracked OLED Screen + TrueTone Restore',
    status: 'ready',
    checkInDate: 'Today, 10:15 AM',
    estimatedCompletion: 'Today, 11:30 AM',
    technician: 'Master Tech Dilawar',
    progressPercent: 100,
    qualityChecklist: {
      displayTouch: true,
      cameraSensors: true,
      chargingRate: true,
      biometrics: true,
      networkAndWifi: true
    },
    technicianNotes: 'Original OLED installed and programmed with TrueTone data. 20-point diagnostic test passed. Ready for pickup.',
    repairPrice: 125
  },
  {
    ticketId: 'DMF-7310',
    customerName: 'Ayesha Khan',
    deviceModel: 'Samsung Galaxy S23 Ultra',
    issue: 'Logic Board Power IC Reballing (No Power)',
    status: 'testing',
    checkInDate: 'Today, 11:45 AM',
    estimatedCompletion: 'Today, 3:30 PM',
    technician: 'Dilawar (Micro-soldering Lead)',
    progressPercent: 85,
    qualityChecklist: {
      displayTouch: true,
      cameraSensors: true,
      chargingRate: true,
      biometrics: true,
      networkAndWifi: false
    },
    technicianNotes: 'PMIC short cleared. Phone boots up with all customer photos and contacts intact. Running 45-min battery stress test.',
    repairPrice: 95
  },
  {
    ticketId: 'DMF-9921',
    customerName: 'Bilal Ahmed',
    deviceModel: 'Google Pixel 8',
    issue: 'Degraded Battery Replacement & Cleanout',
    status: 'repairing',
    checkInDate: 'Today, 1:10 PM',
    estimatedCompletion: 'Today, 2:15 PM',
    technician: 'Tech Tariq',
    progressPercent: 50,
    qualityChecklist: {
      displayTouch: true,
      cameraSensors: false,
      chargingRate: false,
      biometrics: false,
      networkAndWifi: false
    },
    technicianNotes: 'Old swollen pack safely extracted. New 4575mAh certified cell installed with original pull tabs. Sealing adhesive curing.',
    repairPrice: 45
  },
  {
    ticketId: 'DMF-5518',
    customerName: 'Usman Farooq',
    deviceModel: 'Samsung Galaxy S24 Ultra',
    issue: 'Corning Gorilla Armor Display & Frame Swap',
    status: 'parts_ordered',
    checkInDate: 'Today, 2:00 PM',
    estimatedCompletion: 'Tomorrow, 12:00 PM',
    technician: 'Master Tech Dilawar',
    progressPercent: 40,
    qualityChecklist: {
      displayTouch: false,
      cameraSensors: false,
      chargingRate: false,
      biometrics: false,
      networkAndWifi: false
    },
    technicianNotes: 'Diagnostic approved. Original Samsung Service Pack screen ordered from authorized central distributor. Waybill tracked.',
    repairPrice: 195
  },
  {
    ticketId: 'DMF-6104',
    customerName: 'Farhan Malik',
    deviceModel: 'OnePlus 11',
    issue: 'Ultrasonic Liquid Decontamination',
    status: 'diagnostic',
    checkInDate: 'Today, 1:40 PM',
    estimatedCompletion: 'Today, 5:00 PM',
    technician: 'Master Tech Dilawar',
    progressPercent: 20,
    qualityChecklist: {
      displayTouch: false,
      cameraSensors: false,
      chargingRate: false,
      biometrics: false,
      networkAndWifi: false
    },
    technicianNotes: 'Teardown complete. Light corrosion detected near charging sub-board. Ultrasonic cleaning cycle in progress.',
    repairPrice: 55
  },
  {
    ticketId: 'DMF-3042',
    customerName: 'Zainab Noor',
    deviceModel: 'Xiaomi 14',
    issue: 'Cracked Camera Sapphire Lens',
    status: 'received',
    checkInDate: 'Today, 2:45 PM',
    estimatedCompletion: 'Today, 4:15 PM',
    technician: 'Tech Tariq',
    progressPercent: 10,
    qualityChecklist: {
      displayTouch: false,
      cameraSensors: false,
      chargingRate: false,
      biometrics: false,
      networkAndWifi: false
    },
    technicianNotes: 'Device logged into intake bay. Cleanroom optical inspection queued behind active bench slot.',
    repairPrice: 35
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Zubair Qureshi',
    location: 'Gulberg Branch Customer',
    device: 'iPhone 15 Pro Max',
    repair: 'OLED Screen Replacement',
    turnaround: '35 minutes',
    rating: 5,
    review: 'Two other repair shops told me my display was dead and wanted me to leave the phone for 3 days. Dilawar replaced the front OLED right in front of me in 35 minutes with original TrueTone intact. Outstanding craftsmanship and honesty!'
  },
  {
    id: 2,
    name: 'Dr. Sana Mir',
    location: 'Verified Customer',
    device: 'Samsung Galaxy S22 Ultra',
    repair: 'Water Damage & Data Recovery',
    turnaround: 'Same day (4 hours)',
    rating: 5,
    review: 'Dropped my phone into a pool while on holiday. My medical records and 4 years of family pictures were locked on it. Master Dilawar disassembled the board and recovered 100% of my data without a single byte lost. Truly lifesavers.'
  },
  {
    id: 3,
    name: 'Kamran Shah',
    location: 'Commercial Fleet Client',
    device: 'Google Pixel 7 Pro',
    repair: 'Micro-soldering Charging IC',
    turnaround: '2 hours',
    rating: 5,
    review: 'Phone was completely unresponsive to any charger. Dilawar diagnosed a blown charging IC chip within 10 minutes, soldered a new chip under the microscope, and handed it back working flawlessly with a 90-day warranty.'
  }
];

export const DIAGNOSTIC_SYMPTOMS = [
  {
    id: 'sym_black_screen',
    symptom: 'Screen is completely black, but phone still vibrates or makes sound',
    likelyIssue: 'Damaged OLED display or loose display flex connector',
    serviceCategory: 'screen',
    urgency: 'Medium',
    estTime: '30-40 mins',
    recommendation: 'Display replacement or flex re-seating needed. Your internal data is safe.'
  },
  {
    id: 'sym_no_charge',
    symptom: 'Phone won’t charge or cable has to be held at an awkward angle',
    likelyIssue: 'Clogged or damaged USB-C/Lightning charging port pin',
    serviceCategory: 'charging',
    urgency: 'Low-Medium',
    estTime: '20-30 mins',
    recommendation: 'Deep precision port cleaning or sub-board replacement will restore quick charging.'
  },
  {
    id: 'sym_dead_no_power',
    symptom: 'Phone completely dead, no reaction to charger, button, or computer',
    likelyIssue: 'Motherboard short circuit, dead battery, or blown Power IC (PMIC)',
    serviceCategory: 'board',
    urgency: 'High',
    estTime: '2-4 hours',
    recommendation: 'Bring in for free multimeter diagnostic. Component-level micro-soldering will isolate the short.'
  },
  {
    id: 'sym_battery_drain',
    symptom: 'Battery drains fast, dies at 20-30%, or phone chassis is swollen',
    likelyIssue: 'Degraded battery cells / gas expansion',
    serviceCategory: 'battery',
    urgency: 'High (if swollen)',
    estTime: '25 mins',
    recommendation: 'Immediate battery replacement recommended to avoid damaging the OLED or logic board.'
  },
  {
    id: 'sym_water_drop',
    symptom: 'Phone was submerged in water, juice, or coffee',
    likelyIssue: 'Active liquid corrosion on motherboard traces and power rails',
    serviceCategory: 'water',
    urgency: 'Critical (Immediate action)',
    estTime: '3-5 hours',
    recommendation: 'Turn phone OFF immediately. Do NOT plug in charger or use rice. Bring for urgent ultrasonic bath.'
  },
  {
    id: 'sym_ghost_touch',
    symptom: 'Screen presses buttons on its own or certain areas do not respond to fingers',
    likelyIssue: 'Faulty digitizer layer or micro-fracture in touch grid',
    serviceCategory: 'screen',
    urgency: 'Medium',
    estTime: '30 mins',
    recommendation: 'Digitizer & glass replacement will completely fix touch accuracy.'
  }
];
