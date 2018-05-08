//开发商注册
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


//开发商登录
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


//进入页面根据开发商id初始化页面
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

    initApptable(cpyid);

});

//注册应用第一步 填写基本信息（应用名、类别、应用简介、应用版本）
$('#registerAppStep1').click(function (){
    var name = $('#appName').val();
    var cpy = $('#appCpy').val();
    var cata = $('#appCata').val();
    var intro = $('#appIntro').val();
    var ver = $('#appVer').val();
    console.log(name+cpy+cata+intro+ver);
    //传递基本信息，成功则进行第二步 注册模块
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
                window.alert("注册失败。原因可能为：必填项为空/应用名重复。");
            }else {
                //进入注册第二步
                $('#reg').empty();
                var step2 = $('#step2').html();
                $('#step2').remove();
                $('#reg').append(step2);
                //等待DOM更新，否则找不到新加入的元素
                window.setTimeout(function() {
                    //默认填好应用名和开发商名
                    $('#showappName').val(name);
                    $('#showcpyName').val(cpy);
                    $('#showappName').attr("disabled",true);
                    $('#showcpyName').attr("disabled",true);
                }, 0);

                //弹出添加模块模态框时触发：复选框放入该应用已注册的模块
                $('#addModule').on('show.bs.modal',function () {
                    //获取该应用已有的模块
                    $.post(
                        '/showModuleByAppName',
                        {
                            appname:name
                        },
                        function (data) {
                            $('#moduleDep').empty();
                            for(var module in data){
                                $('#moduleDep').append('<label class="btn btn-default">\n' +
                                    '                                        <input type="checkbox" name="dependModule" value="' + data[module].mID + '"> ' + data[module].mName + '\n' +
                                    '                                    </label>')
                            }
                        }

                    );
                    $('#moduleName').val("");
                    $('#moduleVer').val("");
                });
                InitModuleTable(name);

                //模块注册模态框中点击保存时
                $('#regModule').click(function () {
                    var modname = $('#moduleName').val();
                    var modver = $('#moduleVer').val();
                    var modreq = $("input[name='modReq']:checked").val();
                    //获取所有选择的依赖模块
                    var depmods = document.getElementsByName('dependModule');
                    var modid = 0;
                    $.post(
                        '/insertModule',
                        {
                            appname:name,
                            name:modname,
                            ver:modver,
                            req:modreq
                        },
                        function (data) {
                            console.log(data);
                            InitModuleTable(name);
                            if(data.response != "插入失败"){
                                modid = data.mID;
                                //把选中的依赖模块注册进数据库的依赖表
                                for(var i = 0; i < depmods.length; i++){
                                    //如果模块被选中
                                    if(depmods[i].checked){
                                        $.post(
                                            '/insertModuleDepend',
                                            {
                                                moduleID1:modid,
                                                dependID:depmods[i].value
                                            },
                                            function (data) {
                                                console.log(data.response);
                                            }
                                        );
                                    }
                                }
                                window.alert("模块注册成功")
                            }
                        }
                    );
                    $('#addModule').modal('hide');
                });
                //模态框关闭时触发
                $('#addModule').on('hide.bs.modal',function () {
                    //刷新模块表
                    $('#moduleTable').bootstrapTable('refresh',{url: '/showModuleByAppName?appname='+name});
                });

                //第二步中点击下一步进入第三步
                $('#registerAppStep2').click(function () {
                    $('#reg').empty();
                    var step3 = $('#step3').html();
                    $('#step3').remove();
                    $('#reg').append(step3);
                    //等待DOM更新，否则找不到新加入的元素
                    window.setTimeout(function() {
                        //默认填好应用名和开发商名
                        $('#showappName2').val(name);
                        $('#showcpyName2').val(cpy);
                        $('#showappName2').attr("disabled",true);
                        $('#showcpyName2').attr("disabled",true);
                    }, 0);
                    //进入第三步时在下拉框加载出上一步已注册的模块以供选择
                    $.post(
                        '/showModuleByAppName',
                        {
                            appname:name
                        },
                        function (data) {
                            $('#showmoduleName').empty();
                            for(var module in data){
                                $('#showmoduleName').append('<option value="' + data[module].mID + '">' + data[module].mName + '</option>');
                            }
                        }
                    );
                    var moduleid = $('#showmoduleName option:selected').val();
                    InitServiceTable(moduleid);
                    //选择模块时触发
                    $('#showmoduleName').on("change",function () {
                        var moduleid = $('#showmoduleName option:selected').val();
                        $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                    });

                    //进入注册服务模态框时
                    $('#addService').on('show.bs.modal',function () {
                        var moduleid = $('#showmoduleName option:selected').val();
                        //获取该应用已有的服务
                        $.post(
                            '/showServiceByModuleID',
                            {
                                moduleid:moduleid
                            },
                            function (data) {
                                $('#serviceDep').empty();
                                for(var service in data){
                                    $('#serviceDep').append('<label class="btn btn-default">\n' +
                                        '                                        <input type="checkbox" name="dependService" value="' + data[service].sID + '"> ' + data[service].sName + '\n' +
                                        '                                    </label>')
                                }
                            }

                        );
                        $('#serviceName').val("");
                        $('#serviceVer').val("");
                    });

                    //服务注册模态框点击保存时
                    $('#regService').on("click",function () {
                        var moduleid = $('#showmoduleName option:selected').val();
                        var sername = $('#serviceName').val();
                        var server = $('#serviceVer').val();
                        var serreq = $("input[name='serReq']:checked").val();
                        //获取所有选择的依赖服务
                        var depsers = document.getElementsByName('dependService');
                        var serid = 0;
                        //post插入服务
                        $.post(
                            '/insertService',
                            {
                                mid:moduleid,
                                name:sername,
                                ver:server,
                                req:serreq
                            },
                            function (data) {
                                console.log(data);
                                if(data.response != "插入失败"){
                                    serid = data.sID;
                                    //把选中的依赖服务注册进数据库的依赖表
                                    for(var i = 0; i < depsers.length; i++){
                                        //如果服务被选中
                                        if(depsers[i].checked){
                                            $.post(
                                                '/insertServiceDepend',
                                                {
                                                    ServiceID:serid,
                                                    DependID:depsers[i].value
                                                },
                                                function (data) {
                                                    console.log(data.response);
                                                }
                                            );
                                        }
                                    }
                                    window.alert("服务注册成功")
                                }
                            }
                        );
                        $('#addService').modal('hide');
                        $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                    })
                })
            }
        }
    );
});

//初始化模块表
function InitModuleTable(appname) {
    $('#moduleTable').bootstrapTable({
        url: '/showModuleByAppName?appname='+appname,
        method: 'POST',
        toolbar: '#moduletoolbar',
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

//初始化模块的服务表
function InitServiceTable(moduleid) {
    $('#serviceTable').bootstrapTable({
        url: '/showServiceByModuleID?moduleid='+moduleid,
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
                field: 'sID',
                title: '服务ID'
            }, {
                field: 'sName',
                title: '服务名'
            }, {
                field: 'sDepen',
                title: '依赖服务'
            }, {
                field: 'sReq',
                title: '必选'
            }, {
                field: 'sVer',
                title: '版本'
            }
        ]
    });
}

//开发商应用管理
function initApptable(cpyid) {
    $('#appmanage').bootstrapTable({
        url: '/queryAppByCpyID?cpy_id='+cpyid,
        method: 'POST',
        toolbar: '#appmanagetoolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: true,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
        pageNumber: 1,                      //初始化加载第一页，默认第一页,并记录
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        search: true,                       //是否显示表格搜索
        strictSearch: false,
        showColumns: true,                  //是否显示所有的列（选择显示的列）
        showRefresh: true,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        singleSelect: true,                 //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        singleSelect: true,                 //单选checkbox

        columns: [
            {
               checkbox: true
            }, {
                field: 'name',
                title: '应用名'
            }, {
                field: 'catagory',
                title: '类别'
            }, {
                field: 'regDate',
                title: '注册时间',
                sortable: true
            }, {
                field: 'star',
                title: '评分'
            }, {
                field: 'intro',
                title: '简介'
            }, {
                field: 'version',
                title: '版本'
            },{
                field: 'status',
                title: '状态'
            }
            // ,{
            //     field: 'operate',
            //     title: '操作',
            //     width: '202px',
            //     event: manageEvents,
            //     formatter: operateFormatter
            // }
        ]
    });
}


// function operateFormatter(value, row, index) {
//     return [
//         '<button type="button" class="RoleOfedit btn btn-success btn-sm">编辑</button>',
//         // '<button type="cbutton" class="RoleOfdrop btn btn-warning btn-sm">下架</button>',
//         // '<button type="cbutton" class="RoleOfdele btn btn-danger btn-sm">删除</button>',
//         // '<button type="cbutton" class="RoleOfmana btn btn-info btn-sm">管理</button>',
//     ].join('');
// }

// window.manageEvents = {
//     'click .RoleOfedit': function (e, value, row, index) {
//         window.alert("ccc");
//     },
//     'click .RoleOfdrop': function (e, value, row, index) {
//         window.alert("ccc");
//     },
//     'click .RoleOfdele': function (e, value, row, index) {
//         window.alert("ccc");
//     },
//     'click .RoleOfmana': function (e, value, row, index) {
//         window.alert("ccc");
//     }
// };

//应用下架
$('#manage-dropbutton').click(function () {
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        console.log(selectContent[0]);
        $.post(
            '/dropAppByID',
            {
                app_id: selectContent[0].id
            },
            function (data) {
                alert(data.response);
                $('#appmanage').bootstrapTable('refresh');
            }
        );
    }
});

//删除应用
$('#manage-deletebutton').click(function () {
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        console.log(selectContent[0]);
        $.post(
            '/deleteAppByID',
            {
                app_id: selectContent[0].id
            },
            function (data) {
                alert(data.response);
                $('#appmanage').bootstrapTable('refresh');
            }
        );
    }
});

//修改应用
$('#manage-editbutton').on('click',function () {
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        console.log(selectContent[0]);
        $('#editapp-modal').modal("show");
        $('#editappName').val(selectContent[0].name);
        $('#editappCata').selectpicker('val', selectContent[0].catagory);
        $('#editappIntro').val(selectContent[0].intro);
    }
});

//修改应用模态框中点击保存
//如果放在修改应用点击事件里会导致多次点击模态框后，再次保存会多次post
$('#modal-editapp-save').on('click',function () {
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    var newname = $('#editappName').val();
    var newcata = $('#editappCata').val();
    var newintro = $('#editappIntro').val();
    $.post(
        '/updateAppByID',
        {
            newname: newname,
            newcata: newcata,
            newintro: newintro,
            app_id: selectContent[0].id
        },
        function (data) {
            console.log(data);
            alert(data.response);
            $('#appmanage').bootstrapTable('refresh');
            $('#editapp-modal').modal("hide");
        }
    );
});