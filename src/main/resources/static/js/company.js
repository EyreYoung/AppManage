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
            if(data.success){
                window.location.replace("/company/manage?cpy_id="+data.cpy_id);
            }else{
                alert("账号密码错误");
            }

        }
    );
});

//上传应用图片
function initFileInput(uploadUrl) {
    $('#appImg').fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        allowedFileExtensions : ['jpg', 'png','gif'],//接收的文件后缀
        uploadAsync: true, //默认异步上传
        showUpload: false, //是否显示上传按钮
        showCaption: true,//是否显示标题
        dropZoneEnabled: false,//是否显示拖拽区域
        browseClass: "btn btn-primary", //按钮样式
        maxFileCount: 1,
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>"
    });
    //异步上传返回结果处理
    $('.appImg').on('fileerror', function(event, data, msg) {
        console.log("fileerror");
        console.log(data);
    });
    //异步上传返回结果处理
    $(".appImg").on("fileuploaded", function(event, data, previewId, index) {
        console.log("fileuploaded");
        console.log(data);

    });
    //上传前
    $('.appImg').on('filepreupload', function(event, data, previewId, index) {
        console.log("filepreupload");
    });
}

//进入页面根据开发商id初始化页面
$(document).ready(function () {
    var path="/company/uploadimg";
    initFileInput(path);
    var cpyid = $('#cpyID').val();
    console.log(cpyid);
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            $('#appCpy').val(data[0].company);
            $('#appCpy').attr("disabled",true);
            $('#update-account').val(data[0].account);
            //修改个人信息
            $('#confirm').click(function () {
                var pwd = $('#update-password-confirm').val();
                $.post(
                    '/company/doLogin',
                    {
                        account:data[0].account,
                        password:pwd
                    },
                    function (result) {
                        if(result.success){
                            var updateinfo = $('#update-info-full').html();
                            $('#update-info').empty();
                            $('#update-info-full').remove();
                            $('#update-info').append(updateinfo);
                            $('#update-company').val(data[0].company);
                            $('#update-password').val(data[0].password);
                            $('#update-mail').val(data[0].mail);
                            $('#update-tel').val(data[0].tel);
                            //点击保存修改
                            $('#confirm-save').on("click",function () {
                                var password = $('#update-password').val();
                                var company = $('#update-company').val();
                                var tel = $('#update-tel').val();
                                var mail = $('#update-mail').val();
                                $.post(
                                    '/company/updateCpyByID',
                                    {
                                        cpy_id:cpyid,
                                        password:password,
                                        company:company,
                                        tel:tel,
                                        mail:mail
                                    },
                                    function (updateresult) {
                                        if(updateresult.success){
                                            alert("修改成功");
                                            location.reload();
                                        }else {
                                            alert("修改失败，公司名可能重复或有未填项");
                                        }
                                    }
                                );
                            });
                        }else {
                            alert("密码错误");
                            $('#update-password-confirm').val("");
                        }
                    }
                );
            });
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
    //传递基本信息，成功则进行第二步 注册权限
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
            }
            //第一步成功后
            else {
                $('#reg').empty();
                var step2 = $('#step2').html();
                $('#step2').remove();
                $('#reg').append(step2);
                //等待DOM更新，否则找不到新加入的元素
                window.setTimeout(function() {
                    //默认填好应用名和开发商名
                    $('#showappName0').val(name);
                    $('#showcpyName0').val(cpy);
                    $('#showappName0').attr("disabled",true);
                    $('#showcpyName0').attr("disabled",true);
                }, 0);
                InitAuthorityTable(name);

                //点击删除权限按钮
                $('#deleteauthority').on("click",function () {
                    var selectContent = $('#authorityTable').bootstrapTable('getSelections');
                    if(selectContent.length!=1){
                        alert("请选择一个权限");
                    }else {
                        $.post(
                            '/deleteAuthByID',
                            {
                                auth_id: selectContent[0].auth_id
                            },
                            function (data) {
                                console.log(data);
                                $('#authorityTable').bootstrapTable('refresh');
                                alert(data.response);
                            }
                        );
                    }
                });

                //权限注册模态框中点击保存时
                $('#regAuthority').click(function () {
                    var auth_name = $('#authName').val();
                    var auth_intro = $('#authIntro').val();
                    var auth_id = 0;
                    $.post(
                        '/insertAuthority',
                        {
                            auth_name:auth_name,
                            auth_intro:auth_intro,
                            app_name:name,
                        },
                        function (data) {
                            console.log(data);
                            $('#authorityTable').bootstrapTable('refresh');
                            alert(data.response);
                        }
                    );
                    $('#addAuthority').modal('hide');
                });
                //模态框关闭时触发
                $('#addModule').on('hide.bs.modal',function () {
                    //刷新权限表
                    $('#authorityTable').bootstrapTable('refresh');
                });
                $('#registerAppStep2').click(function () {
                    //进入注册第三步 注册模块
                    $('#reg').empty();
                    var step3 = $('#step3').html();
                    $('#step3').remove();
                    $('#reg').append(step3);
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
                        var modintro = $("#moduleIntro").val();
                        //获取所有选择的依赖模块
                        var depmods = document.getElementsByName('dependModule');
                        var modid = 0;
                        $.post(
                            '/insertModule',
                            {
                                appname:name,
                                name:modname,
                                ver:modver,
                                intro:modintro,
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
                        $('#moduleTable').bootstrapTable('refresh');
                        $('#addModule').modal('hide');
                    });
                    //模态框关闭时触发
                    $('#addModule').on('hide.bs.modal',function () {
                        //刷新模块表
                        $('#moduleTable').bootstrapTable('refresh',{url: '/showModuleByAppName?appname='+name});
                    });

                    //第三步中点击下一步进入第四步 注册服务
                    $('#registerAppStep3').click(function () {
                        $('#reg').empty();
                        var step4 = $('#step4').html();
                        $('#step4').remove();
                        $('#reg').append(step4);
                        //等待DOM更新，否则找不到新加入的元素
                        window.setTimeout(function() {
                            //默认填好应用名和开发商名
                            $('#showappName2').val(name);
                            $('#showcpyName2').val(cpy);
                            $('#showappName2').attr("disabled",true);
                            $('#showcpyName2').attr("disabled",true);
                        }, 0);
                        //进入第四步时在下拉框加载出上一步已注册的模块以供选择
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
                        var moduleid = $("#showmoduleName option:selected").val();
                        InitServiceTable();
                        //选择模块时触发
                        $('#showmoduleName').on("change",function () {
                            var moduleid = $("#showmoduleName option:selected").val();
                            $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                        });

                        $('#refreshservice').click(function () {
                            var moduleid = $("#showmoduleName option:selected").val();
                            $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                        });
                        
                        //进入注册服务模态框时
                        $('#addService').on('show.bs.modal',function () {
                            var moduleid = $("#showmoduleName option:selected").val();
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
                                            '                        <input type="checkbox" name="dependService" value="' + data[service].sID + '"> ' + data[service].sName + '\n' +
                                            '                    </label>')
                                    }
                                }

                            );
                            //获取该应用已有的权限
                            $.post(
                                '/queryAuthorityByAppName',
                                {
                                    appname: name
                                },
                                function (data) {
                                    $('#serviceAuth').empty();
                                    for(var auth in data){
                                        $('#serviceAuth').append('<label class="btn btn-default">\n' +
                                            '                         <input type="checkbox" name="dependAuth" value="' + data[auth].auth_id + '"> ' + data[auth].auth_name + '\n' +
                                            '                     </label>')
                                    }
                                }
                            );
                            $('#serviceName').val("");
                            $('#serviceVer').val("");
                        });

                        //服务注册模态框点击保存时
                        $('#regService').on("click",function () {
                            var moduleid = $("#showmoduleName option:selected").val();
                            var sername = $('#serviceName').val();
                            var server = $('#serviceVer').val();
                            var serreq = $("input[name='serReq']:checked").val();
                            var serintro = $('#serviceIntro').val();
                            var serpri = $('#servicePri').val();
                            //获取所有选择的依赖服务
                            var depsers = document.getElementsByName('dependService');
                            var depauths = document.getElementsByName('dependAuth');
                            var serid = 0;
                            //post插入服务
                            $.post(
                                '/insertService',
                                {
                                    mid:moduleid,
                                    name:sername,
                                    ver:server,
                                    req:serreq,
                                    intro:serintro,
                                    price:serpri
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
                                        //把选中的权限注册进服务-权限关系表
                                        for(var i = 0; i < depauths.length; i++){
                                            //如果服务被选中
                                            if(depauths[i].checked){
                                                $.post(
                                                    '/insertAuthorityService',
                                                    {
                                                        auth_id: depauths[i].value,
                                                        ser_id: serid
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
                            var moduleid = $("#showmoduleName option:selected").val();
                            $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                        })
                        
                        //注册服务界面点击完成注册
                        $('#registerAppStep4').click(function () {
                            location.reload();
                        });
                        
                    })
                });
            }
        }
    );
});

//初始化权限表
function InitAuthorityTable(appname) {
    $('#authorityTable').bootstrapTable({
        url: '/queryAuthorityByAppName?appname=' + appname,
        method: 'POST',
        toolbar: '#authoritytoolbar',
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
        singleSelect: true,                 //单选checkbox

        columns: [
            {
                checkbox: true
            }, {
                field: 'auth_id',
                title: '权限ID'
            }, {
                field: 'auth_name',
                title: '权限名'
            }, {
                field: 'auth_intro',
                title: '权限说明'
            }
        ]
    });
}


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
        singleSelect: true,                 //单选checkbox

        columns: [
            {
                checkbox: true
            }, {
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
            }, {
                field: 'mIntro',
                title: '说明'
            }, {
                field: 'mStatus',
                title: '状态'
            }
        ]
    });
}

//初始化模块的服务表
function InitServiceTable() {
    var moduleid = $("#showmoduleName option:selected").val();
    $('#serviceTable').bootstrapTable({
        url: '/showServiceByModuleID?moduleid='+moduleid,
        method: 'POST',
        toolbar: '#servicetoolbar',
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
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        singleSelect: true,
        //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        //uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表
        singleSelect: true,                 //单选checkbox

        columns: [
            {
                checkbox: true
            }, {
                field: 'sID',
                title: '服务ID'
            }, {
                field: 'sName',
                title: '服务名'
            }, {
                field: 'sDepen',
                title: '依赖服务'
            }, {
                field: 'sAuth',
                title: '所需权限'
            }, {
                field: 'sReq',
                title: '必选'
            }, {
                field: 'sPrice',
                title: '价格'
            }, {
                field: 'sVer',
                title: '版本'
            }, {
                field: 'sIntro',
                title: '说明'
            }, {
                field: 'sStatus',
                title: '状态'
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