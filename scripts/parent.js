// Parent Dashboard JavaScript

// Sample data - in a real app, this would come from the database
const parentData = {
  parent: {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "555-1001",
    address: "100 Family Ave, Parent City, PC 54321"
  },
  students: [
    {
      id: 1,
      firstName: "Emma",
      lastName: "Smith",
      gradeLevel: "3",
      classes: ["Grade 3 Math", "Grade 3 English"],
      avatar: "ES",
      attendanceRate: 95,
      lastActivity: "2024-09-20"
    },
    {
      id: 2,
      firstName: "Liam",
      lastName: "Smith",
      gradeLevel: "5",
      classes: ["Grade 5 Math", "Grade 5 Science"],
      avatar: "LS",
      attendanceRate: 88,
      lastActivity: "2024-09-19"
    }
  ],
  announcements: [
    {
      id: 1,
      title: "Math Test Next Week",
      message: "Reminder that the Chapter 3 math test will be next Friday. Please encourage your child to study!",
      type: "reminder",
      className: "Grade 3 Math",
      date: "2024-09-20",
      read: false,
      priority: "medium"
    },
    {
      id: 2,
      title: "Science Project Due",
      message: "The science project is due next Monday. Please ensure your child has all necessary materials.",
      type: "urgent",
      className: "Grade 5 Science",
      date: "2024-09-19",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      title: "Parent-Teacher Conferences",
      message: "Parent-teacher conferences are scheduled for next week. Please sign up for a time slot.",
      type: "event",
      className: "General",
      date: "2024-09-18",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      title: "Field Trip Permission Slips",
      message: "Field trip permission slips are due by Friday. Please return them as soon as possible.",
      type: "urgent",
      className: "Grade 3 Math",
      date: "2024-09-22",
      read: false,
      priority: "high"
    }
  ],
  attendance: [
    {
      id: 1,
      date: "2024-09-20",
      status: "Present",
      className: "Grade 3 Math",
      notes: ""
    },
    {
      id: 2,
      date: "2024-09-20",
      status: "Present",
      className: "Grade 3 English",
      notes: ""
    },
    {
      id: 3,
      date: "2024-09-19",
      status: "Late",
      className: "Grade 3 Math",
      notes: "Bus delay"
    },
    {
      id: 4,
      date: "2024-09-19",
      status: "Present",
      className: "Grade 3 English",
      notes: ""
    },
    {
      id: 5,
      date: "2024-09-18",
      status: "Absent",
      className: "Grade 3 Math",
      notes: "Sick"
    },
    {
      id: 6,
      date: "2024-09-18",
      status: "Absent",
      className: "Grade 3 English",
      notes: "Sick"
    }
  ],
  documents: [
    {
      id: 1,
      title: "Doctor's Note - Emma",
      type: "medical",
      description: "Medical clearance for return to school",
      uploadDate: "2024-09-18",
      status: "Approved",
      fileName: "doctors_note_emma.pdf",
      fileSize: "245 KB"
    },
    {
      id: 2,
      title: "Allergy Information Update",
      type: "allergy",
      description: "Updated allergy information for Emma",
      uploadDate: "2024-09-15",
      status: "Pending",
      fileName: "allergy_info.pdf",
      fileSize: "156 KB"
    },
    {
      id: 3,
      title: "Pickup Authorization - Grandma",
      type: "pickup",
      description: "Authorization for grandmother to pick up Emma",
      uploadDate: "2024-09-10",
      status: "Approved",
      fileName: "pickup_auth_grandma.pdf",
      fileSize: "89 KB"
    },
    {
      id: 4,
      title: "Emergency Contact Update",
      type: "emergency",
      description: "Updated emergency contact information",
      uploadDate: "2024-09-05",
      status: "Approved",
      fileName: "emergency_contact.pdf",
      fileSize: "134 KB"
    }
  ],
  messages: [
    {
      id: 1,
      from: "Sarah Johnson",
      subject: "Emma's Math Progress",
      message: "Emma is doing excellent work in math class. She has shown great improvement in multiplication.",
      date: "2024-09-20",
      read: false,
      priority: "low"
    },
    {
      id: 2,
      from: "Michael Chen",
      subject: "Liam's Science Project",
      message: "Liam's science project is coming along well. He's showing great creativity and understanding.",
      date: "2024-09-19",
      read: true,
      priority: "medium"
    },
    {
      id: 3,
      from: "School Office",
      subject: "Field Trip Reminder",
      message: "Reminder that the math museum field trip is next Friday. Please ensure permission slips are returned.",
      date: "2024-09-18",
      read: false,
      priority: "high"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "announcement",
      title: "New announcement from Grade 3 Math",
      time: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 2,
      type: "document",
      title: "Document approved: Doctor's Note",
      time: "1 day ago",
      icon: "file-check"
    },
    {
      id: 3,
      type: "attendance",
      title: "Attendance marked: Present",
      time: "2 days ago",
      icon: "calendar-check"
    },
    {
      id: 4,
      type: "message",
      title: "New message from teacher",
      time: "3 days ago",
      icon: "chat"
    }
  ]
};

let selectedStudent = parentData.students[0]; // Default to first student
let currentTab = 'overview';

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
  loadStudentSelection();
  loadOverview();
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
  // Form submissions
  const uploadDocumentForm = document.getElementById('uploadDocumentForm');
  if (uploadDocumentForm) {
    uploadDocumentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      uploadDocument();
    });
  }

  const contactTeacherForm = document.getElementById('contactTeacherForm');
  if (contactTeacherForm) {
    contactTeacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      sendMessageToTeacher();
    });
  }

  const reportAbsenceForm = document.getElementById('reportAbsenceForm');
  if (reportAbsenceForm) {
    reportAbsenceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      reportAbsence();
    });
  }

  const updateInfoForm = document.getElementById('updateInfoForm');
  if (updateInfoForm) {
    updateInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      updateStudentInfo();
    });
  }

  const parentProfileForm = document.getElementById('parentProfileForm');
  if (parentProfileForm) {
    parentProfileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveParentProfile();
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
    case 'overview':
      loadOverview();
      break;
    case 'announcements':
      loadAnnouncements();
      break;
    case 'attendance':
      loadAttendance();
      break;
    case 'documents':
      loadDocuments();
      break;
    case 'communication':
      loadMessages();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

function loadStudentSelection() {
  const studentSelection = document.getElementById('student-selection');
  if (!studentSelection) return;

  studentSelection.innerHTML = '';

  parentData.students.forEach(student => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-3';
    
    const isSelected = student.id === selectedStudent.id;
    
    col.innerHTML = `
      <div class="card student-card ${isSelected ? 'selected' : ''}" onclick="selectStudent(${student.id})">
        <div class="card-body">
          <div class="student-avatar">${student.avatar}</div>
          <h6 class="card-title">${student.firstName} ${student.lastName}</h6>
          <p class="card-text text-muted">Grade ${student.gradeLevel}</p>
          <small class="text-muted">${student.classes.length} classes</small>
        </div>
      </div>
    `;
    
    studentSelection.appendChild(col);
  });

  updateSelectedStudentBadge();
}

function selectStudent(studentId) {
  selectedStudent = parentData.students.find(s => s.id === studentId);
  loadStudentSelection();
  
  // Reload current tab data
  switch(currentTab) {
    case 'overview':
      loadOverview();
      break;
    case 'announcements':
      loadAnnouncements();
      break;
    case 'attendance':
      loadAttendance();
      break;
    case 'documents':
      loadDocuments();
      break;
    case 'communication':
      loadMessages();
      break;
  }
}

function updateSelectedStudentBadge() {
  const badge = document.getElementById('selected-student-badge');
  if (badge) {
    badge.textContent = `${selectedStudent.firstName} ${selectedStudent.lastName}`;
  }
}

function loadOverview() {
  updateOverviewStats();
  loadRecentActivity();
}

function updateOverviewStats() {
  const classesCount = selectedStudent.classes.length;
  const attendancePercent = selectedStudent.attendanceRate;
  const newMessages = parentData.messages.filter(m => !m.read).length;
  const pendingDocs = parentData.documents.filter(d => d.status === 'Pending').length;

  document.getElementById('overview-classes-count').textContent = classesCount;
  document.getElementById('overview-attendance-percent').textContent = attendancePercent + '%';
  document.getElementById('overview-messages-count').textContent = newMessages;
  document.getElementById('overview-docs-count').textContent = pendingDocs;
}

function loadRecentActivity() {
  const activityList = document.getElementById('recent-activity-list');
  if (!activityList) return;

  activityList.innerHTML = '';

  parentData.recentActivity.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    
    activityItem.innerHTML = `
      <div class="activity-icon">
        <i class="bi bi-${activity.icon}"></i>
      </div>
      <div class="activity-content">
        <div class="fw-medium">${activity.title}</div>
        <div class="activity-time">${activity.time}</div>
      </div>
    `;
    
    activityList.appendChild(activityItem);
  });
}

function loadAnnouncements() {
  const announcementsList = document.getElementById('announcements-list');
  if (!announcementsList) return;

  announcementsList.innerHTML = '';

  // Filter announcements for selected student's classes
  const studentAnnouncements = parentData.announcements.filter(announcement => 
    announcement.className === 'General' || selectedStudent.classes.includes(announcement.className)
  );

  if (studentAnnouncements.length === 0) {
    announcementsList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-megaphone"></i>
        <h5>No announcements</h5>
        <p>There are no announcements for ${selectedStudent.firstName}'s classes at this time.</p>
      </div>
    `;
    return;
  }

  studentAnnouncements.forEach(announcement => {
    const announcementCard = createAnnouncementCard(announcement);
    announcementsList.appendChild(announcementCard);
  });
}

function createAnnouncementCard(announcement) {
  const card = document.createElement('div');
  card.className = `announcement-card card announcement-${announcement.type}`;
  
  const priorityBadge = announcement.priority === 'high' ? 
    '<span class="badge bg-danger me-2">Urgent</span>' : 
    announcement.priority === 'medium' ? 
    '<span class="badge bg-warning me-2">Important</span>' : '';

  const readBadge = !announcement.read ? 
    '<span class="badge bg-primary">New</span>' : '';

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">${announcement.title}</h6>
        <div>
          ${priorityBadge}
          ${readBadge}
        </div>
      </div>
      <p class="card-text">${announcement.message}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">
          <i class="bi bi-calendar me-1"></i>${formatDate(announcement.date)}
          <i class="bi bi-book me-1 ms-2"></i>${announcement.className}
        </small>
        <div>
          <button class="btn btn-sm btn-outline-primary" onclick="markAnnouncementRead(${announcement.id})">
            <i class="bi bi-check"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function loadAttendance() {
  updateAttendanceStats();
  loadAttendanceTable();
}

function updateAttendanceStats() {
  const studentAttendance = parentData.attendance;
  const present = studentAttendance.filter(a => a.status === 'Present').length;
  const absent = studentAttendance.filter(a => a.status === 'Absent').length;
  const late = studentAttendance.filter(a => a.status === 'Late').length;
  const total = studentAttendance.length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;

  document.getElementById('attendance-present').textContent = present;
  document.getElementById('attendance-absent').textContent = absent;
  document.getElementById('attendance-late').textContent = late;
  document.getElementById('attendance-rate').textContent = rate + '%';
}

function loadAttendanceTable() {
  const attendanceTable = document.getElementById('attendance-table');
  if (!attendanceTable) return;

  attendanceTable.innerHTML = '';

  parentData.attendance.forEach(attendance => {
    const row = document.createElement('tr');
    const statusClass = getAttendanceClass(attendance.status);
    
    row.innerHTML = `
      <td>${formatDate(attendance.date)}</td>
      <td>
        <span class="attendance-status attendance-${statusClass}"></span>
        ${attendance.status}
      </td>
      <td>${attendance.className}</td>
      <td>${attendance.notes || '-'}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary" onclick="viewAttendanceDetails(${attendance.id})">
          <i class="bi bi-eye"></i>
        </button>
      </td>
    `;
    attendanceTable.appendChild(row);
  });
}

function loadDocuments() {
  updateDocumentStats();
  loadDocumentsGrid();
}

function updateDocumentStats() {
  const medicalCount = parentData.documents.filter(d => d.type === 'medical').length;
  const allergyCount = parentData.documents.filter(d => d.type === 'allergy').length;
  const pickupCount = parentData.documents.filter(d => d.type === 'pickup').length;
  const otherCount = parentData.documents.filter(d => d.type === 'other' || d.type === 'emergency').length;

  document.getElementById('medical-docs-count').textContent = medicalCount;
  document.getElementById('allergy-docs-count').textContent = allergyCount;
  document.getElementById('pickup-docs-count').textContent = pickupCount;
  document.getElementById('other-docs-count').textContent = otherCount;
}

function loadDocumentsGrid() {
  const documentsGrid = document.getElementById('documents-grid');
  if (!documentsGrid) return;

  documentsGrid.innerHTML = '';

  parentData.documents.forEach(document => {
    const documentCard = createDocumentCard(document);
    documentsGrid.appendChild(documentCard);
  });
}

function createDocumentCard(document) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-3';

  const statusClass = getDocumentStatusClass(document.status);
  const typeClass = getDocumentTypeClass(document.type);

  col.innerHTML = `
    <div class="card document-card">
      <div class="card-body">
        <div class="d-flex align-items-center mb-3">
          <div class="document-icon document-${typeClass}">
            <i class="bi bi-file-earmark"></i>
          </div>
          <div class="ms-3">
            <h6 class="card-title mb-0">${document.title}</h6>
            <small class="text-muted">${document.fileSize}</small>
          </div>
        </div>
        <p class="card-text small">${document.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="document-status status-${statusClass.toLowerCase()}">${document.status}</span>
          <div>
            <button class="btn btn-sm btn-outline-primary me-1" onclick="viewDocument(${document.id})">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-success" onclick="downloadDocument(${document.id})">
              <i class="bi bi-download"></i>
            </button>
          </div>
        </div>
        <small class="text-muted d-block mt-2">${formatDate(document.uploadDate)}</small>
      </div>
    </div>
  `;

  return col;
}

async function loadMessages() {
  const messagesList = document.getElementById('messages-list');
  if (!messagesList) return;

  messagesList.innerHTML = '';

  // Get current user info from session storage
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  
  if (!currentUser.id) {
    messagesList.innerHTML = '<div class="text-center text-muted">Please log in to view messages.</div>';
    return;
  }

  try {
    // Fetch messages from API
    const response = await fetch('api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'get_messages',
        user_role: 'parent',
        user_id: currentUser.id
      })
    });

    const result = await response.json();

    if (result.success && result.messages) {
      // Update local data
      parentData.messages = result.messages.map(msg => ({
        id: msg.id,
        from: msg.sender_name,
        subject: msg.subject,
        message: msg.message,
        date: msg.timestamp.split(' ')[0], // Extract date part
        read: msg.read,
        priority: msg.priority
      }));

      // Display messages
      if (parentData.messages.length === 0) {
        messagesList.innerHTML = `
          <div class="empty-state text-center">
            <i class="bi bi-chat-dots fs-1 text-muted"></i>
            <h5 class="mt-3">No messages yet</h5>
            <p class="text-muted">Send a message to your child's teacher to get started.</p>
          </div>
        `;
      } else {
        parentData.messages.forEach(message => {
          const messageCard = createMessageCard(message);
          messagesList.appendChild(messageCard);
        });
      }
    } else {
      // Fallback to local data
      parentData.messages.forEach(message => {
        const messageCard = createMessageCard(message);
        messagesList.appendChild(messageCard);
      });
    }
  } catch (error) {
    console.error('Error loading messages:', error);
    // Fallback to local data
    parentData.messages.forEach(message => {
      const messageCard = createMessageCard(message);
      messagesList.appendChild(messageCard);
    });
  }
}

function createMessageCard(message) {
  const card = document.createElement('div');
  card.className = `message-card card message-${message.read ? 'read' : 'unread'} message-priority-${message.priority}`;
  
  const priorityBadge = message.priority === 'high' ? 
    '<span class="badge bg-danger me-2">High Priority</span>' : 
    message.priority === 'medium' ? 
    '<span class="badge bg-warning me-2">Medium Priority</span>' : '';

  const unreadBadge = !message.read ? 
    '<span class="badge bg-primary">New</span>' : '';

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">${message.subject}</h6>
        <div>
          ${priorityBadge}
          ${unreadBadge}
        </div>
      </div>
      <p class="card-text text-muted mb-2">From: ${message.from}</p>
      <p class="card-text">${message.message}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">${formatDate(message.date)}</small>
        <div>
          <button class="btn btn-sm btn-outline-primary" onclick="replyToMessage(${message.id})">
            <i class="bi bi-reply"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  return card;
}

function loadSettings() {
  // Settings are already loaded in the HTML
}

// Action functions
function uploadDocument() {
  const documentType = document.getElementById('documentType').value;
  const documentTitle = document.getElementById('documentTitle').value;
  const documentDescription = document.getElementById('documentDescription').value;
  const documentFile = document.getElementById('documentFile').files[0];
  const urgent = document.getElementById('urgentDocument').checked;

  if (!documentType || !documentTitle || !documentFile) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  // Create new document
  const newDocument = {
    id: parentData.documents.length + 1,
    title: documentTitle,
    type: documentType,
    description: documentDescription,
    uploadDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    fileName: documentFile.name,
    fileSize: formatFileSize(documentFile.size)
  };

  parentData.documents.push(newDocument);
  loadDocuments();
  updateOverviewStats();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('uploadDocumentModal'));
  modal.hide();

  // Reset form
  document.getElementById('uploadDocumentForm').reset();

  showAlert('Document uploaded successfully!', 'success');
}

async function sendMessageToTeacher() {
  const teacher = document.getElementById('teacherSelect').value;
  const subject = document.getElementById('messageSubject').value;
  const priority = document.getElementById('messagePriority').value;
  const content = document.getElementById('messageContent').value;

  if (!teacher || !subject || !content) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  // Get current user info from session storage
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  
  if (!currentUser.id) {
    showAlert('User session expired. Please log in again.', 'danger');
    return;
  }

  try {
    // Send message via API
    const response = await fetch('api.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send_message',
        sender_id: currentUser.id,
        sender_role: 'parent',
        sender_name: currentUser.name,
        recipient_role: 'teacher',
        subject: subject,
        message: content,
        priority: priority
      })
    });

    const result = await response.json();

    if (result.success) {
      // Update local data for immediate UI update
      const newMessage = {
        id: parentData.messages.length + 1,
        from: currentUser.name,
        subject: subject,
        message: content,
        date: new Date().toISOString().split('T')[0],
        read: false,
        priority: priority
      };

      parentData.messages.push(newMessage);
      loadMessages();
      updateOverviewStats();

      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('contactTeacherModal'));
      modal.hide();

      // Reset form
      document.getElementById('contactTeacherForm').reset();

      showAlert('Message sent successfully!', 'success');
    } else {
      showAlert(result.message || 'Failed to send message', 'danger');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    showAlert('Failed to send message. Please try again.', 'danger');
  }
}

function reportAbsence() {
  const absenceDate = document.getElementById('absenceDate').value;
  const absenceReason = document.getElementById('absenceReason').value;
  const absenceNotes = document.getElementById('absenceNotes').value;

  if (!absenceDate || !absenceReason) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  // Create new attendance record
  const newAbsence = {
    id: parentData.attendance.length + 1,
    date: absenceDate,
    status: 'Absent',
    className: selectedStudent.classes[0], // Default to first class
    notes: absenceNotes
  };

  parentData.attendance.push(newAbsence);
  loadAttendance();
  updateOverviewStats();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('reportAbsenceModal'));
  modal.hide();

  // Reset form
  document.getElementById('reportAbsenceForm').reset();

  showAlert('Absence reported successfully!', 'success');
}

function updateStudentInfo() {
  const updateType = document.getElementById('updateType').value;
  const updateDetails = document.getElementById('updateDetails').value;
  const urgent = document.getElementById('urgentUpdate').checked;

  if (!updateType || !updateDetails) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('updateInfoModal'));
  modal.hide();

  // Reset form
  document.getElementById('updateInfoForm').reset();

  showAlert('Information update submitted successfully!', 'success');
}

function saveParentProfile() {
  showAlert('Profile updated successfully!', 'success');
}

function markAnnouncementRead(announcementId) {
  const announcement = parentData.announcements.find(a => a.id === announcementId);
  if (announcement) {
    announcement.read = true;
    loadAnnouncements();
    updateOverviewStats();
    showAlert('Announcement marked as read', 'success');
  }
}

function markAllAsRead() {
  parentData.announcements.forEach(announcement => {
    announcement.read = true;
  });
  loadAnnouncements();
  updateOverviewStats();
  showAlert('All announcements marked as read', 'success');
}

function filterAnnouncements(filter) {
  // Implementation for filtering announcements
  showAlert('Filter applied', 'info');
}

function viewAttendanceDetails(attendanceId) {
  const attendance = parentData.attendance.find(a => a.id === attendanceId);
  if (attendance) {
    showAlert(`Attendance details: ${attendance.status} on ${formatDate(attendance.date)}`, 'info');
  }
}

function filterDocuments(filter) {
  // Implementation for filtering documents
  showAlert(`Filtering documents by: ${filter}`, 'info');
}

function viewDocument(documentId) {
  const document = parentData.documents.find(d => d.id === documentId);
  if (document) {
    showAlert(`Viewing document: ${document.title}`, 'info');
  }
}

function downloadDocument(documentId) {
  const document = parentData.documents.find(d => d.id === documentId);
  if (document) {
    showAlert(`Downloading: ${document.fileName}`, 'success');
  }
}

function replyToMessage(messageId) {
  const message = parentData.messages.find(m => m.id === messageId);
  if (message) {
    showAlert(`Replying to message from: ${message.from}`, 'info');
  }
}

function contactTeacher(className) {
  showAlert(`Contacting teacher for: ${className}`, 'info');
}

function contactPrincipal() {
  showAlert('Contacting principal...', 'info');
}

function contactOffice() {
  showAlert('Contacting school office...', 'info');
}

// Helper functions
function getAttendanceClass(status) {
  const statusMap = {
    'Present': 'present',
    'Absent': 'absent',
    'Late': 'late',
    'Excused': 'excused'
  };
  return statusMap[status] || 'absent';
}

function getDocumentStatusClass(status) {
  const statusMap = {
    'Pending': 'pending',
    'Approved': 'approved',
    'Rejected': 'rejected'
  };
  return statusMap[status] || 'pending';
}

function getDocumentTypeClass(type) {
  const typeMap = {
    'medical': 'medical',
    'allergy': 'allergy',
    'pickup': 'pickup',
    'emergency': 'other',
    'other': 'other'
  };
  return typeMap[type] || 'other';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
