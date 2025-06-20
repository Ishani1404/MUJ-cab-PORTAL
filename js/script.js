// Basic functionality for the portal
document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const role = document.getElementById('role').value;
            
            // Simple redirect based on role (in a real app, you'd have proper authentication)
            switch(role) {
                case 'admin':
                    window.location.href = 'admin/dashboard.html';
                    break;
                case 'coordinator':
                    window.location.href = 'coordinator/dashboard.html';
                    break;
                case 'approver':
                    window.location.href = 'approver/dashboard.html';
                    break;
                case 'travel_manager':
                    window.location.href = 'travel-manager/dashboard.html';
                    break;
                default:
                    alert('Please select a valid role');
            }
        });
    }
    
    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logout');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, you'd clear session/token here
            window.location.href = '../../login.html';
        });
    });
    
    // Filter buttons for coordinator dashboard
    const filterButtons = document.querySelectorAll('.btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // In a real app, you'd filter requests here
        });
    });
    
    // Approve/Reject buttons for approver dashboard
    const approveButtons = document.querySelectorAll('.btn-approve');
    const rejectButtons = document.querySelectorAll('.btn-reject');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.classList.remove('pending');
            card.classList.add('approved');
            // In a real app, you'd send an API request here
            alert('Request approved! It will now be sent to the travel manager.');
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.classList.remove('pending');
            card.classList.add('rejected');
            // In a real app, you'd send an API request here
            alert('Request rejected. The coordinator will be notified.');
        });
    });
    
    // Final approval for travel manager
    const finalApproveButtons = document.querySelectorAll('.btn-final-approve');
    finalApproveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            const driverSelect = card.querySelector('.driver-select');
            
            if (!driverSelect.value) {
                alert('Please select a driver first');
                return;
            }
            
            // In a real app, you'd send an API request here
            alert('Request finalized! The driver and guest will be notified.');
        });
    });
});

// Add these to your existing script.js

// Form Field Visibility Toggle
function setupFormFieldVisibility() {
    const travelType = document.getElementById('travelType');
    if (travelType) {
        travelType.addEventListener('change', function() {
            const flightDetails = document.getElementById('flightDetails');
            if (this.value === 'flight') {
                flightDetails.style.display = 'block';
            } else {
                flightDetails.style.display = 'none';
            }
        });
    }

    const returnDate = document.getElementById('returnDate');
    if (returnDate) {
        returnDate.addEventListener('change', function() {
            const returnFlightDetails = document.getElementById('returnFlightDetails');
            if (this.value && document.getElementById('travelType').value === 'flight') {
                returnFlightDetails.style.display = 'block';
            } else {
                returnFlightDetails.style.display = 'none';
            }
        });
    }
}

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('cabRequestForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            alert('Request submitted successfully! It will now be reviewed by the approver.');
            window.location.href = 'dashboard.html';
        } else {
            alert('Please fill in all required fields marked with *.');
        }
    });

    // Highlight empty required fields when trying to submit
    document.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = 'var(--danger-color)';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
}

// Initialize form-related scripts when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing DOMContentLoaded code)
    
    setupFormFieldVisibility();
    setupFormValidation();
});

// Add these to your existing script.js

// Generate random password
function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Setup user management functionality
function setupUserManagement() {
    // Generate password button
    const generateBtn = document.getElementById('generatePassword');
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            const password = generatePassword();
            document.getElementById('password').value = password;
            document.getElementById('confirmPassword').value = password;
        });
    }

    // User role filter buttons
    const filterButtons = document.querySelectorAll('.users-table-container .btn-filter');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter table rows
            const rows = document.querySelectorAll('.users-table tbody tr');
            rows.forEach(row => {
                if (filter === 'all' || row.getAttribute('data-role') === filter) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });

    // Form validation for add user
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value) {
                    field.style.borderColor = 'var(--danger-color)';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            // Validate password match
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                document.getElementById('confirmPassword').style.borderColor = 'var(--danger-color)';
                isValid = false;
            }
            
            if (isValid) {
                // In a real app, you would send the form data to the server here
                alert('User created successfully!');
                this.reset();
                
                // In a real app, you would refresh the user list from the server
                // For now, we'll just show the success message
            }
        });
    }

    // Table action buttons
    document.querySelectorAll('.btn-edit, .btn-delete, .btn-reset').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const userName = row.cells[0].textContent;
            const userRole = row.getAttribute('data-role');
            
            if (this.classList.contains('btn-edit')) {
                alert(`Edit user: ${userName} (${userRole})`);
                // In a real app, you would open an edit modal/form
            } else if (this.classList.contains('btn-delete')) {
                if (confirm(`Are you sure you want to delete ${userName}?`)) {
                    // In a real app, you would send a delete request to the server
                    row.remove();
                    alert('User deleted successfully!');
                }
            } else if (this.classList.contains('btn-reset')) {
                const newPassword = generatePassword();
                alert(`Password reset for ${userName}\nNew temporary password: ${newPassword}`);
                // In a real app, you would send this to the server
            }
        });
    });
}

// Initialize user management scripts when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing DOMContentLoaded code)
    
    setupUserManagement();
});

// Update your existing DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Show/hide New User button based on role selection
    const roleSelect = document.getElementById('role');
    const newUserContainer = document.getElementById('newUserContainer');
    
    if (roleSelect && newUserContainer) {
        roleSelect.addEventListener('change', function() {
            if (this.value === 'admin') {
                newUserContainer.style.display = 'block';
            } else {
                newUserContainer.style.display = 'none';
            }
        });
        
        // New User button functionality
        const newUserBtn = document.getElementById('newUserBtn');
        if (newUserBtn) {
            newUserBtn.addEventListener('click', function() {
                // In a real app, you would verify admin credentials first
                window.location.href = 'admin/add-user.html';
            });
        }
    }
    
});