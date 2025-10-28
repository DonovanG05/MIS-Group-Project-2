<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

class FileDatabase {
    private $dataDir = 'data/';
    
    public function __construct() {
        // Create data directory if it doesn't exist
        if (!file_exists($this->dataDir)) {
            mkdir($this->dataDir, 0755, true);
        }
    }
    
    // Get all users from file
    public function getUsers() {
        $file = $this->dataDir . 'users.json';
        if (file_exists($file)) {
            $content = file_get_contents($file);
            return json_decode($content, true) ?: [];
        }
        return [];
    }
    
    // Save users to file
    public function saveUsers($users) {
        $file = $this->dataDir . 'users.json';
        return file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));
    }
    
    // Add a new user
    public function addUser($userData) {
        $users = $this->getUsers();
        
        // Check if user already exists
        foreach ($users as $user) {
            if ($user['email'] === $userData['email']) {
                return false; // User already exists
            }
        }
        
        // Add new user
        $users[] = $userData;
        return $this->saveUsers($users);
    }
    
    // Find user by email
    public function findUserByEmail($email) {
        $users = $this->getUsers();
        foreach ($users as $user) {
            if ($user['email'] === $email) {
                return $user;
            }
        }
        return null;
    }
    
    // Authenticate user
    public function authenticate($email, $password) {
        $user = $this->findUserByEmail($email);
        if ($user && $user['password'] === $password) {
            return $user;
        }
        return null;
    }
    
    // MESSAGING FUNCTIONS
    
    // Get all messages from file
    public function getMessages() {
        $file = $this->dataDir . 'messages.json';
        if (file_exists($file)) {
            $content = file_get_contents($file);
            return json_decode($content, true) ?: [];
        }
        return [];
    }
    
    // Save messages to file
    public function saveMessages($messages) {
        $file = $this->dataDir . 'messages.json';
        return file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT));
    }
    
    // Add a new message
    public function addMessage($messageData) {
        $messages = $this->getMessages();
        
        // Add message with unique ID and timestamp
        $messageData['id'] = uniqid();
        $messageData['timestamp'] = date('Y-m-d H:i:s');
        $messageData['read'] = false;
        
        $messages[] = $messageData;
        return $this->saveMessages($messages);
    }
    
    // Get messages for a specific user (by role)
    public function getMessagesForUser($userRole, $userId = null) {
        $messages = $this->getMessages();
        $userMessages = [];
        
        foreach ($messages as $message) {
            // Teachers see messages sent TO them
            if ($userRole === 'teacher' && $message['recipient_role'] === 'teacher') {
                $userMessages[] = $message;
            }
            // Parents see messages they sent
            elseif ($userRole === 'parent' && $message['sender_role'] === 'parent' && $message['sender_id'] === $userId) {
                $userMessages[] = $message;
            }
        }
        
        // Sort by timestamp (newest first)
        usort($userMessages, function($a, $b) {
            return strtotime($b['timestamp']) - strtotime($a['timestamp']);
        });
        
        return $userMessages;
    }
    
    // Mark message as read
    public function markMessageAsRead($messageId) {
        $messages = $this->getMessages();
        
        foreach ($messages as &$message) {
            if ($message['id'] === $messageId) {
                $message['read'] = true;
                break;
            }
        }
        
        return $this->saveMessages($messages);
    }
}

// Handle API requests
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

$db = new FileDatabase();

switch ($method) {
    case 'POST':
        if (isset($input['action'])) {
            switch ($input['action']) {
                case 'login':
                    if (isset($input['email']) && isset($input['password'])) {
                        $user = $db->authenticate($input['email'], $input['password']);
                        if ($user) {
                            // Remove password from response
                            unset($user['password']);
                            echo json_encode([
                                'success' => true,
                                'user' => $user
                            ]);
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Invalid email or password'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'Email and password required'
                        ]);
                    }
                    break;
                    
                case 'register':
                    if (isset($input['name']) && isset($input['email']) && isset($input['password']) && isset($input['userType'])) {
                        // Validate password strength
                        if (strlen($input['password']) < 8 || !preg_match('/[A-Za-z]/', $input['password']) || !preg_match('/[0-9]/', $input['password'])) {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Password must be at least 8 characters with letters and numbers'
                            ]);
                            break;
                        }
                        
                        $userData = [
                            'id' => uniqid(),
                            'name' => $input['name'],
                            'email' => $input['email'],
                            'password' => $input['password'],
                            'role' => $input['userType'],
                            'registeredAt' => date('Y-m-d H:i:s')
                        ];
                        
                        if ($db->addUser($userData)) {
                            echo json_encode([
                                'success' => true,
                                'message' => 'User registered successfully'
                            ]);
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'User with this email already exists'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'All registration fields required'
                        ]);
                    }
                    break;
                    
                case 'send_message':
                    if (isset($input['sender_id']) && isset($input['sender_role']) && isset($input['recipient_role']) && isset($input['subject']) && isset($input['message'])) {
                        $messageData = [
                            'sender_id' => $input['sender_id'],
                            'sender_role' => $input['sender_role'],
                            'sender_name' => $input['sender_name'] ?? 'Unknown',
                            'recipient_role' => $input['recipient_role'],
                            'subject' => $input['subject'],
                            'message' => $input['message'],
                            'priority' => $input['priority'] ?? 'medium'
                        ];
                        
                        if ($db->addMessage($messageData)) {
                            echo json_encode([
                                'success' => true,
                                'message' => 'Message sent successfully'
                            ]);
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Failed to send message'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'All message fields required'
                        ]);
                    }
                    break;
                    
                case 'get_messages':
                    if (isset($input['user_role']) && isset($input['user_id'])) {
                        $messages = $db->getMessagesForUser($input['user_role'], $input['user_id']);
                        echo json_encode([
                            'success' => true,
                            'messages' => $messages
                        ]);
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'User role and ID required'
                        ]);
                    }
                    break;
                    
                case 'mark_read':
                    if (isset($input['message_id'])) {
                        if ($db->markMessageAsRead($input['message_id'])) {
                            echo json_encode([
                                'success' => true,
                                'message' => 'Message marked as read'
                            ]);
                        } else {
                            echo json_encode([
                                'success' => false,
                                'message' => 'Failed to mark message as read'
                            ]);
                        }
                    } else {
                        echo json_encode([
                            'success' => false,
                            'message' => 'Message ID required'
                        ]);
                    }
                    break;
                    
                default:
                    echo json_encode([
                        'success' => false,
                        'message' => 'Invalid action'
                    ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Action required'
            ]);
        }
        break;
        
    case 'GET':
        // Return all users (for debugging - remove in production)
        $users = $db->getUsers();
        foreach ($users as &$user) {
            unset($user['password']); // Don't expose passwords
        }
        echo json_encode([
            'success' => true,
            'users' => $users
        ]);
        break;
        
    default:
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
}
?>
