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
            "Frontend Development",
            "ATS/ICAN",
            "GMAT",
            "UI/UX Design",
            "Data Science/Analytics",
            "Backend Development",
            "Full Stack Development",
            "IELTS",
            "Digital Marketing",
            "Project Management",
            "Virtual Assistant",
            "Cyber Security",
            "Network Engineering"
        ],
        required: true
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);