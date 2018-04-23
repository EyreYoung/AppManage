$('#companyRegister').click(function (){
    var acc = $('#regAcc').val();
    var pwd = $('#regPwd').val();
    var cpy = $('#regCpy').val();
    var mail = $('#regMail').val();
    var tel = $('#regTel').val();
    console.log(acc+pwd+cpy+mail+tel);
    $.post(
        '/company/doRegister',
        {
            account:acc,
            password:pwd,
            company:cpy,
            mail:mail,
            tel:tel
        },
        function (data) {
            console.log(data);
            window.alert(data.response);
        }
    );

});