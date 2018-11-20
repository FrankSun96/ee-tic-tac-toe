;
(function() {
    const checkCookie = () => {
        if (cookie.get('userId') !== undefined) {
            $('.login-allowed').prop('hidden', false);
            $('.login-disappear').prop('hidden', true);
            $('.welcome').html(`Hello ${cookie.get('username')} !`);
        } else {
            $('.login-allowed').prop('hidden', true);
            $('.login-disappear').prop('hidden', false);
            $('.welcome').html('');
        }
    }

    checkCookie();

    $('.login-btn').on('click', () => {
        let error = false;
        let input = $('#login-form :input');
        let u_username = input.eq(0).val();
        let u_password = input.eq(1).val();
        if (u_username === '') {
            $('.login-alert:eq(0)').prop('hidden', false);
            error = true;
        }
        if (u_password === '') {
            $('.login-alert:eq(1)').prop('hidden', false);
            error = true;
        }
        if (error) {
            return false;
        } else {
            let request = {
                url: 'application/controller/login_check.php',
                data: {
                    username: u_username,
                    password: u_password
                }
            };
            ajaxPromise(request)
                .then(res => {
                    if (Number(res) === -1 || Number(res) === 0) {
                        $('.login-alert:eq(2)').prop('hidden', false);
                    } else {
                        cookie.set('userId', Number(res), 1);
                        cookie.set('username', u_username, 1);
                        checkCookie();
                        self.location = 'index.php';
                    }
                })
        }
    });

    $('.register-btn').on('click', () => {
        let error = false;
        let input = $('#register-form :input');
        let user = {};
        $.each(input, (key, value) => {
            if (key < 4) {
                if (value.value === '') {
                    $(`.register-alert:eq(${key})`).prop('hidden', false);
                    error = true;
                } else {
                    user[value.name] = value.value;
                }
            }
        });
        if (!error) {
            let request = {
                url: 'application/controller/register_check.php',
                data: user
            };
            ajaxPromise(request)
                .then(res => {
                    let pattern = '^[A-Za-z]+';
                    let matchResult = res.match(pattern);
                    if (matchResult === null) {
                        cookie.set('userId', res, 1);
                        cookie.set('username', user.username, 1);
                        checkCookie();
                        self.location = 'login.php';
                    } else {
                        $('.register-warning').html(res).prop('hidden', false);
                    }
                })
        }
    });
})();