
jQuery(document).ready(function () {

    var registered = true;
    var check = true;
    $('#error-message').hide();
    $('#error-message').text("");
    /*

        Login form validation
    */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.login-form').on('submit', function (e) {

        $(this).find('input[type="text"], input[type="password"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });

    });

    /*
        Registration form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function () {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function (e) {

        $(this).find('input[type="text"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        $(this).find('input[type="password"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        $(this).find('input[type="email"], textarea').each(function () {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
                $('#error-message').show();
                $('#error-message').text("Email Cannot be empty");
                check = false;
            }
            else {
                $(this).removeClass('input-error');
                $('#error-message').hide();
                $('#error-message').text("");
                check = true;
            }
            if (registered == true && check == true) {
                e.preventDefault();
                $(this).addClass('input-error');
                $('#error-message').show();
                $('#error-message').text("Email Already Registered");
            }
            else if (registered == false && check == true) {
                $(this).removeClass('input-error');
                $('#error-message').hide();
                $('#error-message').text("");
            }
        });


    });
    $('#reg-form-username').on("blur",
      function (value, element) {
          var result = false;
          console.log('in validation');
          var value = $('#reg-form-username').val();
          $.ajax({
              type: "POST",
              async: false,
              url: "/Account/validateUsername", // script to validate in server side
              data: "email=" + value,
              success: function (data) {
                  if (data == "true") {
                      $('#reg-form-email').removeClass('input-error');
                      registered = false;
                      $('#error-message').hide();
                      $('#error-message').text("");
                  }
                  else {
                      $('#reg-form-email').addClass('input-error');
                      registered = true;
                      $('#error-message').show();
                      $('#error-message').text("Username Already Registered");

                  }
              }

          });


      });

});
