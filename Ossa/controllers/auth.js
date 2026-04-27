const mongodb = require('../data/database');
const bcrypt = require('bcryptjs');

const createMember = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const { firstName, lastName, yearOfCompletion, location, email, password } = req.body;

        // 1. Validation: Prevent empty data
        if (!firstName || !email || !password) {
            return res.status(400).json({ message: 'First Name, Email, and Password are required.' });
        }

        // 2. Verification: Prevent duplicate accounts
        const existingMember = await db.collection('users').findOne({ email: email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // 3. Security: Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Data Formatting
        const memberData = {
            firstName,
            lastName,
            yearOfCompletion: parseInt(yearOfCompletion),
            location,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date()
        };

        // 5. Database Write
        const result = await db.collection('users').insertOne(memberData);
        console.log('Database Insert Result:', result);

        if (result.acknowledged && result.insertedId) {
            res.status(201).json({ 
                message: 'Member created successfully', 
                memberId: result.insertedId 
            });
        } else {
            res.status(500).json({ message: 'Failed to create member' });
        }
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const loginMember = async (req, res) => {
    try {
        const db = mongodb.getDatabase();
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required.' });
        }
        // Find user by email
        const user = await db.collection('users').findOne({ email: email.toLowerCase() });
        // if user not found or password does not match
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }
        // If login successful
        res.status(200).json({
            message: 'Login successful', 
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createMember, loginMember };