const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    sponsor: {
        type: String,
        enum: ["Myself", "Other"],  // ✅ Updated to match the frontend dropdown
        default: "Myself"
    },
    selectedCourses: {
        type: [String],
        enum: [
            "UI/UX Design", "Data Science/Analytics", "Frontend Development", "Backend Development", "Full Stack Development", "ATS/ICAN", "GMAT", "IELTS", "Digital Marketing", "Project Management", "Virtual Assistant", "Cyber Security", "Network Engineering", "Mathematics", "English Language", "Physics", "Chemistry", "Biology", "Financial Accounting", "Literature in English"
        ],
        required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);