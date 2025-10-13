// Admin Dashboard JavaScript

// Sample data - in a real app, this would come from the database
const adminData = {
  school: {
    name: "Class Roots Elementary",
    address: "123 Education St, Learning City, LC 12345",
    phone: "555-0123",
    email: "info@classroots.edu"
  },
  announcements: [
    {
      id: 1,
      title: "School Closure - Weather Alert",
      message: "Due to severe weather conditions, school will be closed tomorrow. Please stay safe.",
      type: "urgent",
      priority: "high",
      status: "published",
      audience: ["parents", "teachers"],
      createdDate: "2024-09-20",
      publishedDate: "2024-09-20"
    },
    {
      id: 2,
      title: "Parent-Teacher Conference Week",
      message: "Parent-teacher conferences are scheduled for next week. Please sign up for a time slot.",
      type: "event",
      priority: "medium",
      status: "published",
      audience: ["parents"],
      createdDate: "2024-09-18",
      publishedDate: "2024-09-18"
    },
    {
      id: 3,
      title: "New Math Curriculum Implementation",
      message: "We are implementing a new math curriculum this semester. Training sessions will be provided.",
      type: "general",
      priority: "low",
      status: "draft",
      audience: ["teachers"],
      createdDate: "2024-09-15",
      publishedDate: null
    }
  ],
  messages: [
    {
      id: 1,
      recipients: "All Parents",
      subject: "Emergency Weather Alert",
      type: "email",
      status: "sent",
      date: "2024-09-20",
      priority: "high"
    },
    {
      id: 2,
      recipients: "All Teachers",
      subject: "Staff Meeting Reminder",
      type: "in-app",
      status: "delivered",
      date: "2024-09-19",
      priority: "medium"
    },
    {
      id: 3,
      recipients: "Grade 3 Parents",
      subject: "Field Trip Permission Slips",
      type: "sms",
      status: "sent",
      date: "2024-09-18",
      priority: "low"
    }
  ],
  documents: [
    {
      id: 1,
      title: "Medical Clearance - Emma Smith",
      parent: "John Smith",
      student: "Emma Smith",
      type: "medical",
      status: "pending",
      uploadDate: "2024-09-20",
      fileName: "medical_clearance_emma.pdf",
      fileSize: "245 KB"
    },
    {
      id: 2,
      title: "Allergy Information - Liam Smith",
      parent: "Mary Smith",
      student: "Liam Smith",
      type: "allergy",
      status: "approved",
      uploadDate: "2024-09-19",
      fileName: "allergy_info_liam.pdf",
      fileSize: "156 KB"
    },
    {
      id: 3,
      title: "Pickup Authorization - Olivia Johnson",
      parent: "Robert Johnson",
      student: "Olivia Johnson",
      type: "pickup",
      status: "rejected",
      uploadDate: "2024-09-18",
      fileName: "pickup_auth_olivia.pdf",
      fileSize: "89 KB"
    }
  ],
  parents: [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "555-1001",
      students: ["Emma Smith", "Liam Smith"],
      status: "active",
      lastLogin: "2024-09-20"
    },
    {
      id: 2,
      firstName: "Mary",
      lastName: "Smith",
      email: "mary.smith@email.com",
      phone: "555-1002",
      students: ["Emma Smith", "Liam Smith"],
      status: "active",
      lastLogin: "2024-09-19"
    },
    {
      id: 3,
      firstName: "Robert",
      lastName: "Johnson",
      email: "robert.johnson@email.com",
      phone: "555-1003",
      students: ["Olivia Johnson"],
      status: "inactive",
      lastLogin: "2024-09-15"
    }
  ],
  teachers: [
    {
      id: 1,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@classroots.edu",
      phone: "555-0101",
      subject: "Mathematics",
      gradeLevels: ["3", "4", "5"],
      classes: ["Grade 3 Math", "Grade 4 Math", "Grade 5 Math"],
      status: "active"
    },
    {
      id: 2,
      firstName: "Michael",
      lastName: "Chen",
      email: "michael.chen@classroots.edu",
      phone: "555-0102",
      subject: "Science",
      gradeLevels: ["6", "7", "8"],
      classes: ["Grade 6 Science", "Grade 7 Science", "Grade 8 Science"],
      status: "active"
    },
    {
      id: 3,
      firstName: "Emily",
      lastName: "Rodriguez",
      email: "emily.rodriguez@classroots.edu",
      phone: "555-0103",
      subject: "English Language Arts",
      gradeLevels: ["4", "5", "6"],
      classes: ["Grade 4 English", "Grade 5 English", "Grade 6 English"],
      status: "inactive"
    }
  ],
  classes: [
    {
      id: 1,
      name: "Grade 3 Math",
      subject: "Mathematics",
      gradeLevel: "3",
      teacher: "Sarah Johnson",
      roomNumber: "Room 102",
      maxStudents: 25,
      currentStudents: 23,
      status: "active"
    },
    {
      id: 2,
      name: "Grade 4 Math",
      subject: "Mathematics",
      gradeLevel: "4",
      teacher: "Sarah Johnson",
      roomNumber: "Room 102",
      maxStudents: 25,
      currentStudents: 24,
      status: "active"
    },
    {
      id: 3,
      name: "Grade 6 Science",
      subject: "Science",
      gradeLevel: "6",
      teacher: "Michael Chen",
      roomNumber: "Room 103",
      maxStudents: 30,
      currentStudents: 28,
      status: "active"
    }
  ],
  recentActivity: [
    {
      id: 1,
      type: "announcement",
      title: "New urgent announcement published",
      time: "2 hours ago",
      icon: "megaphone"
    },
    {
      id: 2,
      type: "document",
      title: "Document approved: Medical Clearance",
      time: "4 hours ago",
      icon: "file-check"
    },
    {
      id: 3,
      type: "message",
      title: "Emergency message sent to all parents",
      time: "6 hours ago",
      icon: "chat"
    },
    {
      id: 4,
      type: "teacher",
      title: "New teacher added: Emily Rodriguez",
      time: "1 day ago",
      icon: "person-badge"
    }
  ]
};

let currentTab = 'overview';

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
  initializeDashboard();
  setupEventListeners();
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
  const newAnnouncementForm = document.getElementById('newAnnouncementForm');
  if (newAnnouncementForm) {
    newAnnouncementForm.addEventListener('submit', function(e) {
      e.preventDefault();
      createAnnouncement();
    });
  }

  const sendMessageForm = document.getElementById('sendMessageForm');
  if (sendMessageForm) {
    sendMessageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      sendMessage();
    });
  }

  const addParentForm = document.getElementById('addParentForm');
  if (addParentForm) {
    addParentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addParent();
    });
  }

  const addTeacherForm = document.getElementById('addTeacherForm');
  if (addTeacherForm) {
    addTeacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addTeacher();
    });
  }

  const addClassForm = document.getElementById('addClassForm');
  if (addClassForm) {
    addClassForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addClass();
    });
  }

  const quickAnnouncementForm = document.getElementById('quickAnnouncementForm');
  if (quickAnnouncementForm) {
    quickAnnouncementForm.addEventListener('submit', function(e) {
      e.preventDefault();
      createQuickAnnouncement();
    });
  }

  const schoolInfoForm = document.getElementById('schoolInfoForm');
  if (schoolInfoForm) {
    schoolInfoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveSchoolInfo();
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
    case 'messaging':
      loadMessages();
      break;
    case 'documents':
      loadDocuments();
      break;
    case 'parents':
      loadParents();
      break;
    case 'teachers':
      loadTeachers();
      break;
    case 'classes':
      loadClasses();
      break;
    case 'reports':
      loadReports();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

function loadOverview() {
  updateOverviewStats();
  loadRecentActivity();
}

function updateOverviewStats() {
  const totalStudents = 247; // This would come from database
  const totalTeachers = adminData.teachers.length;
  const totalClasses = adminData.classes.length;
  const pendingDocs = adminData.documents.filter(d => d.status === 'pending').length;

  document.getElementById('total-students').textContent = totalStudents;
  document.getElementById('total-teachers').textContent = totalTeachers;
  document.getElementById('total-classes').textContent = totalClasses;
  document.getElementById('pending-docs').textContent = pendingDocs;
}

function loadRecentActivity() {
  const activityList = document.getElementById('recent-activity-list');
  if (!activityList) return;

  activityList.innerHTML = '';

  adminData.recentActivity.forEach(activity => {
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

  if (adminData.announcements.length === 0) {
    announcementsList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-megaphone"></i>
        <h5>No announcements</h5>
        <p>Create your first school announcement to get started.</p>
      </div>
    `;
    return;
  }

  adminData.announcements.forEach(announcement => {
    const announcementCard = createAnnouncementCard(announcement);
    announcementsList.appendChild(announcementCard);
  });
}

function createAnnouncementCard(announcement) {
  const card = document.createElement('div');
  card.className = `announcement-card card announcement-${announcement.type}`;
  
  const priorityBadge = announcement.priority === 'high' ? 
    '<span class="badge bg-danger me-2">High Priority</span>' : 
    announcement.priority === 'medium' ? 
    '<span class="badge bg-warning me-2">Medium Priority</span>' : '';

  const statusBadge = `<span class="status-badge status-${announcement.status}">${announcement.status}</span>`;

  card.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">${announcement.title}</h6>
        <div>
          ${priorityBadge}
          ${statusBadge}
        </div>
      </div>
      <p class="card-text">${announcement.message}</p>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">
          <i class="bi bi-calendar me-1"></i>${formatDate(announcement.createdDate)}
          <i class="bi bi-people me-1 ms-2"></i>${announcement.audience.join(', ')}
        </small>
        <div class="action-buttons">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="editAnnouncement(${announcement.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-success me-1" onclick="publishAnnouncement(${announcement.id})">
            <i class="bi bi-send"></i>
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

function loadMessages() {
  const messagesTable = document.getElementById('messages-table');
  if (!messagesTable) return;

  messagesTable.innerHTML = '';

  adminData.messages.forEach(message => {
    const row = document.createElement('tr');
    const statusClass = getMessageStatusClass(message.status);
    const priorityClass = getPriorityClass(message.priority);
    
    row.innerHTML = `
      <td>${formatDate(message.date)}</td>
      <td>${message.recipients}</td>
      <td>${message.subject}</td>
      <td><span class="badge bg-secondary">${message.type}</span></td>
      <td><span class="badge ${statusClass}">${message.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="viewMessage(${message.id})">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-success me-1" onclick="resendMessage(${message.id})">
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>
      </td>
    `;
    messagesTable.appendChild(row);
  });
}

function loadDocuments() {
  const documentsTable = document.getElementById('documents-table');
  if (!documentsTable) return;

  documentsTable.innerHTML = '';

  adminData.documents.forEach(document => {
    const row = document.createElement('tr');
    const statusClass = getDocumentStatusClass(document.status);
    
    row.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <i class="bi bi-file-earmark me-2"></i>
          <div>
            <div class="fw-medium">${document.title}</div>
            <small class="text-muted">${document.fileName}</small>
          </div>
        </div>
      </td>
      <td>${document.parent}</td>
      <td>${document.student}</td>
      <td><span class="badge bg-secondary">${document.type}</span></td>
      <td><span class="status-badge status-${document.status}">${document.status}</span></td>
      <td>${formatDate(document.uploadDate)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="viewDocument(${document.id})">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-success me-1" onclick="approveDocument(${document.id})">
            <i class="bi bi-check"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="rejectDocument(${document.id})">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </td>
    `;
    documentsTable.appendChild(row);
  });
}

function loadParents() {
  const parentsTable = document.getElementById('parents-table');
  if (!parentsTable) return;

  parentsTable.innerHTML = '';

  adminData.parents.forEach(parent => {
    const row = document.createElement('tr');
    const statusClass = parent.status === 'active' ? 'bg-success' : 'bg-secondary';
    
    row.innerHTML = `
      <td>${parent.firstName} ${parent.lastName}</td>
      <td>${parent.email}</td>
      <td>${parent.phone}</td>
      <td>${parent.students.join(', ')}</td>
      <td><span class="badge ${statusClass}">${parent.status}</span></td>
      <td>${formatDate(parent.lastLogin)}</td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="viewParent(${parent.id})">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="editParent(${parent.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteParent(${parent.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    `;
    parentsTable.appendChild(row);
  });
}

function loadTeachers() {
  const teachersTable = document.getElementById('teachers-table');
  if (!teachersTable) return;

  teachersTable.innerHTML = '';

  adminData.teachers.forEach(teacher => {
    const row = document.createElement('tr');
    const statusClass = teacher.status === 'active' ? 'bg-success' : 'bg-secondary';
    
    row.innerHTML = `
      <td>${teacher.firstName} ${teacher.lastName}</td>
      <td>${teacher.email}</td>
      <td>${teacher.subject}</td>
      <td>Grade ${teacher.gradeLevels.join(', ')}</td>
      <td>${teacher.classes.length}</td>
      <td><span class="badge ${statusClass}">${teacher.status}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-outline-primary me-1" onclick="viewTeacher(${teacher.id})">
            <i class="bi bi-eye"></i>
          </button>
          <button class="btn btn-sm btn-outline-warning me-1" onclick="editTeacher(${teacher.id})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTeacher(${teacher.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </td>
    `;
    teachersTable.appendChild(row);
  });
}

function loadClasses() {
  const classesGrid = document.getElementById('classes-grid');
  if (!classesGrid) return;

  classesGrid.innerHTML = '';

  adminData.classes.forEach(classItem => {
    const classCard = createClassCard(classItem);
    classesGrid.appendChild(classCard);
  });
}

function createClassCard(classItem) {
  const col = document.createElement('div');
  col.className = 'col-md-6 col-lg-4 mb-3';

  col.innerHTML = `
    <div class="card class-card h-100">
      <div class="card-body">
        <h5 class="card-title">${classItem.name}</h5>
        <p class="card-text text-muted">${classItem.subject} - Grade ${classItem.gradeLevel}</p>
        <p class="card-text"><i class="bi bi-person me-1"></i>${classItem.teacher}</p>
        <p class="card-text"><i class="bi bi-geo-alt me-1"></i>${classItem.roomNumber}</p>
        <div class="class-stats">
          <div class="stat-item">
            <div class="stat-number">${classItem.currentStudents}</div>
            <div class="stat-label">Students</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">${classItem.maxStudents}</div>
            <div class="stat-label">Max</div>
          </div>
        </div>
        <div class="mt-3">
          <div class="action-buttons">
            <button class="btn btn-sm btn-outline-primary me-1" onclick="viewClass(${classItem.id})">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-sm btn-outline-warning me-1" onclick="editClass(${classItem.id})">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteClass(${classItem.id})">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  return col;
}

function loadReports() {
  // Reports are already loaded in the HTML
}

function loadSettings() {
  // Settings are already loaded in the HTML
}

// Action functions
function createAnnouncement() {
  const title = document.getElementById('announcementTitle').value;
  const message = document.getElementById('announcementMessage').value;
  const type = document.getElementById('announcementType').value;
  const priority = document.getElementById('announcementPriority').value;
  const audience = [];
  
  if (document.getElementById('audienceParents').checked) audience.push('parents');
  if (document.getElementById('audienceTeachers').checked) audience.push('teachers');
  if (document.getElementById('audienceStudents').checked) audience.push('students');
  
  const publish = document.getElementById('announcementPublish').checked;

  if (!title || !message || !type || audience.length === 0) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newAnnouncement = {
    id: adminData.announcements.length + 1,
    title: title,
    message: message,
    type: type,
    priority: priority,
    status: publish ? 'published' : 'draft',
    audience: audience,
    createdDate: new Date().toISOString().split('T')[0],
    publishedDate: publish ? new Date().toISOString().split('T')[0] : null
  };

  adminData.announcements.push(newAnnouncement);
  loadAnnouncements();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('newAnnouncementModal'));
  modal.hide();

  // Reset form
  document.getElementById('newAnnouncementForm').reset();

  showAlert('Announcement created successfully!', 'success');
}

function createQuickAnnouncement() {
  const title = document.getElementById('quickTitle').value;
  const message = document.getElementById('quickMessage').value;
  const type = document.getElementById('quickType').value;

  if (!title || !message) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newAnnouncement = {
    id: adminData.announcements.length + 1,
    title: title,
    message: message,
    type: type,
    priority: 'medium',
    status: 'published',
    audience: ['parents', 'teachers'],
    createdDate: new Date().toISOString().split('T')[0],
    publishedDate: new Date().toISOString().split('T')[0]
  };

  adminData.announcements.push(newAnnouncement);
  loadAnnouncements();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('quickAnnouncementModal'));
  modal.hide();

  // Reset form
  document.getElementById('quickAnnouncementForm').reset();

  showAlert('Quick announcement sent!', 'success');
}

function sendMessage() {
  const recipients = document.getElementById('messageRecipients').value;
  const type = document.getElementById('messageType').value;
  const subject = document.getElementById('messageSubject').value;
  const content = document.getElementById('messageContent').value;
  const priority = document.getElementById('messagePriority').value;

  if (!recipients || !type || !subject || !content) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newMessage = {
    id: adminData.messages.length + 1,
    recipients: recipients.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    subject: subject,
    type: type,
    status: 'sent',
    date: new Date().toISOString().split('T')[0],
    priority: priority
  };

  adminData.messages.push(newMessage);
  loadMessages();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('sendMessageModal'));
  modal.hide();

  // Reset form
  document.getElementById('sendMessageForm').reset();

  showAlert('Message sent successfully!', 'success');
}

function addParent() {
  const firstName = document.getElementById('parentFirstName').value;
  const lastName = document.getElementById('parentLastName').value;
  const email = document.getElementById('parentEmail').value;
  const phone = document.getElementById('parentPhone').value;
  const address = document.getElementById('parentAddress').value;
  const relationship = document.getElementById('parentRelationship').value;

  if (!firstName || !lastName || !email || !phone || !relationship) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newParent = {
    id: adminData.parents.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    address: address,
    students: [],
    status: 'active',
    lastLogin: new Date().toISOString().split('T')[0]
  };

  adminData.parents.push(newParent);
  loadParents();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addParentModal'));
  modal.hide();

  // Reset form
  document.getElementById('addParentForm').reset();

  showAlert('Parent added successfully!', 'success');
}

function addTeacher() {
  const firstName = document.getElementById('teacherFirstName').value;
  const lastName = document.getElementById('teacherLastName').value;
  const email = document.getElementById('teacherEmail').value;
  const phone = document.getElementById('teacherPhone').value;
  const subject = document.getElementById('teacherSubject').value;
  const room = document.getElementById('teacherRoom').value;

  // Get selected grade levels
  const gradeLevels = [];
  const gradeCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  gradeCheckboxes.forEach(checkbox => {
    gradeLevels.push(checkbox.value);
  });

  if (!firstName || !lastName || !email || !subject || gradeLevels.length === 0) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newTeacher = {
    id: adminData.teachers.length + 1,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    subject: subject,
    gradeLevels: gradeLevels,
    classes: [],
    status: 'active'
  };

  adminData.teachers.push(newTeacher);
  loadTeachers();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addTeacherModal'));
  modal.hide();

  // Reset form
  document.getElementById('addTeacherForm').reset();

  showAlert('Teacher added successfully!', 'success');
}

function addClass() {
  const className = document.getElementById('className').value;
  const subject = document.getElementById('classSubject').value;
  const gradeLevel = document.getElementById('classGradeLevel').value;
  const teacher = document.getElementById('classTeacher').value;
  const room = document.getElementById('classRoom').value;
  const maxStudents = document.getElementById('classMaxStudents').value;

  if (!className || !subject || !gradeLevel || !teacher) {
    showAlert('Please fill in all required fields', 'danger');
    return;
  }

  const newClass = {
    id: adminData.classes.length + 1,
    name: className,
    subject: subject,
    gradeLevel: gradeLevel,
    teacher: teacher,
    roomNumber: room,
    maxStudents: parseInt(maxStudents),
    currentStudents: 0,
    status: 'active'
  };

  adminData.classes.push(newClass);
  loadClasses();

  // Close modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('addClassModal'));
  modal.hide();

  // Reset form
  document.getElementById('addClassForm').reset();

  showAlert('Class added successfully!', 'success');
}

function saveSchoolInfo() {
  const name = document.getElementById('schoolName').value;
  const address = document.getElementById('schoolAddress').value;
  const phone = document.getElementById('schoolPhone').value;
  const email = document.getElementById('schoolEmail').value;

  adminData.school.name = name;
  adminData.school.address = address;
  adminData.school.phone = phone;
  adminData.school.email = email;

  showAlert('School information updated successfully!', 'success');
}

// CRUD operations
function editAnnouncement(id) {
  showAlert(`Editing announcement ${id}`, 'info');
}

function publishAnnouncement(id) {
  const announcement = adminData.announcements.find(a => a.id === id);
  if (announcement) {
    announcement.status = 'published';
    announcement.publishedDate = new Date().toISOString().split('T')[0];
    loadAnnouncements();
    showAlert('Announcement published!', 'success');
  }
}

function deleteAnnouncement(id) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    const index = adminData.announcements.findIndex(a => a.id === id);
    if (index > -1) {
      adminData.announcements.splice(index, 1);
      loadAnnouncements();
      showAlert('Announcement deleted!', 'success');
    }
  }
}

function viewMessage(id) {
  showAlert(`Viewing message ${id}`, 'info');
}

function resendMessage(id) {
  showAlert(`Resending message ${id}`, 'success');
}

function viewDocument(id) {
  showAlert(`Viewing document ${id}`, 'info');
}

function approveDocument(id) {
  const document = adminData.documents.find(d => d.id === id);
  if (document) {
    document.status = 'approved';
    loadDocuments();
    showAlert('Document approved!', 'success');
  }
}

function rejectDocument(id) {
  const document = adminData.documents.find(d => d.id === id);
  if (document) {
    document.status = 'rejected';
    loadDocuments();
    showAlert('Document rejected!', 'success');
  }
}

function viewParent(id) {
  showAlert(`Viewing parent ${id}`, 'info');
}

function editParent(id) {
  showAlert(`Editing parent ${id}`, 'info');
}

function deleteParent(id) {
  if (confirm('Are you sure you want to delete this parent?')) {
    const index = adminData.parents.findIndex(p => p.id === id);
    if (index > -1) {
      adminData.parents.splice(index, 1);
      loadParents();
      showAlert('Parent deleted!', 'success');
    }
  }
}

function viewTeacher(id) {
  showAlert(`Viewing teacher ${id}`, 'info');
}

function editTeacher(id) {
  showAlert(`Editing teacher ${id}`, 'info');
}

function deleteTeacher(id) {
  if (confirm('Are you sure you want to delete this teacher?')) {
    const index = adminData.teachers.findIndex(t => t.id === id);
    if (index > -1) {
      adminData.teachers.splice(index, 1);
      loadTeachers();
      showAlert('Teacher deleted!', 'success');
    }
  }
}

function viewClass(id) {
  showAlert(`Viewing class ${id}`, 'info');
}

function editClass(id) {
  showAlert(`Editing class ${id}`, 'info');
}

function deleteClass(id) {
  if (confirm('Are you sure you want to delete this class?')) {
    const index = adminData.classes.findIndex(c => c.id === id);
    if (index > -1) {
      adminData.classes.splice(index, 1);
      loadClasses();
      showAlert('Class deleted!', 'success');
    }
  }
}

// Report functions
function generateStudentReport() {
  showAlert('Student report generated!', 'success');
}

function generateAttendanceReport() {
  showAlert('Attendance report generated!', 'success');
}

function generateCommunicationReport() {
  showAlert('Communication report generated!', 'success');
}

function generateDocumentReport() {
  showAlert('Document report generated!', 'success');
}

function generateParentEngagementReport() {
  showAlert('Parent engagement report generated!', 'success');
}

function generateSystemReport() {
  showAlert('System report generated!', 'success');
}

// Utility functions
function refreshData() {
  showAlert('Data refreshed!', 'success');
}

function exportDocuments() {
  showAlert('Documents exported!', 'success');
}

function refreshDocuments() {
  loadDocuments();
  showAlert('Documents refreshed!', 'success');
}

function exportParents() {
  showAlert('Parents exported!', 'success');
}

function exportTeachers() {
  showAlert('Teachers exported!', 'success');
}

function exportClasses() {
  showAlert('Classes exported!', 'success');
}

function useTemplate(templateType) {
  showAlert(`Using ${templateType} template`, 'info');
}

// Helper functions
function getMessageStatusClass(status) {
  const statusMap = {
    'sent': 'bg-primary',
    'delivered': 'bg-info',
    'read': 'bg-success',
    'failed': 'bg-danger'
  };
  return statusMap[status] || 'bg-secondary';
}

function getDocumentStatusClass(status) {
  const statusMap = {
    'pending': 'pending',
    'approved': 'approved',
    'rejected': 'rejected'
  };
  return statusMap[status] || 'pending';
}

function getPriorityClass(priority) {
  const priorityMap = {
    'low': 'priority-low',
    'medium': 'priority-medium',
    'high': 'priority-high'
  };
  return priorityMap[priority] || 'priority-medium';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
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
