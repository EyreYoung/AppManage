$(document).ready(function () {
    chooseUpdatetype();
})

$('#select-update-type').change(function () {
    chooseUpdatetype();
});

//选择升级方式时触发
function chooseUpdatetype() {
    var cpy_id = $('#cpyID').val();
    var updatetype = $("#select-update-type option:selected").text();
    initUpdatedApptable(cpy_id);
    initUpdatedModuletable(cpy_id);
    //选择应用升级后
    if(updatetype == "应用升级"){
        $('#select-update-app').attr("disabled",false);
        $('#select-update-module').attr("disabled",true);
        $('#select-update-service').attr("disabled",true);
        //获得应用数据
        $.post(
            '/queryAppByCpyID',
            {
                cpy_id:cpy_id
            },
            function (data) {
                console.log(data);
                $('#select-update-app').empty();
                $('#select-update-module').empty();
                $('#select-update-service').empty();
                for(var app in data){
                    $('#select-update-app').append('<option value="' + data[app].name + '">' + data[app].name + '</option>');
                }
            }
        );
    }
    //选择模块升级后
    else if(updatetype == "模块升级"){
        $('#select-update-app').attr("disabled",false);
        $('#select-update-module').attr("disabled",false);
        $('#select-update-service').attr("disabled",true);
        //获得应用数据
        $.post(
            '/queryAppByCpyID',
            {
                cpy_id:cpy_id
            },
            function (data) {
                console.log(data);
                $('#select-update-app').empty();
                $('#select-update-module').empty();
                $('#select-update-service').empty();
                for(var app in data){
                    $('#select-update-app').append('<option value="' + data[app].name + '">' + data[app].name + '</option>');
                }
            }
        );
        //模块升级中选择应用后
        $('#select-update-app').change(function () {
            var appname = $("#select-update-app option:selected").val();
            $.post(
                '/showModuleByAppName',
                {
                    appname:appname
                },
                function (data) {
                    console.log(data);
                    $('#select-update-module').empty();
                    for(var module in data){
                        $('#select-update-module').append('<option value="' + data[module].mID + '">' + data[module].mName + '</option>');
                    }
                }
            );
        })
    }
    //选择服务升级后
    else if(updatetype == "服务升级"){
        $('#select-update-app').attr("disabled",false);
        $('#select-update-module').attr("disabled",false);
        $('#select-update-service').attr("disabled",false);
        //获得应用数据
        $.post(
            '/queryAppByCpyID',
            {
                cpy_id:cpy_id
            },
            function (data) {
                console.log(data);
                $('#select-update-app').empty();
                $('#select-update-module').empty();
                $('#select-update-service').empty();
                for(var app in data){
                    $('#select-update-app').append('<option value="' + data[app].name + '">' + data[app].name + '</option>');
                }
            }
        );
        //服务升级中选择应用后
        $('#select-update-app').change(function () {
            var appname = $("#select-update-app option:selected").val();
            //加载模块列表
            $.post(
                '/showModuleByAppName',
                {
                    appname:appname
                },
                function (data) {
                    console.log(data);
                    $('#select-update-module').empty();
                    for(var module in data){
                        $('#select-update-module').append('<option value="' + data[module].mID + '">' + data[module].mName + '</option>');
                    }
                }
            );
        });
        //服务升级中选择模块后
        $('#select-update-module').change(function () {
            var moduleid = $("#select-update-module option:selected").val();
            //加载服务列表
            $.post(
                '/showServiceByModuleID',
                {
                    moduleid:moduleid
                },
                function (data) {
                    console.log(data);
                    $('#select-update-service').empty();
                    for(var service in data){
                        $('#select-update-service').append('<option value="' + data[service].sID + '">' + data[service].sName + '</option>');
                    }
                }
            );
        });
    }
}

//应用升级方式中点击开始升级按钮
$('#start-update').on("click",function () {
    var cpy_id = $('#cpyID').val();
    var updatetype = $("#select-update-type option:selected").text();
    initUpdatedApptable(cpy_id);
    if(updatetype == "应用升级"){
        var apptoupdate = $("#select-update-app option:selected").text();
        $.post(
            '/updateAppByAppName',
            {
                appname: apptoupdate
            },
            function (data) {
                console.log(data);
                alert(data.response);
                $('#update-app-table').bootstrapTable('refresh',{url: '/queryUpdatedAppByCpyID?cpy_id='+cpy_id});
            }
        );
    }else if(updatetype == "模块升级"){
        var moduletoupdate = $("#select-update-module option:selected").val();
        $.post(
            '/updateModuleByID',
            {
                module_id: moduletoupdate
            },
            function (data) {
                console.log(data);
                alert(data.response);
                $('#update-module-table').bootstrapTable('refresh');
            }
        );
    }else if(updatetype == "服务升级"){

    }

});

//应用完成升级按钮
$('#app-update-finish').on("click",function () {
    var selectContent = $('#update-app-table').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个应用");
    }else {
        console.log(selectContent[0]);
        $('#update-app-finish-modal').modal("show");
        $('#app-update-old-version').val(selectContent[0].version);
    }
});

//模块完成升级按钮
$('#module-update-finish').on("click",function () {
    var selectContent = $('#update-module-table').bootstrapTable('getSelections');
    if(selectContent.length!=1){
        alert("请选择一个模块");
    }else {
        console.log(selectContent[0]);
        $('#update-module-finish-modal').modal("show");
        $('#module-update-old-version').val(selectContent[0].ver);
    }
});

//应用完成升级模态框中点击完成升级
$('#modal-updateapp-save').on("click",function () {
    var selectContent = $('#update-app-table').bootstrapTable('getSelections');
    var appname = selectContent[0].name;
    var newver = $('#app-update-new-version').val();
    $.post(
        '/updateAppFinishByAppName',
        {
            appname: appname,
            newver: newver
        },function (data) {
            console.log(data);
            alert(data.response);
            $('#update-app-table').bootstrapTable('refresh');
            $('#update-app-finish-modal').modal("hide");
        }
    );
});

//模块完成升级模态框中点击完成升级
$('#modal-updatemodule-save').on("click",function () {
    var selectContent = $('#update-module-table').bootstrapTable('getSelections');
    var module_id = selectContent[0].mID;
    var newver = $('#module-update-new-version').val();
    $.post(
        '/updateModuleFinishByID',
        {
            module_id: module_id,
            newver: newver
        },function (data) {
            console.log(data);
            alert(data.response);
            $('#update-module-table').bootstrapTable('refresh');
            $('#update-module-finish-modal').modal("hide");
        }
    );
});

//应用表刷新
$('#app-update-refresh').on("click",function () {
    var cpy_id = $('#cpyID').val();
    $('#update-app-table').bootstrapTable('refresh',{url: '/queryUpdatedAppByCpyID?cpy_id='+cpy_id});
});

//模块表刷新
$('#module-update-refresh').on("click",function () {
    var cpy_id = $('#cpyID').val();
    $('#update-module-table').bootstrapTable('refresh',{url: '/queryUpdatedMoudleByCpyID?cpy_id='+cpy_id});
});

//开发商升级应用-应用表
function initUpdatedApptable(cpyid) {
    $('#update-app-table').bootstrapTable({
        url: '/queryUpdatedAppByCpyID?cpy_id='+cpyid,
        method: 'POST',
        toolbar: '#update-app-toolbar',
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
        ]
    });
}

//开发商升级应用-模块表
function initUpdatedModuletable(cpyid) {
    $('#update-module-table').bootstrapTable({
        url: '/queryUpdatedMoudleByCpyID?cpy_id='+cpyid,
        method: 'POST',
        toolbar: '#update-module-toolbar',
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
                field: 'mID',
                title: '模块ID',
                hidden: true
            }, {
                field: 'appName',
                title: '所属应用'
            }, {
                field: 'mName',
                title: '模块名'
            }, {
                field: 'mReq',
                title: '是否必选'
            }, {
                field: 'mIntro',
                title: '模块说明'
            }, {
                field: 'ver',
                title: '版本'
            },{
                field: 'mStatus',
                title: '状态'
            }
        ]
    });
}