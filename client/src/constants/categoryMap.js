const categoryMap = {
    "Healthcare": {
        "Hospitals & Healthcare Institutions": {
            "Overall Excellence": [
                "Hospital of the Year",
                "Multi-Specialty Hospital of the Year",
                "Super Specialty Hospital of the Year",
                "Emerging Hospital of the Year",
                "Most Trusted Hospital Brand",
                "Excellence in Patient Care Award",
                "Healthcare Excellence Institution Award"
            ],
            "Government & Public Healthcare": [
                "Best Government Hospital",
                "Best District Hospital",
                "Excellence in Public Healthcare Services",
                "Rural Healthcare Excellence Award",
                "Best Medical College Hospital"
            ],
            "Private Healthcare": [
                "Best Private Hospital",
                "Best Corporate Hospital Chain",
                "Excellence in Affordable Healthcare",
                "Best NABH Accredited Hospital",
                "Excellence in International Patient Care"
            ],
            "Specialty-Based Excellence": [
                "Best Cardiology Hospital",
                "Best Oncology Hospital",
                "Best Orthopedic Hospital",
                "Best Neurology & Neurosurgery Hospital",
                "Best Pediatric Hospital",
                "Best Women & Maternity Hospital",
                "Best IVF & Fertility Center",
                "Best Gastroenterology Hospital",
                "Best Urology & Nephrology Center",
                "Best Dermatology & Cosmetic Center"
            ],
            "Digital & Smart Healthcare": [
                "Excellence in Digital Healthcare",
                "Best Telemedicine Initiative",
                "Best AI in Healthcare Implementation",
                "Smart Hospital of the Year",
                "Innovation in Health IT Award",
                "Best Hospital Management System Implementation"
            ],
            "Global & Medical Tourism": [
                "Best Medical Tourism Hospital",
                "Excellence in International Patient Services",
                "Global Healthcare Brand Award",
                "Best Cross-Border Healthcare Initiative"
            ],
            "Sustainability & Social Impact": [
                "Green & Sustainable Hospital Award",
                "Community Healthcare Initiative Award",
                "Excellence in Rural Health Outreach",
                "Women & Child Healthcare Impact Award",
                "Healthcare for Underserved Communities Award"
            ]
        },
        "Clinics & Specialized Centers": {
            "Specialty Clinics": [
                "Best Dental Clinic",
                "Best Eye Care Clinic",
                "Best Physiotherapy Center",
                "Best Skin & Cosmetic Clinic",
                "Best Fertility Clinic",
                "Best Dialysis Center",
                "Best Diagnostic & Imaging Center"
            ],
            "Diagnostic & Pathology": [
                "Best Pathology Lab",
                "Best Radiology & Imaging Center",
                "Best Molecular Diagnostic Lab",
                "Excellence in Preventive Healthcare"
            ]
        },
        "Healthcare Education & Training Institutes": {
            "Medical Education": [
                "Best Medical College",
                "Best Nursing College",
                "Best Paramedical Institute",
                "Excellence in Medical Research Institute",
                "Best Healthcare Skill Development Institute"
            ],
            "Research & Innovation": [
                "Excellence in Clinical Research",
                "Best Medical Innovation Award",
                "Breakthrough Healthcare Research Award",
                "Excellence in Public Health Research"
            ]
        },
        "Pharma & Medical Devices": {
            "Pharmaceutical Excellence": [
                "Best Pharma Company of the Year",
                "Most Innovative Pharmaceutical Brand",
                "Excellence in Generic Medicines",
                "Excellence in Vaccine Development",
                "Excellence in Biotechnology Innovation"
            ],
            "Medical Devices & Equipment": [
                "Best Medical Device Manufacturer",
                "Excellence in Surgical Equipment Innovation",
                "Best Diagnostic Equipment Company",
                "Innovation in Health Technology Award"
            ]
        },
        "Individual Healthcare Awards": {
            "Doctors & Surgeons": [
                "Doctor of the Year",
                "Surgeon of the Year",
                "Young Doctor of the Year",
                "Lifetime Achievement in Healthcare",
                "Excellence in Patient Care Award"
            ],
            "Nursing & Allied Health": [
                "Nurse of the Year",
                "Paramedic of the Year",
                "Healthcare Hero Award",
                "Community Health Worker of the Year"
            ],
            "Research & Innovation Leaders": [
                "Healthcare Innovator of the Year",
                "Medical Researcher of the Year",
                "Public Health Leader Award"
            ]
        },
        "Digital Health & HealthTech": {
            "HealthTech Companies": [
                "Best HealthTech Startup",
                "Most Innovative HealthTech Platform",
                "Best AI-Based Diagnostic Platform",
                "Best Health App of the Year",
                "Excellence in Remote Patient Monitoring"
            ],
            "Data & Analytics": [
                "Excellence in Healthcare Data Analytics",
                "Best Predictive Healthcare Platform",
                "Innovation in Electronic Health Records"
            ]
        },
        "Special Recognition Awards": {
            "General": [
                "Healthcare Icon of the Year",
                "Global Healthcare Excellence Award",
                "Women Leader in Healthcare Award",
                "Emerging Healthcare Leader Award",
                "Excellence in Humanitarian Healthcare",
                "Pandemic Response Excellence Award"
            ]
        }
    },
    "Education": {
        "University Categories": {
            "Overall Excellence": [
                "University of the Year",
                "Emerging University of the Year",
                "Best Private University",
                "Best Government / Public University",
                "Best Deemed-to-be University",
                "Best International University (India / Asia / Global)",
                "Excellence in Higher Education Award",
                "University of the Year (India)",
                "Excellence in Higher Education – India",
                "Most Trusted University Brand (India)",
                "Outstanding Vice-Chancellor Leadership Award"
            ],
            "Internationalization": [
                "Excellence in Global Education",
                "Best International Collaboration",
                "Best Student Exchange Program",
                "Excellence in Study Abroad Programs",
                "Best Foreign University Collaboration",
                "Global Collaboration Excellence (India)",
                "Best International Student Support University",
                "Study in India Excellence Award",
                "International Research Partnerships Award"
            ],
            "Research & Innovation": [
                "Excellence in Research & Development",
                "Best Research University",
                "Innovation & Technology Excellence Award",
                "Best Patent & Intellectual Property Initiative",
                "Best Incubation & Startup Support University",
                "Excellence in Industry-Academia Collaboration",
                "Research & Innovation Excellence Award",
                "Best Doctoral & Research University",
                "Faculty Excellence Award",
                "Interdisciplinary Education Excellence"
            ],
            "Digital & Online Education": [
                "Excellence in Digital Learning",
                "Best Online University / Program",
                "Excellence in EdTech Integration",
                "Best Learning Management System (LMS)",
                "Digital University of the Year",
                "Best Online & Blended Learning University",
                "Innovation in EdTech Integration",
                "Innovation in Blended Learning",
                "AI & Technology-Enabled Campus",
                "Smart & Digital Campus Excellence"
            ]
        },
        "College Categories": {
            "By Type of Institution": [
                "Best Government College",
                "Best Private College",
                "Best Autonomous College",
                "Best Deemed-to-be University College",
                "Best International College",
                "Best Emerging College"
            ],
            "Science & Technology": [
                "Best Science College",
                "Best Engineering College",
                "Best Polytechnic College",
                "Best Research-Oriented College",
                "Best Innovation & R&D College"
            ],
            "Management & Commerce": [
                "Best Management / MBA College",
                "Best Commerce College",
                "Best Business School",
                "Best Entrepreneurship-Focused College"
            ],
            "Law & Public Policy": [
                "Best Law College",
                "Best Legal Education Institution",
                "Best Moot Court & Legal Training College"
            ],
            "Medical & Healthcare": [
                "Best Medical College",
                "Best Dental College",
                "Best Nursing College",
                "Best Pharmacy College",
                "Best Allied Health Sciences College",
                "Best Paramedical College"
            ]
        },
        "Vocational Institute": {
            "Healthcare & Paramedical": [
                "Paramedical Training Institutes",
                "Nursing Assistant & GNM Training Centers",
                "Medical Lab Technician (MLT) Institutes",
                "Radiology & Imaging Technician Institutes",
                "Emergency & Trauma Care Training Institutes",
                "Physiotherapy Assistant Training Centers",
                "Hospital Administration Vocational Institutes",
                "Pharmacy Technician Training Institutes",
                "Healthcare Skill Development Institutes"
            ],
            "Construction & Trades": [
                "Civil Construction Skill Training Institutes",
                "Plumbing & Sanitation Training Institutes",
                "Masonry & Tiling Training Centers",
                "Interior Design & Drafting Institutes",
                "Surveying & Land Measurement Institutes",
                "Heavy Equipment & Crane Operator Institutes",
                "Road & Infrastructure Skill Training Centers"
            ]
        },
        "School Categories": {
            "Early Years": [
                "Best Preschool / Kindergarten",
                "Excellence in Early Childhood Education",
                "Best Montessori School",
                "Best Play-Based Learning School"
            ],
            "Primary Education": [
                "Best Primary School",
                "Excellence in Foundational Literacy & Numeracy",
                "Best Value-Based Primary School",
                "Innovation in Primary Education"
            ],
            "Secondary & Senior Secondary": [
                "Best Secondary School",
                "Best Senior Secondary School",
                "Academic Excellence Award",
                "Best CBSE / ICSE / IB / IGCSE / State Board School",
                "Excellence in Board Results"
            ]
        },
        "EdTech Categories": {
            "Overall Excellence": [
                "Best EdTech Company of the Year – Global",
                "Most Innovative EdTech Brand",
                "Fastest Growing EdTech Company",
                "Excellence in Digital Learning Solutions",
                "Outstanding Contribution to Global Education"
            ],
            "Technology & Innovation": [
                "Best AI-Powered Learning Platform",
                "Best Adaptive / Personalized Learning Solution",
                "Best LMS (Learning Management System)",
                "Best AR/VR Learning Technology",
                "Best Gamified Learning Platform"
            ]
        },
        "Individual Categories": {
            "Academic Leadership": [
                "Global Education Leader of the Year",
                "Visionary Academic Director of the Year",
                "International School Principal of the Year",
                "University Chancellor / Vice Chancellor of the Year",
                "Education Administrator of the Year"
            ],
            "Teaching Excellence": [
                "Global Teacher of the Year",
                "Innovative Educator of the Year",
                "Outstanding Professor / Lecturer of the Year",
                "Early Childhood Educator of the Year",
                "STEM Educator of the Year"
            ]
        }
    },
    "Real Estate & Infrastructure": {
        "Overall Excellence": {
            "General": [
                "Real Estate Company of the Year",
                "Infrastructure Company of the Year",
                "Emerging Real Estate Brand",
                "Most Trusted Real Estate Developer",
                "Excellence in Urban Development",
                "Outstanding Contribution to Infrastructure Growth"
            ]
        },
        "Residential Projects": {
            "General": [
                "Best Luxury Residential Project",
                "Best Affordable Housing Project",
                "Best Gated Community Project",
                "Best Smart Residential Project",
                "Excellence in Sustainable Housing"
            ]
        },
        "Commercial & Mixed Use": {
            "General": [
                "Best Commercial Project of the Year",
                "Best IT Park / Business Park",
                "Best Retail & Shopping Mall Project",
                "Best Mixed-Use Development",
                "Excellence in Corporate Infrastructure"
            ]
        },
        "Sustainable & Green Development": {
            "General": [
                "Green Building Project of the Year",
                "Sustainable Infrastructure Excellence Award",
                "Net-Zero Energy Building Award",
                "Eco-Friendly Real Estate Project",
                "Excellence in Environmental Sustainability"
            ]
        },
        "Innovation & Technology": {
            "General": [
                "Smart City Project of the Year",
                "Innovation in Construction Technology",
                "Best Use of AI & Automation in Real Estate",
                "PropTech Innovation Award",
                "Digital Transformation in Infrastructure Award"
            ]
        },
        "Construction & Engineering": {
            "General": [
                "Construction Company of the Year",
                "Best Civil Engineering Project",
                "Excellence in Structural Engineering",
                "Outstanding EPC Project Award",
                "Infrastructure Excellence in Transportation"
            ]
        },
        "Luxury & Premium Segment": {
            "General": [
                "Luxury Developer of the Year",
                "Ultra Luxury Project Award",
                "Premium Villa Project of the Year",
                "High-Rise Excellence Award"
            ]
        },
        "Leadership & Individual Awards": {
            "General": [
                "Real Estate Leader of the Year",
                "Young Developer of the Year",
                "Lifetime Achievement in Real Estate",
                "Women Leader in Infrastructure Award"
            ]
        },
        "Special Recognition": {
            "General": [
                "Iconic Real Estate Brand of the Decade",
                "Fastest Growing Real Estate Company",
                "Excellence in Customer Satisfaction",
                "Innovation in Affordable Housing Award"
            ]
        }
    },
    "Hospitality & Tourism": {
        "Overall Excellence": {
            "General": [
                "Hospitality Brand of the Year",
                "Tourism Company of the Year",
                "Best Hospitality Group",
                "Emerging Hospitality Brand",
                "Most Trusted Travel & Tourism Company",
                "Outstanding Contribution to Tourism Development"
            ]
        },
        "Hotels & Resorts": {
            "General": [
                "Best Luxury Hotel",
                "Best Boutique Hotel",
                "Best Business Hotel",
                "Best Resort Destination",
                "Best Eco Resort",
                "Best Heritage Hotel",
                "Best Budget Hotel Chain"
            ]
        },
        "Travel & Tour Operators": {
            "General": [
                "Best Travel Agency of the Year",
                "Best International Tour Operator",
                "Best Domestic Tour Operator",
                "Best Customized Travel Experience",
                "Excellence in Adventure Tourism",
                "Best Pilgrimage Tourism Company"
            ]
        },
        "Aviation & Cruise": {
            "General": [
                "Best Airline Service Provider",
                "Best Aviation Hospitality Service",
                "Best Cruise Line Experience",
                "Excellence in Airport Hospitality"
            ]
        },
        "Food & Beverage Excellence": {
            "General": [
                "Best Fine Dining Restaurant",
                "Best Multi-Cuisine Restaurant",
                "Best Hospitality F&B Brand",
                "Excellence in Culinary Innovation",
                "Chef of the Year"
            ]
        },
        "Sustainable & Responsible Tourism": {
            "General": [
                "Green Hospitality Award",
                "Sustainable Tourism Initiative of the Year",
                "Eco-Friendly Travel Brand",
                "Community-Based Tourism Excellence",
                "Responsible Tourism Leadership Award"
            ]
        },
        "Innovation & Digital Excellence": {
            "General": [
                "Digital Innovation in Hospitality Award",
                "Best Online Booking Platform",
                "AI-Powered Travel Experience Award",
                "Best Use of Technology in Tourism",
                "Smart Hospitality Initiative Award"
            ]
        },
        "Destination & Tourism Promotion": {
            "General": [
                "Best Tourism Board Initiative",
                "Best Destination Marketing Campaign",
                "Emerging Travel Destination Award",
                "Cultural Tourism Excellence Award",
                "Heritage Tourism Promotion Award"
            ]
        },
        "Leadership & Individual Awards": {
            "General": [
                "Hospitality Leader of the Year",
                "Young Hotelier of the Year",
                "Tourism Entrepreneur of the Year",
                "Lifetime Achievement in Hospitality",
                "Women Leader in Tourism Award"
            ]
        },
        "Special Recognition": {
            "General": [
                "Iconic Hospitality Brand of the Decade",
                "Fastest Growing Travel Company",
                "Excellence in Customer Experience",
                "Global Tourism Excellence Award"
            ]
        }
    },
    "Manufacturing & Industrial": {
        "Large Manufacturing Enterprises": {
            "Overall Excellence": [
                "Manufacturing Company of the Year",
                "Industrial Excellence Award",
                "Global Manufacturing Leader Award",
                "Excellence in Production Efficiency",
                "Outstanding Contribution to Industrial Growth"
            ],
            "Innovation & Technology": [
                "Smart Manufacturing Award",
                "Industry 4.0 Excellence Award",
                "Automation & Robotics Innovation Award",
                "AI in Manufacturing Excellence",
                "Digital Transformation in Industry Award"
            ],
            "Operational Excellence": [
                "Best Lean Manufacturing Initiative",
                "Six Sigma Excellence Award",
                "Supply Chain Excellence Award",
                "Quality Control Excellence Award",
                "Best Production Optimization Strategy"
            ]
        },
        "MSME & Emerging Manufacturers": {
            "Emerging Excellence": [
                "Emerging Manufacturing Company of the Year",
                "Fastest Growing Industrial Startup",
                "Innovation in MSME Manufacturing",
                "Best Make in India Initiative"
            ],
            "Sustainability & Impact": [
                "Green Manufacturing Award",
                "Energy Efficient Manufacturing Unit",
                "Waste Reduction & Circular Economy Award",
                "Sustainable Industrial Practices Award"
            ]
        },
        "Sector-Specific Manufacturing": {
            "Automobile & EV": [
                "Automobile Manufacturer of the Year",
                "EV Manufacturing Excellence Award",
                "Auto Component Manufacturer Award"
            ],
            "Pharmaceutical & Healthcare": [
                "Pharma Manufacturing Company of the Year",
                "Excellence in Medical Device Manufacturing",
                "Best API Manufacturing Unit"
            ],
            "Textile & Apparel": [
                "Textile Manufacturer of the Year",
                "Sustainable Fashion Production Award",
                "Garment Export Excellence Award"
            ],
            "Electronics & Semiconductor": [
                "Electronics Manufacturing Excellence Award",
                "Best Semiconductor Production Unit",
                "Innovation in Consumer Electronics Manufacturing"
            ],
            "Food & FMCG": [
                "Food Processing Excellence Award",
                "FMCG Manufacturing Brand of the Year",
                "Excellence in Quality & Safety Standards"
            ]
        },
        "Infrastructure & Heavy Industry": {
            "Construction & Engineering": [
                "Industrial Infrastructure Company of the Year",
                "Heavy Engineering Excellence Award",
                "Outstanding EPC Project Award",
                "Excellence in Civil & Structural Engineering"
            ],
            "Energy & Utilities": [
                "Renewable Energy Manufacturing Award",
                "Power Equipment Manufacturing Excellence",
                "Oil & Gas Industrial Excellence Award"
            ]
        },
        "Technology & Industrial Innovation": {
            "Research & Development": [
                "Industrial R&D Excellence Award",
                "Patent & Innovation Excellence Award",
                "Best Product Development Initiative"
            ],
            "Digital & Smart Solutions": [
                "IoT in Manufacturing Award",
                "Smart Factory of the Year",
                "Industrial Data Analytics Excellence Award"
            ]
        },
        "Workforce & Leadership": {
            "Leadership Awards": [
                "Industrial Leader of the Year",
                "Manufacturing CEO of the Year",
                "Young Industrial Entrepreneur Award",
                "Women Leader in Manufacturing Award"
            ],
            "Workforce Excellence": [
                "Best Workforce Development Program",
                "Excellence in Industrial Safety Standards",
                "Skill Development Excellence Award"
            ]
        },
        "Special Recognition": {
            "Brand & Legacy": [
                "Iconic Manufacturing Brand of the Decade",
                "Lifetime Achievement in Industrial Sector",
                "Global Industrial Excellence Award",
                "Make in India Champion Award"
            ]
        }
    },
    "Beauty & Wellness": {
        "Beauty Brands & Product Manufacturing": {
            "Overall Excellence": [
                "Beauty Brand of the Year",
                "Cosmetics Company of the Year",
                "Luxury Beauty Brand Award",
                "Emerging Beauty Startup Award",
                "Global Skincare Excellence Award",
                "Premium Makeup Brand of the Year",
                "Haircare Brand Excellence Award",
                "Personal Care Brand of the Year"
            ],
            "Product Innovation": [
                "Best Skincare Product",
                "Best Anti-Aging Innovation",
                "Best Organic Beauty Product",
                "Best Herbal Cosmetics Brand",
                "Clean Beauty Innovation Award",
                "Vegan Beauty Brand Award",
                "Dermatologically Tested Product Award",
                "Beauty Technology Innovation Award"
            ],
            "Sustainable & Ethical Beauty": [
                "Cruelty-Free Brand of the Year",
                "Eco-Friendly Packaging Innovation",
                "Sustainable Beauty Initiative Award",
                "Zero Waste Beauty Brand",
                "Green Cosmetic Manufacturing Award"
            ]
        },
        "Salons & Professional Beauty Services": {
            "Salon Excellence": [
                "Best Luxury Salon",
                "Best Unisex Salon",
                "Best Bridal Makeup Studio",
                "Best Hair Styling Studio",
                "Best Nail Art Studio",
                "Best Skin Treatment Salon",
                "Best Franchise Salon Chain",
                "Best Boutique Beauty Studio"
            ],
            "Professional Services": [
                "Best Makeup Artist of the Year",
                "Best Hair Stylist Award",
                "Best Bridal Artist Award",
                "Best Celebrity Makeup Artist",
                "Beauty Educator of the Year",
                "Salon Trainer Excellence Award"
            ]
        },
        "Aesthetic Clinics & Dermatology": {
            "Clinical Excellence": [
                "Best Cosmetic Clinic",
                "Best Dermatology Clinic",
                "Excellence in Laser Treatment",
                "Best Non-Surgical Aesthetic Clinic",
                "Plastic Surgery Excellence Award",
                "Best Skin Rejuvenation Clinic",
                "Advanced Facial Treatment Award"
            ],
            "Medical Innovation": [
                "Aesthetic Technology Innovation Award",
                "Best Anti-Aging Treatment Clinic",
                "Hair Transplant Excellence Award",
                "Best Cosmetic Dermatologist Award"
            ]
        },
        "Wellness & Holistic Health": {
            "Spa & Therapy": [
                "Best Luxury Spa",
                "Ayurveda Wellness Excellence Award",
                "Holistic Therapy Center of the Year",
                "Best Aromatherapy Spa",
                "Traditional Healing Excellence Award",
                "Best Destination Spa Award"
            ],
            "Fitness & Nutrition": [
                "Fitness Brand of the Year",
                "Best Gym Chain",
                "Best Yoga Institute",
                "Best Wellness Retreat",
                "Nutrition Brand Excellence Award",
                "Weight Management Program Award",
                "Personal Trainer of the Year"
            ],
            "Mental Wellness": [
                "Mental Wellness Initiative Award",
                "Wellness Coaching Excellence Award",
                "Corporate Wellness Program Award"
            ]
        },
        "Beauty Education & Training Institutes": {
            "Academy Excellence": [
                "Beauty Academy of the Year",
                "Best Cosmetology Institute",
                "Makeup Training Institute Excellence Award",
                "Hair Styling Training Excellence Award",
                "International Beauty Training Award",
                "Emerging Beauty Academy Award"
            ],
            "Skill Development": [
                "Skill Development Excellence in Beauty",
                "Best Online Beauty Training Platform",
                "Vocational Beauty Education Award"
            ]
        },
        "Luxury & Premium Segment": {
            "High-End Brands": [
                "Luxury Skincare Brand Award",
                "Premium Salon Chain of the Year",
                "Luxury Spa Destination Award",
                "Exclusive Beauty Experience Award"
            ]
        },
        "Digital & Influencer Impact": {
            "Online Presence": [
                "Best Beauty Influencer Award",
                "Beauty Content Creator of the Year",
                "Best Beauty YouTube Channel",
                "Best Beauty Instagram Brand",
                "Digital Beauty Campaign of the Year"
            ],
            "E-Commerce & Tech": [
                "Best Beauty E-Commerce Platform",
                "Beauty App Innovation Award",
                "AI-Based Beauty Solution Award"
            ]
        },
        "Leadership & Individual Awards": {
            "Entrepreneurship": [
                "Beauty Entrepreneur of the Year",
                "Wellness Startup Founder Award",
                "Young Beauty Innovator Award",
                "Women Leader in Beauty Award",
                "Global Wellness Leader Award"
            ],
            "Lifetime Honors": [
                "Lifetime Achievement in Beauty Industry",
                "Iconic Beauty Personality Award"
            ]
        },
        "Special Recognition": {
            "Brand & Legacy": [
                "Iconic Beauty Brand of the Decade",
                "Most Trusted Beauty Brand",
                "Fastest Growing Wellness Brand",
                "Customer Satisfaction Excellence Award"
            ]
        }
    },
    "Technology & Digital Transformation": {
        "IT & Software Companies": {
            "Overall Excellence": [
                "IT Company of the Year",
                "Software Company of the Year",
                "Global Tech Brand Award",
                "Fastest Growing IT Firm",
                "Enterprise Software Excellence Award",
                "Best SaaS Company of the Year",
                "Product-Based Tech Company Award",
                "Service-Based IT Company Award"
            ],
            "Custom & Enterprise Solutions": [
                "Best ERP Solution Provider",
                "Best CRM Solution Provider",
                "Best HR Tech Solution",
                "Best FinTech Software Provider",
                "Best HealthTech Platform",
                "Best EdTech Technology Provider",
                "Best GovTech Solution Award"
            ]
        },
        "Artificial Intelligence & Data Science": {
            "AI Excellence": [
                "AI Startup of the Year",
                "Best AI Innovation Award",
                "Machine Learning Excellence Award",
                "Generative AI Solution Award",
                "AI for Social Impact Award",
                "AI in Healthcare Excellence Award",
                "AI in Finance Innovation Award",
                "AI in Manufacturing Award"
            ],
            "Data & Analytics": [
                "Data Analytics Company of the Year",
                "Big Data Excellence Award",
                "Predictive Analytics Innovation Award",
                "Business Intelligence Excellence Award",
                "Data Security & Privacy Innovation Award",
                "Cloud Data Platform Excellence Award"
            ]
        },
        "Cybersecurity & Cloud Computing": {
            "Cybersecurity": [
                "Cybersecurity Company of the Year",
                "Best Network Security Solution",
                "Ethical Hacking Excellence Award",
                "Cloud Security Innovation Award",
                "Zero Trust Security Award",
                "Data Protection Excellence Award",
                "Cyber Defense Leadership Award"
            ],
            "Cloud & DevOps": [
                "Cloud Service Provider of the Year",
                "Best Cloud Migration Project",
                "DevOps Excellence Award",
                "Infrastructure as a Service Award",
                "Platform as a Service Excellence Award",
                "Hybrid Cloud Innovation Award"
            ]
        },
        "Blockchain, Web3 & Emerging Tech": {
            "Blockchain Excellence": [
                "Blockchain Startup of the Year",
                "Best DeFi Innovation Award",
                "Web3 Platform Excellence Award",
                "Smart Contract Innovation Award",
                "Crypto Security Excellence Award"
            ],
            "Emerging Technologies": [
                "AR/VR Innovation Award",
                "Metaverse Platform Excellence Award",
                "Quantum Computing Breakthrough Award",
                "IoT Innovation Award",
                "Robotics & Automation Excellence Award"
            ]
        },
        "Digital Transformation – Enterprise": {
            "Corporate Digitalization": [
                "Best Digital Transformation Initiative",
                "Smart Enterprise Award",
                "Digital Banking Transformation Award",
                "Industry 4.0 Excellence Award",
                "Digital Supply Chain Innovation Award",
                "Digital HR Transformation Award",
                "Smart Manufacturing Initiative Award"
            ],
            "Customer Experience": [
                "Digital Customer Experience Award",
                "Omnichannel Innovation Award",
                "UX/UI Excellence Award",
                "Mobile App Innovation Award"
            ]
        },
        "Startups & Innovation Ecosystem": {
            "Startup Excellence": [
                "Tech Startup of the Year",
                "Most Innovative Tech Startup",
                "Disruptive Innovation Award",
                "Emerging SaaS Startup Award",
                "DeepTech Innovation Award",
                "AgriTech Innovation Award",
                "HealthTech Startup Award"
            ],
            "Incubation & Acceleration": [
                "Best Tech Incubator",
                "Startup Accelerator Excellence Award",
                "Innovation Hub of the Year"
            ]
        },
        "E-Commerce & Digital Platforms": {
            "Platform Excellence": [
                "Best E-Commerce Platform",
                "Digital Marketplace of the Year",
                "B2B Platform Excellence Award",
                "D2C Brand Technology Award",
                "Online Payment Innovation Award"
            ],
            "MarTech & AdTech": [
                "Digital Marketing Technology Award",
                "AdTech Innovation Award",
                "SEO/SEM Excellence Award",
                "Marketing Automation Excellence Award"
            ]
        },
        "Telecom & Connectivity": {
            "Telecommunication Excellence": [
                "Telecom Company of the Year",
                "5G Innovation Award",
                "Best Broadband Service Provider",
                "Satellite Communication Excellence Award",
                "Smart City Connectivity Award"
            ]
        },
        "Leadership & Individual Awards": {
            "Tech Leadership": [
                "Tech CEO of the Year",
                "CIO of the Year",
                "CTO of the Year",
                "Chief Digital Officer Award",
                "Women Leader in Technology Award",
                "Young Tech Entrepreneur Award",
                "Tech Influencer of the Year"
            ],
            "Lifetime & Visionary": [
                "Lifetime Achievement in Technology",
                "Digital Visionary Award",
                "Global Tech Icon Award"
            ]
        },
        "Sustainability & Ethical Tech": {
            "Green Tech": [
                "Green Technology Innovation Award",
                "Sustainable IT Infrastructure Award",
                "Energy Efficient Data Center Award",
                "Carbon Neutral Technology Award"
            ],
            "Ethical & Inclusive Tech": [
                "Tech for Social Impact Award",
                "Inclusive Technology Award",
                "Digital Accessibility Excellence Award"
            ]
        },
        "Government & Public Sector Digitalization": {
            "e-Governance": [
                "Best e-Governance Initiative",
                "Digital Public Service Award",
                "Smart Governance Innovation Award",
                "Digital India Excellence Award"
            ]
        },
        "Special Recognition": {
            "Brand & Legacy": [
                "Iconic Technology Brand of the Decade",
                "Fastest Growing Tech Company",
                "Global Digital Excellence Award",
                "Customer Trust Excellence Award"
            ]
        }
    },
    "Finance & Banking": {
        "Banking Institutions": {
            "Overall Banking Excellence": [
                "Bank of the Year",
                "Best Public Sector Bank",
                "Best Private Sector Bank",
                "Best International Bank",
                "Best Regional Bank",
                "Fastest Growing Bank Award",
                "Most Trusted Bank Brand",
                "Customer Service Excellence in Banking"
            ],
            "Retail & Corporate Banking": [
                "Excellence in Retail Banking",
                "Best Corporate Banking Services",
                "Best SME Banking Services",
                "Best NRI Banking Services",
                "Excellence in Trade Finance",
                "Best Loan & Credit Services"
            ],
            "Digital Banking": [
                "Best Digital Bank",
                "Best Mobile Banking App",
                "Digital Customer Experience Award",
                "Innovation in Online Banking",
                "AI-Powered Banking Excellence Award"
            ]
        },
        "FinTech & Digital Finance": {
            "FinTech Excellence": [
                "FinTech Startup of the Year",
                "Most Innovative FinTech Company",
                "Best Payment Gateway Provider",
                "Digital Wallet Innovation Award",
                "Cross-Border Payment Excellence Award",
                "Blockchain in Finance Award",
                "Embedded Finance Innovation Award",
                "Open Banking Excellence Award"
            ],
            "Lending & Credit Tech": [
                "Best Digital Lending Platform",
                "P2P Lending Excellence Award",
                "BNPL Innovation Award",
                "Credit Scoring Innovation Award"
            ]
        },
        "Insurance Sector": {
            "Insurance Excellence": [
                "Insurance Company of the Year",
                "Best Life Insurance Provider",
                "Best General Insurance Company",
                "Health Insurance Excellence Award",
                "Digital Insurance Innovation Award",
                "Claims Settlement Excellence Award"
            ],
            "InsurTech Innovation": [
                "InsurTech Startup of the Year",
                "AI in Insurance Innovation Award",
                "Insurance Customer Experience Award"
            ]
        },
        "Investment & Wealth Management": {
            "Asset & Wealth Management": [
                "Best Asset Management Company",
                "Wealth Management Excellence Award",
                "Best Mutual Fund House",
                "Investment Advisory Excellence Award",
                "Portfolio Management Excellence Award",
                "Private Equity Excellence Award",
                "Venture Capital Firm of the Year"
            ],
            "Alternative Investments": [
                "Hedge Fund Excellence Award",
                "Real Estate Investment Excellence Award",
                "ESG Investment Leadership Award"
            ]
        },
        "Capital Markets & Stock Exchange": {
            "Market Excellence": [
                "Stock Exchange of the Year",
                "Best Brokerage Firm",
                "Capital Market Innovation Award",
                "IPO Advisory Excellence Award",
                "Equity Research Excellence Award",
                "Derivatives Market Excellence Award"
            ]
        },
        "NBFC & Microfinance": {
            "NBFC Excellence": [
                "NBFC of the Year",
                "Best Gold Loan Company",
                "Best Consumer Finance Company",
                "Housing Finance Excellence Award"
            ],
            "Financial Inclusion": [
                "Microfinance Institution of the Year",
                "Financial Inclusion Champion Award",
                "Rural Banking Excellence Award",
                "Women Empowerment through Finance Award"
            ]
        },
        "Risk, Compliance & Governance": {
            "Risk Management": [
                "Risk Management Excellence Award",
                "Fraud Prevention Innovation Award",
                "AML & Compliance Excellence Award",
                "Cyber Risk Excellence in Finance"
            ],
            "Governance": [
                "Best Corporate Governance in Finance",
                "Ethical Banking Leadership Award"
            ]
        },
        "ESG & Sustainable Finance": {
            "Green Finance": [
                "Green Finance Initiative Award",
                "Sustainable Banking Excellence Award",
                "Climate Finance Leadership Award",
                "Carbon Neutral Finance Institution Award"
            ],
            "Impact Finance": [
                "Social Impact Investment Award",
                "Sustainable Investment Fund of the Year"
            ]
        },
        "Leadership & Individual Awards": {
            "Executive Leadership": [
                "Banking CEO of the Year",
                "CFO of the Year – Financial Sector",
                "FinTech Visionary Award",
                "Women Leader in Finance Award",
                "Young Financial Leader Award",
                "Digital Banking Leader Award"
            ],
            "Lifetime & Iconic": [
                "Lifetime Achievement in Banking",
                "Finance Industry Icon Award",
                "Global Financial Visionary Award"
            ]
        },
        "Special Recognition": {
            "Brand & Performance": [
                "Iconic Financial Brand of the Decade",
                "Fastest Growing Financial Institution",
                "Customer Trust Excellence Award",
                "Innovation in Financial Services Award"
            ]
        }
    },
    "Sustainability & Environment": {
        "Corporate Sustainability": {
            "Overall Excellence": [
                "Sustainable Company of the Year",
                "ESG Leader of the Year",
                "Net Zero Commitment Award",
                "Carbon Reduction Excellence Award",
                "Sustainable Supply Chain Award",
                "Responsible Business Award",
                "Green Corporate Leadership Award"
            ],
            "ESG Performance": [
                "Best ESG Reporting Award",
                "Climate Risk Disclosure Excellence",
                "Sustainable Governance Award",
                "Diversity & Inclusion Impact Award",
                "Ethical Business Excellence Award"
            ]
        },
        "Renewable Energy & Clean Tech": {
            "Clean Energy Projects": [
                "Solar Energy Project of the Year",
                "Wind Energy Excellence Award",
                "Hydropower Innovation Award",
                "Green Hydrogen Innovation Award",
                "Bioenergy Excellence Award",
                "Energy Storage Innovation Award"
            ],
            "Renewable Companies": [
                "Renewable Energy Company of the Year",
                "CleanTech Startup of the Year",
                "Energy Efficiency Excellence Award",
                "Smart Grid Innovation Award"
            ]
        },
        "Climate Action & Carbon Management": {
            "Climate Initiatives": [
                "Climate Action Leadership Award",
                "Carbon Neutral Organization Award",
                "Carbon Capture Innovation Award",
                "Net Zero Initiative of the Year",
                "Green Building Excellence Award"
            ],
            "Adaptation & Resilience": [
                "Climate Resilience Project Award",
                "Sustainable Urban Development Award",
                "Disaster Risk Reduction Excellence Award"
            ]
        },
        "Water & Waste Management": {
            "Water Conservation": [
                "Water Sustainability Initiative Award",
                "Wastewater Treatment Innovation Award",
                "Water Recycling Excellence Award",
                "River Restoration Excellence Award"
            ],
            "Waste & Circular Economy": {
                "General": [
                    "Zero Waste Initiative Award",
                    "Recycling Innovation Award",
                    "Circular Economy Excellence Award",
                    "Plastic Reduction Leadership Award",
                    "E-Waste Management Excellence Award"
                ]
            }
        },
        "Agriculture & Biodiversity": {
            "Sustainable Agriculture": [
                "Organic Farming Excellence Award",
                "Agri Sustainability Innovation Award",
                "Sustainable Food Production Award",
                "Soil Health Excellence Award"
            ],
            "Biodiversity Protection": [
                "Wildlife Conservation Excellence Award",
                "Forest Restoration Leadership Award",
                "Marine Conservation Award",
                "Biodiversity Impact Award"
            ]
        },
        "Green Infrastructure & Urban Sustainability": {
            "Sustainable Cities": [
                "Smart Green City Award",
                "Urban Sustainability Excellence Award",
                "Eco-Friendly Infrastructure Award",
                "Green Mobility Innovation Award",
                "Sustainable Transport Initiative Award"
            ],
            "Buildings & Construction": [
                "LEED Certified Project of the Year",
                "Energy Efficient Building Award",
                "Green Architecture Excellence Award"
            ]
        },
        "Sustainable Finance & Investment": {
            "Green Finance": [
                "Green Finance Initiative Award",
                "Sustainable Investment Fund of the Year",
                "Climate Finance Leadership Award",
                "Impact Investment Excellence Award"
            ],
            "ESG Investors": [
                "ESG Investment Leader Award",
                "Sustainable Banking Excellence Award"
            ]
        },
        "NGO & Social Impact": {
            "Environmental NGOs": [
                "Environmental NGO of the Year",
                "Community Sustainability Leadership Award",
                "Grassroots Climate Action Award",
                "Environmental Education Excellence Award"
            ],
            "Youth & Community": [
                "Youth Climate Leader Award",
                "Community Green Initiative Award",
                "Women in Sustainability Leadership Award"
            ]
        },
        "Technology for Sustainability": {
            "Green Tech": [
                "Clean Technology Innovation Award",
                "AI for Climate Action Award",
                "IoT for Environmental Monitoring Award",
                "Sustainable Manufacturing Innovation Award"
            ],
            "Digital & Data Impact": [
                "Carbon Tracking Innovation Award",
                "Environmental Data Analytics Award",
                "Sustainability Reporting Tech Award"
            ]
        },
        "Leadership & Individual Awards": {
            "Executive Leadership": [
                "Sustainability Leader of the Year",
                "Chief Sustainability Officer Award",
                "Green Entrepreneur of the Year",
                "Women Leader in Sustainability Award",
                "Young Climate Innovator Award"
            ],
            "Lifetime & Recognition": [
                "Lifetime Achievement in Environmental Leadership",
                "Global Sustainability Visionary Award"
            ]
        },
        "Special Recognition": {
            "Brand & Legacy": [
                "Iconic Green Brand of the Decade",
                "Fastest Growing Sustainable Company",
                "Global Environmental Excellence Award",
                "Sustainability Impact Award"
            ]
        }
    },
    "Public & Government Sector": {
        "Governance & Public Administration": {
            "Overall Excellence": [
                "Government Department of the Year",
                "Public Administration Excellence Award",
                "Best State Government Initiative",
                "Best Central Government Initiative",
                "Outstanding District Administration Award",
                "Citizen-Centric Governance Award",
                "Transparent Governance Excellence Award"
            ],
            "Policy & Reform": [
                "Public Policy Innovation Award",
                "Administrative Reform Excellence Award",
                "Good Governance Leadership Award",
                "Ease of Doing Business Initiative Award"
            ]
        },
        "e-Governance & Digital Public Services": {
            "Digital Innovation": [
                "Best e-Governance Initiative",
                "Digital Public Service Award",
                "Smart Governance Innovation Award",
                "Digital Transformation in Government Award",
                "Best Government Portal Award",
                "AI in Public Service Award",
                "Blockchain in Governance Award"
            ],
            "Citizen Services": [
                "Online Citizen Service Excellence Award",
                "Digital Grievance Redressal Award",
                "Best Public Service App Award"
            ]
        },
        "Smart Cities & Urban Development": {
            "Urban Excellence": [
                "Smart City of the Year",
                "Urban Sustainability Excellence Award",
                "Best Municipal Corporation Award",
                "Clean City Excellence Award",
                "Public Transport Innovation Award",
                "Waste Management Leadership Award"
            ],
            "Infrastructure Development": [
                "Urban Infrastructure Excellence Award",
                "Affordable Housing Initiative Award",
                "Green Urban Development Award"
            ]
        },
        "Public Sector Undertakings (PSUs)": {
            "PSU Excellence": [
                "Public Sector Enterprise of the Year",
                "PSU Innovation Excellence Award",
                "Best Government-Owned Company",
                "PSU Sustainability Leadership Award",
                "Outstanding Contribution by PSU Award"
            ]
        },
        "Public Health & Education Initiatives": {
            "Healthcare Programs": [
                "Public Health Initiative of the Year",
                "Rural Healthcare Excellence Award",
                "Immunization & Vaccination Excellence Award",
                "Health Awareness Campaign Award"
            ],
            "Education Programs": [
                "Government Education Reform Award",
                "Skill Development Initiative Award",
                "Digital Education Excellence Award"
            ]
        },
        "Rural Development & Social Welfare": {
            "Community Development": [
                "Rural Development Excellence Award",
                "Women Empowerment Initiative Award",
                "Poverty Alleviation Excellence Award",
                "Social Justice Leadership Award",
                "Inclusive Governance Award"
            ],
            "Agriculture & Livelihood": [
                "Agricultural Development Excellence Award",
                "Farmer Welfare Initiative Award",
                "Self-Help Group Empowerment Award"
            ]
        },
        "Environment & Sustainability Programs": {
            "Green Government": [
                "Sustainable Governance Award",
                "Climate Action by Government Award",
                "Renewable Energy Adoption Excellence Award",
                "Water Conservation Initiative Award"
            ]
        },
        "Defense, Safety & Law Enforcement": {
            "Public Safety": [
                "Law Enforcement Excellence Award",
                "Disaster Management Leadership Award",
                "Fire & Emergency Services Excellence Award",
                "Traffic Management Innovation Award"
            ],
            "Defense Services": [
                "Defense Excellence Award",
                "Border Security Leadership Award"
            ]
        },
        "Transport & Infrastructure": {
            "Transport Innovation": [
                "Public Transport Excellence Award",
                "Railway Innovation Award",
                "Airport Development Excellence Award",
                "Road Infrastructure Excellence Award"
            ]
        },
        "Leadership & Individual Awards": {
            "Administrative Leadership": [
                "Public Service Leader of the Year",
                "IAS Officer Excellence Award",
                "Civil Services Leadership Award",
                "Young Public Administrator Award",
                "Women Leader in Public Service Award"
            ],
            "Lifetime Recognition": [
                "Lifetime Achievement in Public Service",
                "Governance Visionary Award"
            ]
        },
        "Special Recognition": {
            "National & Global Impact": [
                "National Governance Excellence Award",
                "Global Public Sector Leadership Award",
                "Public Trust Excellence Award",
                "Innovation in Public Policy Award"
            ]
        }
    },
    "Media, Culture & Sports": {
        "Media & Journalism": {
            "Print & News Media": [
                "Newspaper of the Year",
                "Regional Newspaper Excellence Award",
                "Investigative Journalism Award",
                "Political Reporting Excellence Award",
                "Business Journalism Award",
                "Best Editorial Leadership Award",
                "Photojournalism Excellence Award"
            ],
            "Television & Broadcast": [
                "News Channel of the Year",
                "Best TV Anchor Award",
                "Breaking News Coverage Award",
                "Documentary Excellence Award",
                "Best Talk Show Award"
            ],
            "Digital Media": [
                "Digital News Platform of the Year",
                "Best News Website Award",
                "Podcast Excellence Award",
                "Social Media Journalism Award",
                "YouTube News Channel Award"
            ]
        },
        "Film & Entertainment": {
            "Cinema Awards": [
                "Film of the Year",
                "Best Director Award",
                "Best Actor Award",
                "Best Actress Award",
                "Best Supporting Actor Award",
                "Best Screenplay Award",
                "Best Cinematography Award",
                "Best Music Director Award",
                "Best Editing Award"
            ],
            "OTT & Streaming": [
                "Best OTT Platform",
                "Web Series of the Year",
                "Best Digital Actor Award",
                "Streaming Innovation Award"
            ],
            "Production & Studios": [
                "Production House of the Year",
                "Animation Studio Excellence Award",
                "VFX Innovation Award"
            ]
        },
        "Advertising, PR & Marketing": {
            "Advertising Excellence": [
                "Ad Agency of the Year",
                "Creative Campaign of the Year",
                "Brand Storytelling Excellence Award",
                "Digital Advertising Innovation Award"
            ],
            "Public Relations": [
                "PR Agency of the Year",
                "Corporate Communication Excellence Award",
                "Crisis Communication Award"
            ]
        },
        "Arts & Culture": {
            "Performing Arts": [
                "Theatre Production of the Year",
                "Classical Music Excellence Award",
                "Dance Performance Excellence Award",
                "Folk Art Preservation Award"
            ],
            "Visual Arts": [
                "Artist of the Year",
                "Contemporary Art Excellence Award",
                "Photography Excellence Award",
                "Sculpture Innovation Award"
            ],
            "Cultural Heritage": [
                "Heritage Preservation Award",
                "Cultural Promotion Excellence Award",
                "Museum of the Year"
            ]
        },
        "Literature & Publishing": {
            "Literary Excellence": [
                "Author of the Year",
                "Book of the Year",
                "Poetry Excellence Award",
                "Fiction Excellence Award",
                "Non-Fiction Excellence Award"
            ],
            "Publishing Industry": [
                "Publishing House of the Year",
                "Literary Editor Excellence Award"
            ]
        },
        "Fashion & Lifestyle": {
            "Fashion Industry": [
                "Fashion Designer of the Year",
                "Sustainable Fashion Brand Award",
                "Luxury Fashion House Award",
                "Emerging Designer Award"
            ],
            "Lifestyle Media": [
                "Lifestyle Influencer Award",
                "Fashion Magazine of the Year"
            ]
        },
        "Sports – Individual & Team": {
            "Athlete Awards": [
                "Athlete of the Year",
                "Best Male Athlete Award",
                "Best Female Athlete Award",
                "Young Sports Talent Award",
                "Para Athlete Excellence Award"
            ],
            "Team & Federation": [
                "Sports Team of the Year",
                "Best Sports Federation Award",
                "Coaching Excellence Award",
                "Grassroots Sports Development Award"
            ]
        },
        "eSports & Digital Gaming": {
            "Gaming Excellence": [
                "eSports Player of the Year",
                "eSports Team of the Year",
                "Best Gaming Tournament Award",
                "Game Developer Excellence Award"
            ]
        },
        "Leadership & Lifetime Recognition": {
            "Media Leadership": [
                "Media Personality of the Year",
                "Entertainment Icon Award",
                "Sports Leadership Award",
                "Cultural Ambassador Award",
                "Women Leader in Media Award"
            ],
            "Lifetime Honors": [
                "Lifetime Achievement in Media",
                "Lifetime Achievement in Sports",
                "Cultural Legacy Award"
            ]
        },
        "Special Recognition": {
            "Impact & Innovation": [
                "Global Media Excellence Award",
                "Innovation in Entertainment Award",
                "Cultural Impact Award",
                "Social Impact Through Media Award"
            ]
        }
    }
}; export default categoryMap;
