//应用管理中选择应用点击权限详情
$('#manage-auth-button').on("click",function () {
    var cpyid = $('#cpyID').val();
    var cpy;
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            cpy = data[0].company;
        }
    );
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        //修改标题
        $('#authority-head').html("应用权限管理");

        var name = selectContent[0].name
        $('#manage').empty();
        var step2 = $('#step2').html();
        $('#step2').remove();
        $('#manage').append(step2);
        //等待DOM更新，否则找不到新加入的元素
        window.setTimeout(function() {
            //默认填好应用名和提供商名
            $('#showappName0').val(name);
            $('#showcpyName0').val(cpy);
            $('#showappName0').attr("disabled",true);
            $('#showcpyName0').attr("disabled",true);
            //修改上一步和下一步的按钮
            $('#registerAppStep2back').remove();
            $('#registerAppStep2').html("完成");
            $('#registerAppStep2').on("click",function () {
                location.reload();
            });
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
    }
});

//应用管理中选择应用点击模块详情
$('#manage-module-button').on("click",function () {
    var cpyid = $('#cpyID').val();
    var cpy;
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            cpy = data[0].company;
        }
    );
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        //修改标题
        $('#module-head').html("应用模块管理");

        var name = selectContent[0].name
        $('#manage').empty();
        var step3 = $('#step3').html();
        $('#step3').remove();
        $('#manage').append(step3);
        //等待DOM更新，否则找不到新加入的元素
        window.setTimeout(function() {
            //默认填好应用名和提供商名
            $('#showappName').val(name);
            $('#showcpyName').val(cpy);
            $('#showappName').attr("disabled",true);
            $('#showcpyName').attr("disabled",true);
            //修改上一步和下一步的按钮
            $('#registerAppStep3back').remove();
            $('#registerAppStep3').html("完成");
            $('#registerAppStep3').on("click",function () {
                location.reload();
            });
        }, 0);
        InitModuleTable(name);

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

        //点击删除模块按钮
        $('#deletemodule').on("click",function () {
            var selectContent = $('#moduleTable').bootstrapTable('getSelections');
            if(selectContent.length!=1){
                alert("请选择一个模块");
            }else {
                $.post(
                    '/deleteModuleByID',
                    {
                        module_id: selectContent[0].mID
                    },
                    function (data) {
                        console.log(data);
                        $('#moduleTable').bootstrapTable('refresh');
                        alert(data.response);
                    }
                );
            }
        });

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
                        $('#moduleTable').bootstrapTable('refresh');
                        window.alert("模块注册成功")
                    }
                }
            );
            $('#addModule').modal('hide');
        });
        //模态框关闭时触发
        $('#addModule').on('hide.bs.modal',function () {
            //刷新模块表
            $('#moduleTable').bootstrapTable('refresh');
        });
    }
});

//应用管理中选择应用点击服务详情
$('#manage-service-button').on("click",function () {
    var cpyid = $('#cpyID').val();
    var cpy;
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            cpy = data[0].company;
        }
    );
    var selectContent = $('#appmanage').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        //修改标题
        $('#service-head').html("应用服务管理");

        var name = selectContent[0].name
        $('#manage').empty();
        var step4 = $('#step4').html();
        $('#step4').remove();
        $('#manage').append(step4);
        //等待DOM更新，否则找不到新加入的元素
        window.setTimeout(function() {
            //默认填好应用名和提供商名
            $('#showappName2').val(name);
            $('#showcpyName2').val(cpy);
            $('#showappName2').attr("disabled",true);
            $('#showcpyName2').attr("disabled",true);
            //修改完成注册按钮
            $('#registerAppStep4back').remove();
            $('#registerAppStep4').html("完成");
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
                var moduleid = $("#showmoduleName option:selected").val();
                InitServiceTable();
            }
        );

        //选择模块时触发
        $('#showmoduleName').on("change",function () {
            var moduleid = $("#showmoduleName option:selected").val();
            $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
        });

        //点击删除服务按钮
        $('#deleteservice').on("click",function () {
            var moduleid = $("#showmoduleName option:selected").val();
            var selectContent = $('#serviceTable').bootstrapTable('getSelections');
            if(selectContent.length!=1){
                alert("请选择一个服务");
            }else {
                $.post(
                    '/deleteServiceByID',
                    {
                        service_id: selectContent[0].sID
                    },
                    function (data) {
                        console.log(data);
                        $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                        alert(data.response);
                    }
                );
            }
        });

        //服务表刷新按钮
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
                        var moduleid = $("#showmoduleName option:selected").val();
                        $('#serviceTable').bootstrapTable('refresh',{url: '/showServiceByModuleID?moduleid='+moduleid});
                        window.alert("服务注册成功")
                    }
                }
            );
            $('#addService').modal('hide');
        })

        //服务管理界面点击完成
        $('#registerAppStep4').click(function () {
            location.reload();
        })
    }
});