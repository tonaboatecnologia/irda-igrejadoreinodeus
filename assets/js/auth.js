// Authentication System
$(document).ready(function() {
    // Login Form Submission
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        
        var email = $('#loginEmail').val();
        var password = $('#loginPassword').val();
        
        // Simple validation
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simulate AJAX request
        setTimeout(function() {
            // In a real app, this would be an AJAX call to your backend
            console.log('Login attempt with:', email, password);
            
            // Redirect based on user role (simulated)
            var userRole = simulateLogin(email, password);
            
            if (userRole) {
                alert('Login bem-sucedido! Redirecionando...');
                window.location.href = getDashboardUrl(userRole);
            } else {
                alert('Credenciais inválidas. Por favor, tente novamente.');
            }
        }, 1000);
    });
    
    // Registration Form Submission
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        
        var name = $('#registerName').val();
        var email = $('#registerEmail').val();
        var phone = $('#registerPhone').val();
        var church = $('#registerChurch').val();
        var password = $('#registerPassword').val();
        var confirmPassword = $('#registerConfirmPassword').val();
        
        // Validation
        if (!name || !email || !phone || !church || !password || !confirmPassword) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
            return;
        }
        
        // Simulate registration
        setTimeout(function() {
            console.log('Registration data:', {name, email, phone, church, password});
            alert('Registro bem-sucedido! Um email de confirmação foi enviado.');
            $('#loginModal').modal('hide');
        }, 1000);
    });
    
    // Simulate login (in a real app, this would be server-side)
    function simulateLogin(email, password) {
        // This is just for demonstration - never do this in production!
        var users = {
            'reverendo@boatona.org': { password: 'reverendo123', role: 'reverendo' },
            'pastor@boatona.org': { password: 'pastor123', role: 'pastor' },
            'lider@boatona.org': { password: 'lider123', role: 'lider' },
            'membro@boatona.org': { password: 'membro123', role: 'membro' }
        };
        
        if (users[email] && users[email].password === password) {
            return users[email].role;
        }
        
        return null;
    }
    
    // Get dashboard URL based on user role
    function getDashboardUrl(role) {
        switch(role) {
            case 'reverendo':
                return 'admin/dashboard.html?role=reverendo';
            case 'pastor':
                return 'admin/dashboard.html?role=pastor';
            case 'lider':
                return 'admin/dashboard.html?role=lider';
            default:
                return 'member/dashboard.html';
        }
    }
    
    // Load churches for registration form
    function loadChurchesForRegistration() {
        // In a real app, this would be an AJAX call
        var churches = [
            { id: 1, name: "Catedral BOATONA - Luanda" },
            { id: 2, name: "Igreja BOATONA - Benguela" },
            // More churches...
        ];
        
        churches.forEach(church => {
            $('#registerChurch').append(`<option value="${church.id}">${church.name}</option>`);
        });
    }
    
    
    // Initialize
    loadChurchesForRegistration();

});