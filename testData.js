// testData.js - Script to add sample data to database

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const Sermon = require('./models/Sermon');
const Event = require('./models/Event');
const Member = require('./models/Member');
const Testimony = require('./models/Testimony');
const Newsletter = require('./models/Newsletter');

// Connect to database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Sample Sermons
const sermons = [
  {
    title: 'The Power of Faith',
    preacher: 'Pastor John Doe',
    date: new Date('2025-01-05'),
    scripture: 'Hebrews 11:1',
    description: 'A powerful message about faith and believing in God\'s promises.',
    category: 'Sunday Service',
    duration: '45:30',
    featured: true,
    published: true
  },
  {
    title: 'Walking in Divine Purpose',
    preacher: 'Pastor John Doe',
    date: new Date('2025-01-12'),
    scripture: 'Jeremiah 29:11',
    description: 'Discovering and walking in your God-given purpose.',
    category: 'Sunday Service',
    duration: '52:15',
    featured: false,
    published: true
  },
  {
    title: 'Prayer That Moves Mountains',
    preacher: 'Pastor Sarah Smith',
    date: new Date('2025-01-15'),
    scripture: 'Matthew 17:20',
    description: 'Understanding the power of prayer and how to pray effectively.',
    category: 'Midweek Service',
    duration: '38:45',
    featured: false,
    published: true,
    }
];

// Sample Events
const events = [
  {
    title: 'New Year Revival Service',
    description: 'Join us for a powerful revival service as we kick off the new year with praise, worship, and the Word of God.',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-02-03'),
    startTime: '6:00 PM',
    endTime: '9:00 PM',
    location: 'GRHCG Main Auditorium',
    address: 'Plot C7 L.F.I Estate Baiyeku Igbogbo, Ikorodu, Lagos',
    category: 'Conference',
    registrationRequired: true,
    capacity: 500,
    featured: true,
    published: true
  },
  {
    title: 'Youth Fellowship Night',
    description: 'An evening of worship, games, and fellowship for all youth members.',
    startDate: new Date('2025-01-25'),
    startTime: '5:00 PM',
    endTime: '8:00 PM',
    location: 'Church Youth Center',
    address: 'Plot C7 L.F.I Estate Baiyeku Igbogbo, Ikorodu, Lagos',
    category: 'Youth Event',
    registrationRequired: false,
    featured: false,
    published: true
  },
  {
    title: 'Community Outreach Program',
    description: 'Join us as we reach out to our community with food, medical care, and the gospel.',
    startDate: new Date('2025-02-10'),
    startTime: '9:00 AM',
    endTime: '3:00 PM',
    location: 'Igbogbo Community Center',
    address: 'Igbogbo, Ikorodu, Lagos',
    category: 'Outreach',
    registrationRequired: true,
    capacity: 100,
    featured: true,
    published: true
  },
  {
    title: 'Sunday Service',
    description: 'Join us for our weekly Sunday worship service.',
    startDate: new Date('2025-01-19'),
    startTime: '8:00 AM',
    endTime: '11:00 AM',
    location: 'GRHCG Main Auditorium',
    address: 'Plot C7 L.F.I Estate Baiyeku Igbogbo, Ikorodu, Lagos',
    category: 'Service',
    registrationRequired: false,
    featured: false,
    published: true
  }
];

// Sample Members
const members = [
  {
    firstName: 'Mary',
    lastName: 'Johnson',
    email: 'mary.johnson@example.com',
    phone: '08012345678',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Female',
    address: {
      street: '15 Victory Street',
      city: 'Ikorodu',
      state: 'Lagos',
      country: 'Nigeria'
    },
    membershipType: 'Active Member',
    baptized: true,
    baptismDate: new Date('2020-03-15'),
    ministries: ['Choir', 'Ushering'],
    status: 'Active'
  },
  {
    firstName: 'David',
    lastName: 'Williams',
    email: 'david.williams@example.com',
    phone: '08098765432',
    dateOfBirth: new Date('1985-08-22'),
    gender: 'Male',
    address: {
      street: '27 Grace Avenue',
      city: 'Ikorodu',
      state: 'Lagos',
      country: 'Nigeria'
    },
    membershipType: 'Active Member',
    baptized: true,
    baptismDate: new Date('2019-06-10'),
    ministries: ['Media Team', 'Protocol'],
    status: 'Active'
  },
  {
    firstName: 'Grace',
    lastName: 'Adeyemi',
    email: 'grace.adeyemi@example.com',
    phone: '08087654321',
    dateOfBirth: new Date('2005-12-03'),
    gender: 'Female',
    address: {
      street: '8 Faith Close',
      city: 'Ikorodu',
      state: 'Lagos',
      country: 'Nigeria'
    },
    membershipType: 'Youth',
    baptized: false,
    ministries: ['Youth Choir'],
    status: 'Active'
  }
];

// Sample Testimonies
const testimonies = [
  {
    name: 'Mrs. Elizabeth Okon',
    email: 'elizabeth.okon@example.com',
    title: 'Divine Healing from Cancer',
    content: 'I was diagnosed with stage 3 cancer and doctors gave me only months to live. But through the prayers of this church and my faith in God, I am completely healed! All medical tests now show no trace of cancer. God is faithful!',
    category: 'Healing',
    approved: true,
    featured: true,
    published: true
  },
  {
    name: 'Mr. Tunde Balogun',
    email: 'tunde.balogun@example.com',
    title: 'Business Breakthrough',
    content: 'My business was failing and I was about to close down. After joining the business breakthrough prayer series at GRHCG, everything turned around. Within 3 months, I secured major contracts and my business is now thriving. Glory to God!',
    category: 'Financial Breakthrough',
    approved: true,
    featured: true,
    published: true
  },
  {
    name: 'Sister Patience Okoro',
    email: 'patience.okoro@example.com',
    title: 'Marriage Restoration',
    content: 'My marriage was on the verge of divorce. Through counseling and prayers at GRHCG, God restored my home. My husband and I are now stronger than ever. Thank you Jesus!',
    category: 'Marriage/Family',
    approved: true,
    featured: false,
    published: true
  }
];

// Sample Newsletter Subscribers
const subscribers = [
  {
    email: 'subscriber1@example.com',
    name: 'John Subscriber',
    subscribed: true,
    source: 'Website'
  },
  {
    email: 'subscriber2@example.com',
    name: 'Jane Reader',
    subscribed: true,
    source: 'Event'
  },
  {
    email: 'subscriber3@example.com',
    name: 'Bob Newsletter',
    subscribed: true,
    source: 'Service'
  }
];

// Function to insert data
const insertData = async () => {
  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    await Sermon.deleteMany({});
    await Event.deleteMany({});
    await Member.deleteMany({});
    await Testimony.deleteMany({});
    await Newsletter.deleteMany({});
    
    console.log('🗑️  Cleared existing data');

    // Insert new data
    await Sermon.insertMany(sermons);
    console.log('✅ Sermons added');

    await Event.insertMany(events);
    console.log('✅ Events added');

    await Member.insertMany(members);
    console.log('✅ Members added');

    await Testimony.insertMany(testimonies);
    console.log('✅ Testimonies added');

    await Newsletter.insertMany(subscribers);
    console.log('✅ Newsletter subscribers added');

    console.log('\n🎉 All test data inserted successfully!');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    process.exit(1);
  }
};

// Run the function
insertData();