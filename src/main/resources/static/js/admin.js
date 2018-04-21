$('#login').click(function () {
    var acc = $('#loginAccount').val();
    var pwd = $('#loginPassword').val();
    console.log(acc + pwd);
    if(acc != '' && pwd != ''){
        $.post(
            '/admin',
            {
                account:acc,
                password:pwd
            },
            function (data) {
                window.alert(data);
            }
        )
    }
});