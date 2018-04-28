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


function initFileInput(ctrlName,uploadUrl) {
    var control = $('#' + ctrlName);
    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl,  //上传地址
        showUpload: false, //是否显示上传按钮
        showRemove:true,
        dropZoneEnabled: false,
        showCaption: true,//是否显示标题
        allowedPreviewTypes: ['image'],
        allowedFileTypes: ['image'],
        allowedFileExtensions:  ['jpg', 'png'],
        maxFileSize : 2000,
        maxFileCount: 1,
        //initialPreview: [
        //预览图片的设置
        //      "<img src='http://127.0.0.1:8080/NewsManageSys/plugin/umeditor1_2_2/jsp/upload/20161030/55061                       477813913474.jpg' class='file-preview-image' alt='肖像图片' title='肖像图片'>",
        //],

    }).on("fileuploaded",function (event,data) {
        $("#path").attr("value",data.response);
    });
}

$(function () {
    var path="/company/uploadimg";
    initFileInput("appImg",path);

})

