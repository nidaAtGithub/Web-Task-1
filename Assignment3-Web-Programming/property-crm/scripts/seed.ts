/**
 * Seed Script - Run with: npx ts-node --project tsconfig.json scripts/seed.ts
 * Or: node -r ts-node/register scripts/seed.ts
 *
 * Creates:
 * - 1 Admin user
 * - 3 Agent users
 * - 20 Sample leads (assigned to agents)
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/property-crm";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["admin", "agent"], default: "agent" },
  phone: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  propertyInterest: String,
  location: String,
  budget: Number,
  status: { type: String, default: "New" },
  priority: String,
  score: Number,
  notes: String,
  source: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  followUpDate: Date,
  lastActivityAt: { type: Date, default: Date.now },
}, { timestamps: true });

LeadSchema.pre("save", function(next: any) {
  if (this.budget > 20) { this.score = 90; this.priority = "High"; }
  else if (this.budget >= 10) { this.score = 60; this.priority = "Medium"; }
  else { this.score = 30; this.priority = "Low"; }
  next();
});

const ActivitySchema = new mongoose.Schema({
  lead: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  description: String,
  oldValue: String,
  newValue: String,
}, { timestamps: true });

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const User = mongoose.models.User || mongoose.model("User", UserSchema);
  const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
  const Activity = mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

  // Clear existing data
  await User.deleteMany({});
  await Lead.deleteMany({});
  await Activity.deleteMany({});
  console.log("🧹 Cleared existing data");

  const salt = await bcrypt.genSalt(12);

  // Create admin
  const admin = await User.create({
    name: "Super Admin",
    email: "admin@propertycrm.com",
    password: await bcrypt.hash("admin123", salt),
    role: "admin",
    phone: "03001111111",
  });

  // Create agents
  const agentData = [
    { name: "Ahmed Khan", email: "ahmed@propertycrm.com", phone: "03002222222" },
    { name: "Sara Ali", email: "sara@propertycrm.com", phone: "03003333333" },
    { name: "Bilal Hassan", email: "bilal@propertycrm.com", phone: "03004444444" },
  ];

  const agents = await Promise.all(
    agentData.map((a) =>
      User.create({ ...a, password: bcrypt.hashSync("agent123", salt), role: "agent" })
    )
  );

  console.log("👤 Created users: 1 admin + 3 agents");

  // Sample leads data
  const leadTemplates = [
    { name: "Muhammad Usman", email: "usman@example.com", phone: "03211234567", propertyInterest: "House", location: "DHA Phase 6, Lahore", budget: 25, source: "Facebook Ads", status: "New" },
    { name: "Fatima Malik", email: "fatima@example.com", phone: "03321234567", propertyInterest: "Apartment", location: "Gulberg III, Lahore", budget: 8, source: "Website", status: "Contacted" },
    { name: "Tariq Mehmood", email: "tariq@example.com", phone: "03451234567", propertyInterest: "Commercial Plot", location: "Blue Area, Islamabad", budget: 35, source: "Referral", status: "In Progress" },
    { name: "Ayesha Siddiqui", email: "ayesha@example.com", phone: "03111234567", propertyInterest: "Residential Plot", location: "Bahria Town, Karachi", budget: 15, source: "Walk-in", status: "Negotiation" },
    { name: "Imran Shah", email: "imran@example.com", phone: "03351234567", propertyInterest: "Farm House", location: "Bedian Road, Lahore", budget: 50, source: "Facebook Ads", status: "Closed Won" },
    { name: "Zainab Hussain", email: "zainab@example.com", phone: "03231234567", propertyInterest: "Shop", location: "Liberty Market, Lahore", budget: 12, source: "Website", status: "New" },
    { name: "Kamran Akhtar", email: "kamran@example.com", phone: "03021234567", propertyInterest: "Office", location: "F-7, Islamabad", budget: 22, source: "Referral", status: "Contacted" },
    { name: "Nadia Iqbal", email: "nadia@example.com", phone: "03061234567", propertyInterest: "House", location: "Model Town, Lahore", budget: 18, source: "Walk-in", status: "In Progress" },
    { name: "Waseem Baig", email: "waseem@example.com", phone: "03311234567", propertyInterest: "Residential Plot", location: "Gulshan-e-Iqbal, Karachi", budget: 7, source: "Facebook Ads", status: "New" },
    { name: "Hina Chaudhry", email: "hina@example.com", phone: "03411234567", propertyInterest: "Apartment", location: "Clifton, Karachi", budget: 30, source: "Website", status: "Negotiation" },
    { name: "Asad Raza", email: "asad@example.com", phone: "03501234567", propertyInterest: "Warehouse", location: "Quaid-e-Azam Industrial Area, Lahore", budget: 45, source: "Referral", status: "Closed Won" },
    { name: "Mariam Aslam", email: "mariam@example.com", phone: "03551234567", propertyInterest: "Commercial Plot", location: "Saddar, Karachi", budget: 9, source: "Walk-in", status: "Contacted" },
    { name: "Faisal Qureshi", email: "faisal@example.com", phone: "03031234567", propertyInterest: "House", location: "Johar Town, Lahore", budget: 14, source: "Facebook Ads", status: "New" },
    { name: "Sana Mirza", email: "sana@example.com", phone: "03071234567", propertyInterest: "Residential Plot", location: "E-11, Islamabad", budget: 28, source: "Website", status: "In Progress" },
    { name: "Adeel Farooq", email: "adeel@example.com", phone: "03181234567", propertyInterest: "Shop", location: "Main Boulevard, Lahore", budget: 6, source: "Referral", status: "Closed Lost" },
    { name: "Rabia Naveed", email: "rabia@example.com", phone: "03261234567", propertyInterest: "Apartment", location: "Hayatabad, Peshawar", budget: 11, source: "Walk-in", status: "New" },
    { name: "Shahid Latif", email: "shahid@example.com", phone: "03381234567", propertyInterest: "Farm House", location: "Raiwind Road, Lahore", budget: 60, source: "Facebook Ads", status: "Contacted" },
    { name: "Amna Rehman", email: "amna@example.com", phone: "03481234567", propertyInterest: "Office", location: "Korangi, Karachi", budget: 19, source: "Website", status: "In Progress" },
    { name: "Nawaz Gondal", email: "nawaz@example.com", phone: "03121234567", propertyInterest: "Residential Plot", location: "Wapda Town, Lahore", budget: 5, source: "Referral", status: "New" },
    { name: "Iqra Saeed", email: "iqra@example.com", phone: "03141234567", propertyInterest: "House", location: "Cantt, Rawalpindi", budget: 33, source: "Walk-in", status: "Negotiation" },
  ];

  const followUpDates = [
    new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // overdue
    new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // upcoming
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // upcoming
    null, null, null, null, null, null, null,
  ];

  const leads = [];
  for (let i = 0; i < leadTemplates.length; i++) {
    const agent = agents[i % agents.length];
    const followUpDate = followUpDates[i % followUpDates.length];

    const lead = new Lead({
      ...leadTemplates[i],
      assignedTo: agent._id,
      followUpDate,
      notes: `Initial inquiry about ${leadTemplates[i].propertyInterest.toLowerCase()} in ${leadTemplates[i].location}`,
    });
    await lead.save();
    leads.push(lead);
  }

  console.log(`🏠 Created ${leads.length} leads`);

  // Create activities
  const activities = [];
  for (const lead of leads) {
    activities.push({
      lead: lead._id,
      performedBy: admin._id,
      action: "lead_created",
      description: `Lead created for ${lead.name}`,
      newValue: lead.status,
    });

    if (lead.assignedTo) {
      activities.push({
        lead: lead._id,
        performedBy: admin._id,
        action: "lead_assigned",
        description: "Lead assigned to agent",
        newValue: lead.assignedTo.toString(),
      });
    }

    if (lead.status !== "New") {
      activities.push({
        lead: lead._id,
        performedBy: lead.assignedTo,
        action: "status_changed",
        description: `Status changed from New to ${lead.status}`,
        oldValue: "New",
        newValue: lead.status,
      });
    }
  }

  await Activity.insertMany(activities);
  console.log(`📝 Created ${activities.length} activities`);

  console.log("\n✅ Seed complete!");
  console.log("─".repeat(40));
  console.log("🔑 Login credentials:");
  console.log("  Admin:  admin@propertycrm.com / admin123");
  console.log("  Agent:  ahmed@propertycrm.com / agent123");
  console.log("  Agent:  sara@propertycrm.com  / agent123");
  console.log("  Agent:  bilal@propertycrm.com / agent123");
  console.log("─".repeat(40));

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
