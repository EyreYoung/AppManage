$('#companyRegister').click(function (){
    var acc = $('#regAcc').val();
    var pwd = $('#regPwd').val();
    var pwd2 = $('#regPwd2').val();
    var cpy = $('#regCpy').val();
    var mail = $('#regMail').val();
    var tel = $('#regTel').val();
    console.log(acc+pwd+cpy+mail+tel);
    if(pwd != pwd2){
        window.alert("输入密码不一致");
    }else{
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
    }
});



$('#companyLogin').click(function () {
    var acc = $('#cpyLoginAcc').val();
    var pwd = $('#cpyLoginPwd').val();
    console.log(acc+pwd);
    $.post(
        '/company/doLogin',
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


