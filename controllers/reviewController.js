const Review = require('../models/Review');
const sendEmail = require('../utils/sendEmail');

exports.submitReview = async (req, res) => {
    try {
        const { message } = req.body;

        // Validate user input
        if (!message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Create and save the review data
        const review = new Review({ message });
        await review.save();

        // Send notification email from the review email
        const reviewEmail = process.env.REVIEW_EMAIL || 'reviews@lantern.academy';
        const subject = 'New Review Submitted';
        const text = `A new review has been submitted:\n\n${message}`;

        // Send notification email to Lantern Academy
        await sendEmail('reviews@lantern.academy', subject, text, reviewEmail);

        res.status(201).json({ message: 'Review submitted successfully.' });
    } catch (error) {
        console.error('Error submitting review:', error.message);
        res.status(500).json({ error: 'An error occurred while submitting the review.' });
    }
};
