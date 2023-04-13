$(() => {

  $('#login-form').submit(function(e) {
    let $form = this;

    e.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();

    $.ajax({
        type: 'POST',
        url: 'users/login',
        user: {
            email: email,
            password: password
        },
        success: function(user) {
            if(user) {
                $form.submit();
            } else {
                $("#error_notif").show();
            }
        }
    });
});
});
