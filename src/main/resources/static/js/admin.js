$('#login').click(function () {
    var acc = $('#loginAccount').val();
    var pwd = $('#loginPassword').val();
    console.log(acc+pwd);
    $.post(
        '/admin/doLogin',
        {
            account:acc,
            password:pwd
        },
        function (data) {
            console.log(data);
            if(data.success){
                window.location.replace("/admin/manage");
            }else{
                window.alert("用户名或者密码错误");
            }

        }
    );
});

//管理员管理表
function InitAdminTable() {
    $('#adminTable').bootstrapTable({
        url: '/admin/queryAdmins',
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
                field: 'id',
                title: '序号'
            }, {
                field: 'account',
                title: '用户名'
            }, {
                field: 'password',
                title: '密码'
            }
        ]
    });
}

//提供商管理表
function InitCpyTable() {
    $('#cpyTable').bootstrapTable({
        url: '/admin/queryCpys',
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
        singleSelect: true,                 //单选checkbox

        columns: [
            {
                checkbox: true
            }, {
                field: 'id',
                title: '序号'
            }, {
                field: 'account',
                title: '用户名'
            }, {
                field: 'company',
                title: '公司名'
            }, {
                field: 'mail',
                title: '邮箱'
            }, {
                field: 'tel',
                title: '电话'
            }, {
                field: 'status',
                title: '状态'
            }
        ]
    });
}

//审核提供商列表
function InitRegCpyTable() {
    $('#regCpyTable').bootstrapTable({
        url: '/admin/queryRegCpys',
        method: 'POST',
        toolbar: '#censorCpy_toolbar',
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
                field: 'id',
                title: '提供商ID'
            }, {
                field: 'account',
                title: '用户名'
            }, {
                field: 'company',
                title: '公司名'
            }, {
                field: 'mail',
                title: '邮箱'
            }, {
                field: 'tel',
                title: '电话'
            }, {
                field: 'status',
                title: '状态'
            }
        ]
    });
}

//应用管理表
function InitAppTable() {
    $('#appTable').bootstrapTable({
        url: '/admin/queryApps',
        method: 'POST',
        toolbar: '#manageApp_toolbar',
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
                field: 'id',
                title: '应用ID'
            }, {
                field: 'name',
                title: '应用名称'
            }, {
                field: 'catagory',
                title: '应用类别'
            }, {
                field: 'star',
                title: '评分'
            }, {
                field: 'svenderName',
                title: '提供商'
            }, {
                field: 'regDate',
                title: '注册日期'
            }, {
                field: 'rec',
                title: '是否推荐'
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

//审核应用列表
function InitRegAppTable() {
    $('#regAppTable').bootstrapTable({
        url: '/admin/queryRegApps',
        method: 'POST',
        toolbar: '#censorApp_toolbar',
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
                field: 'id',
                title: '应用ID'
            }, {
                field: 'name',
                title: '应用名称'
            }, {
                field: 'catagory',
                title: '应用类别'
            }, {
                field: 'star',
                title: '评分'
            }, {
                field: 'svenderName',
                title: '提供商'
            }, {
                field: 'regDate',
                title: '注册日期'
            }, {
                field: 'rec',
                title: '是否推荐'
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

$(document).ready(function() {
    //初始化表格
    InitAppTable();
    InitAdminTable();
    InitCpyTable();
    InitRegCpyTable();
    InitRegAppTable();
    //下拉框全部打开
    $('#userManage').collapse('show');
    $('#appManage').collapse('show');
});

//审核提供商注册通过按钮
$('#censorCpy_pass_button').on("click",function () {
    var selectContent = $('#regCpyTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个提供商");
    }else {
        var cpy_id = selectContent[0].id;
        $.post(
            '/admin/passRegCpy',
            {
                cpy_id: cpy_id
            },
            function (data) {
                console.log(data);
                $('#regCpyTable').bootstrapTable('refresh');
                alert(data.response);
            }
        );
    }
});

//审核提供商注册不通过按钮
$('#censorCpy_not_pass_button').on("click",function () {
    var selectContent = $('#regCpyTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个提供商");
    }else {
        var cpy_id = selectContent[0].id;
        $.post(
            '/admin/unpassRegCpy',
            {
                cpy_id: cpy_id
            },
            function (data) {
                console.log(data);
                $('#regCpyTable').bootstrapTable('refresh');
                alert(data.response);
            }
        );
    }
});

//审核应用注册通过按钮
$('#censorApp_pass_button').on("click",function () {
    var selectContent = $('#regAppTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        var app_id = selectContent[0].id;
        $.post(
            '/admin/passRegApp',
            {
                app_id: app_id
            },
            function (data) {
                console.log(data);
                $('#regAppTable').bootstrapTable('refresh');
                alert(data.response);
            }
        );
    }
});

//审核应用注册不通过按钮
$('#censorApp_not_pass_button').on("click",function () {
    var selectContent = $('#regAppTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        var app_id = selectContent[0].id;
        $.post(
            '/admin/unpassRegApp',
            {
                app_id: app_id
            },
            function (data) {
                console.log(data);
                $('#regAppTable').bootstrapTable('refresh');
                alert(data.response);
            }
        );
    }
});

//管理员下架应用按钮
$('#manageApp_drop_button').on("click",function () {
    var selectContent = $('#appTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        if(selectContent[0].status == "下架"){
            alert("该应用已下架，请勿重复操作")
        }else{
            var app_id = selectContent[0].id;
            $.post(
                '/dropAppByID',
                {
                    app_id: app_id
                },
                function (data) {
                    console.log(data);
                    $('#appTable').bootstrapTable('refresh');
                    alert(data.response);
                }
            );
        }
    }
});

//管理员推荐应用
$('#manageApp_recommend_button').on("click",function () {
    var selectContent = $('#appTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        if(selectContent[0].rec == "是"){
            alert("该应用已被推荐，请重新选择")
        }else{
            var app_id = selectContent[0].id;
            $.post(
                '/admin/recommendApp',
                {
                    app_id: app_id
                },
                function (data) {
                    console.log(data);
                    $('#appTable').bootstrapTable('refresh');
                    alert(data.response);
                }
            );
        }
    }
});

//管理员取消推荐应用
$('#manageApp_not_recommend_button').on("click",function () {
    var selectContent = $('#appTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        if(selectContent[0].rec == "否"){
            alert("该应用并未被推荐，请重新选择")
        }else{
            var app_id = selectContent[0].id;
            $.post(
                '/admin/unrecommendApp',
                {
                    app_id: app_id
                },
                function (data) {
                    console.log(data);
                    $('#appTable').bootstrapTable('refresh');
                    alert(data.response);
                }
            );
        }
    }
});

//管理员查看应用详情
$('#manageApp_more_button').on("click",function () {
    var selectContent = $('#appTable').bootstrapTable('getSelections');
    if(selectContent.length!=1) {
        alert("请选择一个应用");
    }else {
        var app_id = selectContent[0].id;
        location.replace("/app?app_id=" + app_id);
    }
});