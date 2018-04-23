$('#login').click(function () {
    var acc = $('#loginAccount').val();
    var pwd = $('#loginPassword').val();
    console.log(acc+pwd);
    $.post(
        '/admin/doLogin',
        {
            account:acc,
            password:pwd
        },
        function (data) {
            console.log(data);
            window.alert(data.response);

        }
    );
});