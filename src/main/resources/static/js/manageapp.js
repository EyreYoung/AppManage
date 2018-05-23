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
            //默认填好应用名和开发商名
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