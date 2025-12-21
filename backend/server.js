const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'secret'; // Change this in production

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '', // Your MySQL password
  database: 'tutorconnect_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check in student table
    let [students] = await promisePool.query(
      'SELECT student_id as id, first_name, last_name, email, password, "student" as role, student_num, acad_lvl, course, contact, accountStatus FROM student WHERE email = ?',
      [email]
    );

    if (students.length > 0) {
      const user = students[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (validPassword) {
        const token = jwt.sign({ id: user.id, email: user.email, role: 'student' }, JWT_SECRET, { expiresIn: '24h' });
        delete user.password;
        return res.json({ success: true, token, user });
      }
    }

    // Check in tutor table
    let [tutors] = await promisePool.query(
      'SELECT tutor_id as id, first_name, last_name, email, password, "tutor" as role, studentNum, course, level, contact, TutorVerify, accountStatus FROM tutor WHERE email = ?',
      [email]
    );

    if (tutors.length > 0) {
      const user = tutors[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (validPassword) {
        const token = jwt.sign({ id: user.id, email: user.email, role: 'tutor' }, JWT_SECRET, { expiresIn: '24h' });
        delete user.password;
        return res.json({ success: true, token, user });
      }
    }

    // Check in admin table
    let [admins] = await promisePool.query(
      'SELECT admin_id as id, name, email, password, "admin" as role FROM admin WHERE email = ?',
      [email]
    );

    if (admins.length > 0) {
      const user = admins[0];
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (validPassword) {
        const token = jwt.sign({ id: user.id, email: user.email, role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        delete user.password;
        return res.json({ success: true, token, user });
      }
    }

    res.status(401).json({ success: false, error: 'Invalid email or password' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { first_name, last_name, email, password, contact_number, student_number, level, course, role } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'Student') {
      const [result] = await promisePool.query(
        'INSERT INTO student (first_name, last_name, email, password, contact, student_num, acad_lvl, course, accountStatus, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, hashedPassword, contact_number, student_number, level, course, 'active', 'CICT']
      );
      
      res.json({ success: true, message: 'Student registered successfully', userId: result.insertId });
    } else if (role === 'Tutor') {
      const [result] = await promisePool.query(
        'INSERT INTO tutor (first_name, last_name, email, password, contact, studentNum, course, level, TutorVerify, accountStatus, department, credentials) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [first_name, last_name, email, hashedPassword, contact_number, student_number, course, level, 0, 'pending', 'CICT', '']
      );
      
      res.json({ success: true, message: 'Tutor registration pending approval', userId: result.insertId });
    } else {
      res.status(400).json({ success: false, error: 'Invalid role' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ==================== APPOINTMENT ROUTES ====================

// Get all appointments
app.get('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const [appointments] = await promisePool.query(`
      SELECT 
        a.apptID,
        a.date,
        a.time,
        a.apptStatus,
        s.first_name as student_first,
        s.last_name as student_last,
        t.first_name as tutor_first,
        t.last_name as tutor_last
      FROM appointment a
      JOIN student s ON a.student_id = s.student_id
      JOIN tutor t ON a.tutor_id = t.tutor_id
      ORDER BY a.date DESC, a.time DESC
    `);
    
    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get appointments by student ID
app.get('/api/appointments/student/:studentId', authenticateToken, async (req, res) => {
  try {
    const [appointments] = await promisePool.query(`
      SELECT 
        a.apptID,
        a.date,
        a.time,
        a.apptStatus,
        t.first_name as tutor_first,
        t.last_name as tutor_last
      FROM appointment a
      JOIN tutor t ON a.tutor_id = t.tutor_id
      WHERE a.student_id = ?
      ORDER BY a.date DESC, a.time DESC
    `, [req.params.studentId]);
    
    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Get student appointments error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get appointments by tutor ID
app.get('/api/appointments/tutor/:tutorId', authenticateToken, async (req, res) => {
  try {
    const [appointments] = await promisePool.query(`
      SELECT 
        a.apptID,
        a.date,
        a.time,
        a.apptStatus,
        s.first_name as student_first,
        s.last_name as student_last
      FROM appointment a
      JOIN student s ON a.student_id = s.student_id
      WHERE a.tutor_id = ?
      ORDER BY a.date DESC, a.time DESC
    `, [req.params.tutorId]);
    
    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Get tutor appointments error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Create appointment
app.post('/api/appointments', authenticateToken, async (req, res) => {
  try {
    const { student_id, tutor_id, date, time, admin_id } = req.body;
    
    const [result] = await promisePool.query(
      'INSERT INTO appointment (student_id, tutor_id, date, time, apptStatus, cancelRmrk, admin_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [student_id, tutor_id, date, time, 'pending', '', admin_id || 2]
    );
    
    res.json({ success: true, message: 'Appointment created', appointmentId: result.insertId });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update appointment
app.put('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { date, time, apptStatus } = req.body;
    
    await promisePool.query(
      'UPDATE appointment SET date = ?, time = ?, apptStatus = ? WHERE apptID = ?',
      [date, time, apptStatus, req.params.id]
    );
    
    res.json({ success: true, message: 'Appointment updated' });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Cancel appointment
app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
  try {
    const { cancelReason } = req.body;
    
    await promisePool.query(
      'UPDATE appointment SET apptStatus = ?, cancelRmrk = ? WHERE apptID = ?',
      ['cancelled', cancelReason || 'Cancelled by user', req.params.id]
    );
    
    res.json({ success: true, message: 'Appointment cancelled' });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ==================== USER ROUTES ====================

// Get all students
app.get('/api/students', authenticateToken, async (req, res) => {
  try {
    const [students] = await promisePool.query(
      'SELECT student_id, first_name, last_name, email, student_num, acad_lvl, course, contact, accountStatus FROM student'
    );
    
    res.json({ success: true, students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get all tutors
app.get('/api/tutors', authenticateToken, async (req, res) => {
  try {
    const [tutors] = await promisePool.query(
      'SELECT tutor_id, first_name, last_name, email, studentNum, course, level, contact, TutorVerify, accountStatus FROM tutor WHERE TutorVerify = 1'
    );
    
    res.json({ success: true, tutors });
  } catch (error) {
    console.error('Get tutors error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get pending tutors
app.get('/api/tutors/pending', authenticateToken, async (req, res) => {
  try {
    const [tutors] = await promisePool.query(
      'SELECT tutor_id, first_name, last_name, email, studentNum, course, level, credentials, accountStatus FROM tutor WHERE TutorVerify = 0'
    );
    
    res.json({ success: true, tutors });
  } catch (error) {
    console.error('Get pending tutors error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Approve tutor
app.put('/api/tutors/:id/approve', authenticateToken, async (req, res) => {
  try {
    await promisePool.query(
      'UPDATE tutor SET TutorVerify = 1, accountStatus = ? WHERE tutor_id = ?',
      ['active', req.params.id]
    );
    
    res.json({ success: true, message: 'Tutor approved' });
  } catch (error) {
    console.error('Approve tutor error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Reject tutor
app.delete('/api/tutors/:id/reject', authenticateToken, async (req, res) => {
  try {
    await promisePool.query(
      'DELETE FROM tutor WHERE tutor_id = ?',
      [req.params.id]
    );
    
    res.json({ success: true, message: 'Tutor rejected and removed' });
  } catch (error) {
    console.error('Reject tutor error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ==================== SPECIALIZATION ROUTES ====================

// Get tutor specializations
app.get('/api/specializations/:tutorId', authenticateToken, async (req, res) => {
  try {
    const [specs] = await promisePool.query(
      'SELECT * FROM specialization WHERE tutorID = ?',
      [req.params.tutorId]
    );
    
    res.json({ success: true, specializations: specs });
  } catch (error) {
    console.error('Get specializations error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});