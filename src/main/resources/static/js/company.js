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
            if(data.response != 0){
                window.location.replace("/company/manage?cpy_id="+data.response);
            }

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

$(document).ready(function () {
    var cpyid = $('#cpyID').val();
    console.log(cpyid);
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            $('#appCpy').val(data.cpy);
            $('#appCpy').attr("disabled",true);
        }
    );

});

$('#registerAppStep1').click(function (){
    var name = $('#appName').val();
    var cpy = $('#appCpy').val();
    var cata = $('#appCata').val();
    var intro = $('#appIntro').val();
    var ver = $('#appVer').val();
    console.log(name+cpy+cata+intro+ver);
    $.post(
        '/company/doRegisterAppStep1',
        {
            name:name,
            svname:cpy,
            catagory:cata,
            intro:intro,
            version:ver
        },
        function (data) {
            console.log(data);
            if(data.response == "插入失败"){
                window.alert("插入失败");
            }else {
                $('#company-manage-main').empty();
                var step2 = $('#step2').html();
                $('#step2').remove();
                $('#company-manage-main').append(step2);
                //等待DOM更新，否则找不到新加入的元素
                window.setTimeout(function() {
                    $('#showappName').val(name);
                    $('#showcpyName').val(cpy);
                    $('#showappName').attr("disabled",true);
                    $('#showcpyName').attr("disabled",true);
                }, 0);
                InitModuleTable(name);
                $('#regModule').click(function () {
                    var modname = $('#moduleName').val();
                    var modver = $('#moduleVer').val();
                    $.post(
                        '/insertModule',
                        {
                            name:modname,
                            ver:modver
                        },
                        function (data) {
                            console.log(data);
                            InitModuleTable(name);
                            if(data.response != "插入失败"){

                            }
                            $('#addModule').modal('hide');
                        }
                    )
                });
            }
        }
    );
});


function InitModuleTable(appname) {
    $('#moduleTable').bootstrapTable({
        url: '/showModuleByAppName?appname='+appname,
        method: 'POST',
        toolbar: '#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                      //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                      //是否显示表格搜索
        strictSearch: false,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        singleSelect: true,
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        //uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表

        columns: [
            {
                field: 'mID',
                title: '模块ID'
            }, {
                field: 'mName',
                title: '模块名'
            }, {
                field: 'depen',
                title: '依赖模块'
            }, {
                field: 'ver',
                title: '版本'
            }
        ]
    });
}
