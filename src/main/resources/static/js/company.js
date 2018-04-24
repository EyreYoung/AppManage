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


$('#registerApp').click(function (){
    var name = $('#appName').val();
    var cpy = $('#appCpy').val();
    var cata = $('#appCata').val();
    var intro = $('#appIntro').val();
    var ver = $('#appVer').val();
    console.log(name+cpy+cata+intro+ver);
    $.post(
        '/company/doRegisterApp',
        {
            name:name,
            svname:cpy,
            catagory:cata,
            intro:intro,
            version:ver
        },
        function (data) {
            console.log(data);
            window.alert(data.response);
        }
        );
});


