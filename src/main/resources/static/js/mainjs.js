$(document).ready(function() {

    if (window.location.pathname.includes('/user/profile')) {
        var token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn chưa đăng nhập! Đang chuyển hướng về trang Login...');
            window.location.href = '/login';
            return;
        }

        $.ajax({
            type: 'GET',
            url: '/users/me',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(data) {
                $('#profile').text(data.fullName);
                $('#emailDisplay').text(data.email);
                if (data.images) {
                    $('#images').attr('src', data.images);
                }
            },
            error: function(xhr) {
                alert('Phiên làm việc hết hạn hoặc Token không hợp lệ!');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        });
    }

    $('#loginBtn').click(function() {
        var email = $('#email').val();
        var password = $('#password').val();

        if (!email || !password) {
            alert('Vui lòng nhập đầy đủ Email và Mật khẩu!');
            return;
        }

        var loginData = {
            email: email,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: '/auth/login',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(loginData),
            success: function(response) {
                localStorage.setItem('token', response.token);
                window.location.href = '/user/profile';
            },
            error: function() {
                alert('Đăng nhập thất bại! Sai email hoặc mật khẩu.');
            }
        });
    });

    $('#logout').click(function() {
        localStorage.clear();
        window.location.href = '/login';
    });

});