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
            if(data.response == 1){
                window.location.replace("/admin/manage");
            }else{
                window.alert("用户名或者密码错误");
            }

        }
    );
});

var $table;


// function InitAppTable() {
//     $table =
        $('#appTable').bootstrapTable({
        url: '/admin/doManage',
        method: 'POST',
        toolbar:'#toolbar',
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
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: true,                   //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                  //是否显示父子表

        columns:[
            {
                field:'id',
                title:'序号'
            },{
            field:'name',
                title:'应用名称'
            },{
            field:'type',
                title:'收费方式'
            },{
            field:'catagory',
                title:'应用类别'
            },{
            field:'star',
                title:'评分'
            },{
            field:'svenderName',
                title:'开发者'
            },{
            field:'regDate',
                title:'注册日期'
            },{
            field:'version',
                title:'版本'
            }
        ]

    });


