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
    }else if(updatetype == "服务升级"){
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