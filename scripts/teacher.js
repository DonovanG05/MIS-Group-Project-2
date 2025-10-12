// Teacher Dashboard JavaScript

// Sample data - in a real app, this would come from the database
const sampleData = {
  classes: [
    {
      id: 1,
      name: "Grade 3 Math",
      subject: "Mathematics",
      gradeLevel: "3",
      roomNumber: "Room 102",
      studentCount: 25,
      averageGrade: 87.5,
      teacher: "Sarah Johnson"
    },
    {
      id: 2,
      name: "Grade 4 Math",
      subject: "Mathematics", 
      gradeLevel: "4",
      roomNumber: "Room 102",
      studentCount: 23,
      averageGrade: 82.3,
      teacher: "Sarah Johnson"
    },
    {
      id: 3,
      name: "Grade 5 Math",
      subject: "Mathematics",
      gradeLevel: "5", 
      roomNumber: "Room 102",
      studentCount: 24,
      averageGrade: 89.1,
      teacher: "Sarah Johnson"
    }
  ],
  students: [
    {
      id: 1,
      firstName: "Emma",
      lastName: "Smith",
      gradeLevel: "3",
      parentEmail: "john.smith@email.com",
      parentPhone: "555-1001",
      attendance: "Present",
      medicalNotes: "No known allergies",
      lastGrade: 92
    },
    {
      id: 2,
      firstName: "Liam",
      lastName: "Smith", 
      gradeLevel: "5",
      parentEmail: "mary.smith@email.com",
      parentPhone: "555-1002",
      attendance: "Present",
      medicalNotes: "Mild asthma - inhaler available",
      lastGrade: 88
    },
    {
      id: 3,
      firstName: "Olivia",
      lastName: "Johnson",
      gradeLevel: "2",
      parentEmail: "robert.johnson@email.com", 
      parentPhone: "555-1003",
      attendance: "Late",
      medicalNotes: "No known allergies",
      lastGrade: 95
    },
    {
      id: 4,
      firstName: "Noah",
      lastName: "Johnson",
      gradeLevel: "6",
      parentEmail: "susan.johnson@email.com",
      parentPhone: "555-1004",
      attendance: "Present",
      medicalNotes: "No known allergies",
      lastGrade: 91
    },
    {
      id: 5,
      firstName: "Ava",
      lastName: "Brown",
      gradeLevel: "4",
      parentEmail: "michael.brown@email.com",
      parentPhone: "555-1005",
      attendance: "Present",
      medicalNotes: "No known allergies",
      lastGrade: 89
    }
  ],
  grades: [
    {
      id: 1,
      studentId: 1,
      studentName: "Emma Smith",
      assignmentName: "Addition and Subtraction Quiz",
      assignmentType: "Quiz",
      pointsEarned: 18,
      pointsPossible: 20,
      percentage: 90,
      letterGrade: "A-",
      date: "2024-09-15"
    },
    {
      id: 2,
      studentId: 1,
      studentName: "Emma Smith",
      assignmentName: "Multiplication Practice",
      assignmentType: "Homework",
      pointsEarned: 15,
      pointsPossible: 15,
      percentage: 100,
      letterGrade: "A+",
      date: "2024-09-19"
    },
    {
      id: 3,
      studentId: 2,
      studentName: "Liam Smith",
      assignmentName: "Fractions Worksheet",
      assignmentType: "Homework",
      pointsEarned: 12,
      pointsPossible: 15,
      percentage: 80,
      letterGrade: "B-",
      date: "2024-09-16"
    },
    {
      id: 4,
      studentId: 2,
      studentName: "Liam Smith",
      assignmentName: "Decimals Quiz",
      assignmentType: "Quiz",
      pointsEarned: 16,
      pointsPossible: 20,
      percentage: 80,
      letterGrade: "B-",
      date: "2024-09-22"
    },
    {
      id: 5,
      studentId: 5,
      studentName: "Ava Brown",
      assignmentName: "Multiplication Tables",
      assignmentType: "Quiz",
      pointsEarned: 20,
      pointsPossible: 20,
      percentage: 100,
      letterGrade: "A+",
      date: "2024-09-14"
    }
  ],
  announcements: [
    {
      id: 1,
      title: "Math Test Next Week",
      message: "Reminder that the Chapter 3 math test will be next Friday. Please encourage your child to study!",
      type: "reminder",
      date: "2024-09-20",
      sent: true
    },
    {
      id: 2,
      title: "Parent-Teacher Conferences",
      message: "Parent-teacher conferences are scheduled for next week. Please sign up for a time slot.",
      type: "event",
      date: "2024-09-18",
      sent: true
    },
    {
      id: 3,
      title: "Field Trip Permission Slips",
      message: "Field trip permission slips are due by Friday. Please return them as soon as possible.",
      type: "urgent",
      date: "2024-09-22",
      sent: false
    }
  ],
  parentTickets: [
    {
      id: 1,
      ticketNumber: "TKT-001",
      parentName: "John Smith",
      studentName: "Emma Smith",
      className: "Grade 3 Math",
      subject: "Homework Help Needed",
      message: "Emma is struggling with the multiplication homework. Could you provide some additional resources?",
      status: "Open",
      priority: "Medium",
      date: "2024-09-20",
      response: ""
    },
    {
      id: 2,
      ticketNumber: "TKT-002",
      parentName: "Mary Smith",
      studentName: "Liam Smith",
      className: "Grade 5 Math",
      subject: "Grade Concern",
      message: "I noticed Liam's recent test grade was lower than usual. Can we schedule a meeting to discuss?",
      status: "In Progress",
      priority: "High",
      date: "2024-09-19",
      response: "I'd be happy to meet with you. Let me check my schedule and get back to you."
    },
    {
      id: 3,
      ticketNumber: "TKT-003",
      parentName: "Robert Johnson",
      studentName: "Olivia Johnson",
      className: "Grade 2 Math",
      subject: "Behavior Question",
      message: "Olivia mentioned she had to stay in for recess. Can you explain what happened?",
      status: "Resolved",
      priority: "Low",
      date: "2024-09-18",
      response: "Olivia was having trouble focusing during the lesson. We had a brief discussion about classroom expectations and she's been doing much better since."
    },
    {
      id: 4,
      ticketNumber: "TKT-004",
      parentName: "Susan Johnson",
      studentName: "Noah Johnson",
      className: "Grade 6 Math",
      subject: "Extra Credit Opportunity",
      message: "Noah is very interested in math. Are there any extra credit opportunities available?",
      status: "Open",
      priority: "Low",
      date: "2024-09-21",
      response: ""
    },
    {
      id: 5,
      ticketNumber: "TKT-005",
      parentName: "Michael Brown",
      studentName: "Ava Brown",
      className: "Grade 4 Math",
      subject: "Field Trip Question",
      message: "When is the math museum field trip? Ava is very excited about it.",
      status: "Closed",
      priority: "Low",
      date: "2024-09-17",
      response: "The field trip is scheduled for October 15th. Permission slips will be sent home next week."
    }
  ],
  parentForms: [
    {
      id: 1,
      studentName: "Emma Smith",
      className: "Grade 3 Math",
      formType: "Medical",
      title: "Medical Information Update",
      submittedDate: "2024-09-20",
      status: "New",
      content: "Updated emergency contact information and added new allergy information."
    },
    {
      id: 2,
      studentName: "Liam Smith",
      className: "Grade 5 Math",
      formType: "Emergency",
      title: "Emergency Contact Change",
      submittedDate: "2024-09-19",
      status: "New",
      content: "Changed primary emergency contact from father to grandmother due to work schedule."
    },
    {
      id: 3,
      studentName: "Olivia Johnson",
      className: "Grade 2 Math",
      formType: "Field Trip",
      title: "Field Trip Permission",
      submittedDate: "2024-09-18",
      status: "Approved",
      content: "Permission granted for math museum field trip on October 15th."
    },
    {
      id: 4,
      studentName: "Noah Johnson",
      className: "Grade 6 Math",
      formType: "Behavior",
      title: "Behavior Update Request",
      submittedDate: "2024-09-21",
      status: "Pending",
      content: "Requesting update on Noah's behavior in class. He mentioned some concerns about group work."
    },
    {
      id: 5,
      studentName: "Ava Brown",
      className: "Grade 4 Math",
      formType: "Medical",
      title: "Medication Authorization",
      submittedDate: "2024-09-17",
      status: "Approved",
      content: "Authorization for daily medication during school hours."
    }
  ],
  messageHistory: [
    {
      id: 1,
      date: "2024-09-20",
      recipient: "John Smith",
      student: "Emma Smith",
      type: "Email",
      subject: "Homework Help Resources",
      status: "Sent"
    },
    {
      id: 2,
      date: "2024-09-19",
      recipient: "Mary Smith",
      student: "Liam Smith",
      type: "SMS",
      subject: "Grade Discussion Meeting",
      status: "Delivered"
    },
    {
      id: 3,
      date: "2024-09-18",
      recipient: "Robert Johnson",
      student: "Olivia Johnson",
      type: "Email",
      subject: "Behavior Discussion",
      status: "Read"
    },
    {
      id: 4,
      date: "2024-09-17",
      recipient: "Susan Johnson",
      student: "Noah Johnson",
      type: "In-App",
      subject: "Extra Credit Information",
      status: "Sent"
    },
    {
      id: 5,
      date: "2024-09-16",
      recipient: "Michael Brown",
      student: "Ava Brown",
      type: "Email",
      subject: "Field Trip Details",
      status: "Read"
    }
  ],
  messageTemplates: {
    absence: {
      subject: "Absence Notification - {student_name}",
      message: "Dear {parent_name},\n\nThis is to inform you that {student_name} was marked absent from {class_name} today. If this absence was planned or if you have any questions, please contact me.\n\nBest regards,\nSarah Johnson"
    },
    homework: {
      subject: "Missing Homework - {student_name}",
      message: "Dear {parent_name},\n\n{student_name} did not submit the {assignment} homework that was due today in {class_name}. Please encourage them to complete it and return it as soon as possible.\n\nBest regards,\nSarah Johnson"
    },
    lowGrade: {
      subject: "Grade Concern - {student_name}",
      message: "Dear {parent_name},\n\nI wanted to inform you that {student_name} received a {grade} on the recent {assignment} in {class_name}. I'd be happy to discuss ways we can help improve their performance.\n\nBest regards,\nSarah Johnson"
    },
    behavior: {
      subject: "Behavior Update - {student_name}",
      message: "Dear {parent_name},\n\nI wanted to share that {student_name} had some challenges with {behavior_issue} in {class_name} today. We discussed appropriate behavior and I'm confident they'll do better.\n\nBest regards,\nSarah Johnson"
    }
  }
};

let currentClass = null;
let currentTab = 'classes';

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
  loadClasses();
});

function initializeDashboard() {
  // Set up tab navigation
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      switchTab(tabName);
    });
  });
}

function setupEventListeners() {
  // Class form submission
  const addClassForm = document.getElementById('addClassForm');
  if (addClassForm) {
    addClassForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addClass();
    });
  }

  // Grade form submission
  const addGradeForm = document.getElementById('addGradeForm');
  if (addGradeForm) {
    addGradeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addGrade();
    });
  }

  // Announcement form submission
  const newAnnouncementForm = document.getElementById('newAnnouncementForm');
  if (newAnnouncementForm) {
    newAnnouncementForm.addEventListener('submit', function(e) {
      e.preventDefault();
      createAnnouncement();
    });
  }

  // Profile form submission
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveProfile();
    });
  }
}

function switchTab(tabName) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
    content.classList.remove('active');
    content.style.display = 'none';
  });

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  // Show selected tab
  const selectedTab = document.getElementById(tabName + '-tab');
  if (selectedTab) {
    selectedTab.classList.add('active');
    selectedTab.style.display = 'block';
  }

  // Add active class to clicked button
  const clickedButton = document.querySelector(`[data-tab="${tabName}"]`);
  if (clickedButton) {
    clickedButton.classList.add('active');
  }

  currentTab = tabName;

  // Load tab-specific data
  switch(tabName) {
    case 'classes':
      loadClasses();
      break;
    case 'parent-communication':
      loadParentCommunication();
      break;
    case 'announcements':
      loadAnnouncements();
      break;
    case 'reports':
      loadReports();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

function loadClasses() {
  const classesGrid = document.getElementById('classes-grid');
  if (!classesGrid) return;

  classesGrid.innerHTML = '';

  sampleData.classes.forEach(classItem => {
    const classCard = createClassCard(classItem);
    classesGrid.appendChild(classCard);
  });
}

function createClassCard(classItem) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-4';

  col.innerHTML = `
    <div class="card class-card h-100" onclick="enterClass(${classItem.id})">
      <div class="card-body">
        <h5 class="card-title">${classItem.name}</h5>
        <p class="card-text text-muted">${classItem.subject} - Grade ${classItem.gradeLevel}</p>
        <p class="card-text"><i class="bi bi-geo-alt me-1"></i>${classItem.roomNumber}</p>
        <div class="class-stats">
          <div class="stat-item">
            <div class="stat-number">${classItem.studentCount}</div>
            <div class="stat-label">Students</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${classItem.averageGrade}%</div>
            <div class="stat-label">Avg Grade</div>
          </div>
        </div>
      </div>
    </div>
  `;

  return col;
}

function enterClass(classId) {
  currentClass = sampleData.classes.find(c => c.id === classId);
  
  // Hide classes tab, show class detail
  document.getElementById('classes-tab').style.display = 'none';
  document.getElementById('class-detail').style.display = 'block';
  
  // Update class detail title
  document.getElementById('class-detail-title').textContent = currentClass.name;
  
  // Load class-specific data
  loadClassStudents();
  loadClassGrades();
  loadClassAttendance();
}

function showClassesTab() {
  document.getElementById('class-detail').style.display = 'none';
  document.getElementById('classes-tab').style.display = 'block';
  currentClass = null;
}

function loadClassStudents() {
  const studentsTable = document.getElementById('students-table');
  if (!studentsTable) return;

  studentsTable.innerHTML = '';

  sampleData.students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.firstName} ${student.lastName}</td>
      <td>Grade ${student.gradeLevel}</td>
      <td>
        <div>${student.parentEmail}</div>
        <small class="text-muted">${student.parentPhone}</small>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewStudent(${student.id})">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary" onclick="editStudent(${student.id})">
          <i class="bi bi-pencil"></i>
        </button>
      </td>
    `;
    studentsTable.appendChild(row);
  });
}

function loadClassGrades() {
  const gradesTable = document.getElementById('grades-table');
  if (!gradesTable) return;

  gradesTable.innerHTML = '';

  sampleData.grades.forEach(grade => {
    const row = document.createElement('tr');
    const gradeClass = getGradeClass(grade.letterGrade);
    
    row.innerHTML = `
      <td>${grade.studentName}</td>
      <td>${grade.assignmentName}</td>
      <td><span class="badge bg-secondary">${grade.assignmentType}</span></td>
      <td>${grade.pointsEarned}/${grade.pointsPossible}</td>
      <td>
        <span class="grade-badge grade-${gradeClass}">${grade.letterGrade}</span>
        <small class="text-muted d-block">${grade.percentage}%</small>
      </td>
      <td>${formatDate(grade.date)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editGrade(${grade.id})">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteGrade(${grade.id})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    gradesTable.appendChild(row);
  });

  updateGradeSummary();
}

function loadClassAttendance() {
  const attendanceTable = document.getElementById('attendance-table');
  if (!attendanceTable) return;

  attendanceTable.innerHTML = '';

  // Sample attendance data
  const attendanceData = [
    { date: '2024-09-20', student: 'Emma Smith', status: 'Present', notes: '' },
    { date: '2024-09-20', student: 'Liam Smith', status: 'Present', notes: '' },
    { date: '2024-09-20', student: 'Olivia Johnson', status: 'Late', notes: 'Bus delay' },
    { date: '2024-09-19', student: 'Emma Smith', status: 'Present', notes: '' },
    { date: '2024-09-19', student: 'Liam Smith', status: 'Absent', notes: 'Sick' }
  ];

  attendanceData.forEach(attendance => {
    const row = document.createElement('tr');
    const statusClass = getAttendanceClass(attendance.status);
    
    row.innerHTML = `
      <td>${formatDate(attendance.date)}</td>
      <td>${attendance.student}</td>
      <td>
        <span class="attendance-status attendance-${statusClass}"></span>
        ${attendance.status}
      </td>
      <td>${attendance.notes}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="editAttendance(${attendance.date})">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteAttendance(${attendance.date})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    attendanceTable.appendChild(row);
  });
}

function loadAnnouncements() {
  const announcementsList = document.getElementById('announcements-list');
  if (!announcementsList) return;

  announcementsList.innerHTML = '';

  sampleData.announcements.forEach(announcement => {
    const announcementCard = createAnnouncementCard(announcement);
    announcementsList.appendChild(announcementCard);
  });
}

function createAnnouncementCard(announcement) {
  const card = document.createElement('div');
  card.className = `announcement-card card announcement-${announcement.type}`;
  
  const statusBadge = announcement.sent ? 
    '<span class="badge bg-success">Sent</span>' : 
    '<span class="badge bg-warning">Draft</span>';

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">${announcement.title}</h6>
        ${statusBadge}
      </div>
      <p class="card-text">${announcement.message}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">${formatDate(announcement.date)}</small>
        <div>
          <button class="btn btn-sm btn-outline-primary me-1" onclick="editAnnouncement(${announcement.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteAnnouncement(${announcement.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function addClass() {
  const className = document.getElementById('className').value;
  const subject = document.getElementById('subject').value;
  const gradeLevel = document.getElementById('gradeLevel').value;
  const roomNumber = document.getElementById('roomNumber').value;

  if (!className || !subject || !gradeLevel) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newClass = {
    id: sampleData.classes.length + 1,
    name: className,
    subject: subject,
    gradeLevel: gradeLevel,
    roomNumber: roomNumber,
    studentCount: 0,
    averageGrade: 0,
    teacher: "Sarah Johnson"
  };

  sampleData.classes.push(newClass);
  loadClasses();
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addClassModal'));
  modal.hide();
  
  // Reset form
  document.getElementById('addClassForm').reset();
  
  showAlert('Class added successfully!', 'success');
}

function addGrade() {
  const assignmentName = document.getElementById('assignmentName').value;
  const assignmentType = document.getElementById('assignmentType').value;
  const pointsEarned = parseFloat(document.getElementById('pointsEarned').value);
  const pointsPossible = parseFloat(document.getElementById('pointsPossible').value);
  const studentId = parseInt(document.getElementById('studentSelect').value);
  const dueDate = document.getElementById('dueDate').value;
  const teacherNotes = document.getElementById('teacherNotes').value;

  if (!assignmentName || !assignmentType || !pointsEarned || !pointsPossible || !studentId) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const student = sampleData.students.find(s => s.id === studentId);
  const percentage = Math.round((pointsEarned / pointsPossible) * 100);
  const letterGrade = calculateLetterGrade(percentage);

  const newGrade = {
    id: sampleData.grades.length + 1,
    studentId: studentId,
    studentName: `${student.firstName} ${student.lastName}`,
    assignmentName: assignmentName,
    assignmentType: assignmentType,
    pointsEarned: pointsEarned,
    pointsPossible: pointsPossible,
    percentage: percentage,
    letterGrade: letterGrade,
    date: new Date().toISOString().split('T')[0]
  };

  sampleData.grades.push(newGrade);
  loadClassGrades();
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addGradeModal'));
  modal.hide();
  
  // Reset form
  document.getElementById('addGradeForm').reset();
  
  showAlert('Grade added successfully!', 'success');
}

function createAnnouncement() {
  const title = document.getElementById('announcementTitle').value;
  const message = document.getElementById('announcementMessage').value;
  const type = document.getElementById('announcementType').value;

  if (!title || !message || !type) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newAnnouncement = {
    id: sampleData.announcements.length + 1,
    title: title,
    message: message,
    type: type,
    date: new Date().toISOString().split('T')[0],
    sent: false
  };

  sampleData.announcements.push(newAnnouncement);
  loadAnnouncements();
  
  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('newAnnouncementModal'));
  modal.hide();
  
  // Reset form
  document.getElementById('newAnnouncementForm').reset();
  
  showAlert('Announcement created successfully!', 'success');
}

function updateGradeSummary() {
  const gradeSummary = document.getElementById('grade-summary');
  if (!gradeSummary) return;

  const totalAssignments = sampleData.grades.length;
  const averageGrade = sampleData.grades.reduce((sum, grade) => sum + grade.percentage, 0) / totalAssignments;
  const aGrades = sampleData.grades.filter(grade => grade.letterGrade.startsWith('A')).length;
  const bGrades = sampleData.grades.filter(grade => grade.letterGrade.startsWith('B')).length;
  const cGrades = sampleData.grades.filter(grade => grade.letterGrade.startsWith('C')).length;

  gradeSummary.innerHTML = `
    <div class="grade-summary-item">
      <span class="grade-summary-label">Total Assignments</span>
      <span class="grade-summary-value">${totalAssignments}</span>
    </div>
    <div class="grade-summary-item">
      <span class="grade-summary-label">Average Grade</span>
      <span class="grade-summary-value">${Math.round(averageGrade)}%</span>
    </div>
    <div class="grade-summary-item">
      <span class="grade-summary-label">A Grades</span>
      <span class="grade-summary-value">${aGrades}</span>
    </div>
    <div class="grade-summary-item">
      <span class="grade-summary-label">B Grades</span>
      <span class="grade-summary-value">${bGrades}</span>
    </div>
    <div class="grade-summary-item">
      <span class="grade-summary-label">C Grades</span>
      <span class="grade-summary-value">${cGrades}</span>
    </div>
  `;
}

function calculateLetterGrade(percentage) {
  if (percentage >= 97) return 'A+';
  if (percentage >= 93) return 'A';
  if (percentage >= 90) return 'A-';
  if (percentage >= 87) return 'B+';
  if (percentage >= 83) return 'B';
  if (percentage >= 80) return 'B-';
  if (percentage >= 77) return 'C+';
  if (percentage >= 73) return 'C';
  if (percentage >= 70) return 'C-';
  if (percentage >= 67) return 'D+';
  if (percentage >= 63) return 'D';
  if (percentage >= 60) return 'D-';
  return 'F';
}

function getGradeClass(letterGrade) {
  if (letterGrade.startsWith('A')) return 'A';
  if (letterGrade.startsWith('B')) return 'B';
  if (letterGrade.startsWith('C')) return 'C';
  if (letterGrade.startsWith('D')) return 'D';
  return 'F';
}

function getAttendanceClass(status) {
  const statusMap = {
    'Present': 'present',
    'Absent': 'absent',
    'Late': 'late',
    'Excused': 'excused'
  };
  return statusMap[status] || 'absent';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Action functions (placeholders for now)
function viewStudent(studentId) {
  showAlert(`Viewing student ${studentId}`, 'info');
}

function editStudent(studentId) {
  showAlert(`Editing student ${studentId}`, 'info');
}

function editGrade(gradeId) {
  showAlert(`Editing grade ${gradeId}`, 'info');
}

function deleteGrade(gradeId) {
  if (confirm('Are you sure you want to delete this grade?')) {
    const index = sampleData.grades.findIndex(g => g.id === gradeId);
    if (index > -1) {
      sampleData.grades.splice(index, 1);
      loadClassGrades();
      showAlert('Grade deleted successfully!', 'success');
    }
  }
}

function editAttendance(attendanceId) {
  showAlert(`Editing attendance ${attendanceId}`, 'info');
}

function deleteAttendance(attendanceId) {
  if (confirm('Are you sure you want to delete this attendance record?')) {
    showAlert('Attendance record deleted!', 'success');
  }
}

function editAnnouncement(announcementId) {
  showAlert(`Editing announcement ${announcementId}`, 'info');
}

function deleteAnnouncement(announcementId) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    const index = sampleData.announcements.findIndex(a => a.id === announcementId);
    if (index > -1) {
      sampleData.announcements.splice(index, 1);
      loadAnnouncements();
      showAlert('Announcement deleted successfully!', 'success');
    }
  }
}

function saveProfile() {
  showAlert('Profile updated successfully!', 'success');
}

function saveGradingScale() {
  showAlert('Grading scale saved!', 'success');
}

function exportStudentList() {
  showAlert('Student list exported!', 'success');
}

function printStudentList() {
  window.print();
}

function exportGrades() {
  showAlert('Grades exported!', 'success');
}

function generateGradeReport() {
  showAlert('Grade report generated!', 'success');
}

function generateAttendanceReport() {
  showAlert('Attendance report generated!', 'success');
}

function generateProgressReport() {
  showAlert('Progress report generated!', 'success');
}

// Load tab-specific data
function loadReports() {
  // Reports are already loaded in the HTML
}

function loadSettings() {
  // Settings are already loaded in the HTML
}

// Parent Communication Functions
function loadParentCommunication() {
  loadParentTickets();
  loadParentForms();
  loadMessageHistory();
  updateCommunicationStats();
}

function loadParentTickets() {
  const ticketsTable = document.getElementById('tickets-table');
  if (!ticketsTable) return;

  ticketsTable.innerHTML = '';

  sampleData.parentTickets.forEach(ticket => {
    const row = document.createElement('tr');
    const statusClass = getStatusClass(ticket.status);
    const priorityClass = getPriorityClass(ticket.priority);
    
    row.innerHTML = `
      <td><strong>${ticket.ticketNumber}</strong></td>
      <td>${ticket.parentName}</td>
      <td>${ticket.studentName}</td>
      <td>${ticket.className}</td>
      <td>${ticket.subject}</td>
      <td><span class="badge ${statusClass}">${ticket.status}</span></td>
      <td><span class="badge ${priorityClass}">${ticket.priority}</span></td>
      <td>${formatDate(ticket.date)}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="viewTicket(${ticket.id})">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-success" onclick="replyToTicket(${ticket.id})">
          <i class="bi bi-reply"></i>
        </button>
      </td>
    `;
    ticketsTable.appendChild(row);
  });
}

function loadParentForms() {
  const formsGrid = document.getElementById('parent-forms-grid');
  if (!formsGrid) return;

  formsGrid.innerHTML = '';

  sampleData.parentForms.forEach(form => {
    const formCard = createFormCard(form);
    formsGrid.appendChild(formCard);
  });
}

function createFormCard(form) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-3';

  const statusClass = getFormStatusClass(form.status);
  const formTypeClass = getFormTypeClass(form.formType);

  col.innerHTML = `
    <div class="card h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h6 class="card-title mb-0">${form.title}</h6>
          <span class="badge ${statusClass}">${form.status}</span>
        </div>
        <p class="card-text text-muted mb-2">
          <strong>Student:</strong> ${form.studentName}<br>
          <strong>Class:</strong> ${form.className}<br>
          <strong>Type:</strong> <span class="badge ${formTypeClass}">${form.formType}</span>
        </p>
        <p class="card-text small">${form.content}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${formatDate(form.submittedDate)}</small>
          <div>
            <button class="btn btn-sm btn-outline-primary me-1" onclick="viewForm(${form.id})">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-success" onclick="approveForm(${form.id})">
              <i class="bi bi-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return col;
}

function loadMessageHistory() {
  const messageHistoryTable = document.getElementById('message-history-table');
  if (!messageHistoryTable) return;

  messageHistoryTable.innerHTML = '';

  sampleData.messageHistory.forEach(message => {
    const row = document.createElement('tr');
    const statusClass = getMessageStatusClass(message.status);
    
    row.innerHTML = `
      <td>${formatDate(message.date)}</td>
      <td>${message.recipient}</td>
      <td>${message.student}</td>
      <td><span class="badge bg-secondary">${message.type}</span></td>
      <td>${message.subject}</td>
      <td><span class="badge ${statusClass}">${message.status}</span></td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="viewMessage(${message.id})">
          <i class="bi bi-eye"></i>
        </button>
      </td>
    `;
    messageHistoryTable.appendChild(row);
  });
}

function updateCommunicationStats() {
  const openTickets = sampleData.parentTickets.filter(t => t.status === 'Open').length;
  const newForms = sampleData.parentForms.filter(f => f.status === 'New').length;
  const messagesSent = sampleData.messageHistory.length;
  const pendingReplies = sampleData.parentTickets.filter(t => t.status === 'In Progress').length;

  document.getElementById('open-tickets-count').textContent = openTickets;
  document.getElementById('new-forms-count').textContent = newForms;
  document.getElementById('messages-sent-count').textContent = messagesSent;
  document.getElementById('pending-replies-count').textContent = pendingReplies;
}

function sendMessage() {
  const recipient = document.getElementById('messageRecipient').value;
  const messageType = document.getElementById('messageType').value;
  const subject = document.getElementById('messageSubject').value;
  const content = document.getElementById('messageContent').value;
  const sendEmail = document.getElementById('sendEmail').checked;
  const sendSMS = document.getElementById('sendSMS').checked;
  const sendInApp = document.getElementById('sendInApp').checked;

  if (!recipient || !messageType || !subject || !content) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  // Create new message
  const newMessage = {
    id: sampleData.messageHistory.length + 1,
    date: new Date().toISOString().split('T')[0],
    recipient: recipient === 'all' ? 'All Parents' : 'Specific Parent',
    student: 'Multiple Students',
    type: sendEmail ? 'Email' : sendSMS ? 'SMS' : 'In-App',
    subject: subject,
    status: 'Sent'
  };

  sampleData.messageHistory.push(newMessage);
  loadMessageHistory();
  updateCommunicationStats();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('sendMessageModal'));
  modal.hide();

  // Reset form
  document.getElementById('sendMessageForm').reset();

  showAlert('Message sent successfully!', 'success');
}

function viewTicket(ticketId) {
  const ticket = sampleData.parentTickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById('ticketNumber').textContent = ticket.ticketNumber;
  document.getElementById('ticketParent').textContent = ticket.parentName;
  document.getElementById('ticketStudent').textContent = ticket.studentName;
  document.getElementById('ticketClass').textContent = ticket.className;
  document.getElementById('ticketSubject').textContent = ticket.subject;
  document.getElementById('ticketMessage').textContent = ticket.message;
  document.getElementById('ticketDate').textContent = formatDate(ticket.date);
  
  const statusBadge = document.getElementById('ticketStatus');
  statusBadge.textContent = ticket.status;
  statusBadge.className = `badge ${getStatusClass(ticket.status)}`;
  
  const priorityBadge = document.getElementById('ticketPriority');
  priorityBadge.textContent = ticket.priority;
  priorityBadge.className = `badge ${getPriorityClass(ticket.priority)}`;

  // Show modal
  const modal = new bootstrap.Modal(document.getElementById('ticketDetailModal'));
  modal.show();
}

function replyToTicket(ticketId) {
  viewTicket(ticketId);
  // Focus on response textarea
  setTimeout(() => {
    document.getElementById('ticketResponse').focus();
  }, 500);
}

function updateTicketStatus(newStatus) {
  const ticketNumber = document.getElementById('ticketNumber').textContent;
  const ticket = sampleData.parentTickets.find(t => t.ticketNumber === ticketNumber);
  
  if (ticket) {
    ticket.status = newStatus;
    loadParentTickets();
    updateCommunicationStats();
    showAlert(`Ticket ${ticketNumber} marked as ${newStatus}`, 'success');
  }
}

function sendTicketResponse() {
  const ticketNumber = document.getElementById('ticketNumber').textContent;
  const response = document.getElementById('ticketResponse').value;
  
  if (!response.trim()) {
    showAlert('Please enter a response', 'warning');
    return;
  }

  const ticket = sampleData.parentTickets.find(t => t.ticketNumber === ticketNumber);
  if (ticket) {
    ticket.response = response;
    ticket.status = 'Resolved';
    loadParentTickets();
    updateCommunicationStats();
    showAlert('Response sent successfully!', 'success');
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('ticketDetailModal'));
    modal.hide();
  }
}

function editTemplate(templateType) {
  const template = sampleData.messageTemplates[templateType];
  if (!template) return;

  document.getElementById('templateType').value = templateType;
  document.getElementById('templateSubject').value = template.subject;
  document.getElementById('templateMessage').value = template.message;

  const modal = new bootstrap.Modal(document.getElementById('messageTemplateModal'));
  modal.show();
}

function saveMessageTemplate() {
  const templateType = document.getElementById('templateType').value;
  const subject = document.getElementById('templateSubject').value;
  const message = document.getElementById('templateMessage').value;
  const enabled = document.getElementById('templateEnabled').checked;

  if (!subject || !message) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  sampleData.messageTemplates[templateType] = {
    subject: subject,
    message: message,
    enabled: enabled
  };

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('messageTemplateModal'));
  modal.hide();

  showAlert('Template saved successfully!', 'success');
}

function viewForm(formId) {
  const form = sampleData.parentForms.find(f => f.id === formId);
  if (!form) return;

  showAlert(`Viewing form: ${form.title}`, 'info');
}

function approveForm(formId) {
  const form = sampleData.parentForms.find(f => f.id === formId);
  if (!form) return;

  form.status = 'Approved';
  loadParentForms();
  updateCommunicationStats();
  showAlert('Form approved successfully!', 'success');
}

function viewMessage(messageId) {
  const message = sampleData.messageHistory.find(m => m.id === messageId);
  if (!message) return;

  showAlert(`Viewing message: ${message.subject}`, 'info');
}

function exportMessages() {
  showAlert('Messages exported successfully!', 'success');
}

function clearOldMessages() {
  if (confirm('Are you sure you want to clear old messages?')) {
    showAlert('Old messages cleared!', 'success');
  }
}

// Helper functions for styling
function getStatusClass(status) {
  const statusMap = {
    'Open': 'bg-warning',
    'In Progress': 'bg-info',
    'Resolved': 'bg-success',
    'Closed': 'bg-secondary'
  };
  return statusMap[status] || 'bg-secondary';
}

function getPriorityClass(priority) {
  const priorityMap = {
    'Low': 'bg-success',
    'Medium': 'bg-warning',
    'High': 'bg-danger'
  };
  return priorityMap[priority] || 'bg-secondary';
}

function getFormStatusClass(status) {
  const statusMap = {
    'New': 'bg-primary',
    'Pending': 'bg-warning',
    'Approved': 'bg-success',
    'Rejected': 'bg-danger'
  };
  return statusMap[status] || 'bg-secondary';
}

function getFormTypeClass(type) {
  const typeMap = {
    'Medical': 'bg-danger',
    'Emergency': 'bg-warning',
    'Field Trip': 'bg-info',
    'Behavior': 'bg-secondary'
  };
  return typeMap[type] || 'bg-secondary';
}

function getMessageStatusClass(status) {
  const statusMap = {
    'Sent': 'bg-primary',
    'Delivered': 'bg-info',
    'Read': 'bg-success',
    'Failed': 'bg-danger'
  };
  return statusMap[status] || 'bg-secondary';
}

// Utility function for alerts (reuse from main.js)
function showAlert(message, type = 'info') {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll('.alert');
  existingAlerts.forEach(alert => alert.remove());
  
  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}
