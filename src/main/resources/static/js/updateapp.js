$('#select-update-type').on("changed.bs.select",function () {
    var cpy_id = $('#cpyID').val();
    var updatetype = $("#select-update-type option:selected").text();
    if(updatetype == "应用升级"){
        $('#select-update-app').prop("disabled",false);
        $('#select-update-app').selectpicker('refresh');
        $('#select-update-module').prop("disabled",true);
        $('#select-update-module').selectpicker('refresh');
        $('#select-update-service').prop("disabled",true);
        $('#select-update-service').selectpicker('refresh');
        $.post(
            '/queryAppByCpyID',
            {
                cpy_id:cpy_id
            },
            function (data) {
                console.log(data);
                $('#select-update-app').empty();
                for(var app in data){
                    $('#select-update-app').append('<option value="' + data[app].name + '">' + data[app].name + '</option>');
                }
            }
        );
        $('#select-update-app').selectpicker('refresh');
        $('#select-update-module').selectpicker('refresh');
        $('#select-update-service').selectpicker('refresh');
    }
    else if(updatetype == "模块升级"){
        $('#select-update-app').prop("disabled",false);
        $('#select-update-app').selectpicker('refresh');
        $('#select-update-module').prop("disabled",false);
        $('#select-update-module').selectpicker('refresh');
        $('#select-update-service').prop("disabled",true);
        $('#select-update-service').selectpicker('refresh');
        $.post(
            '/queryAppByCpyID',
            {
                cpy_id:cpy_id
            },
            function (data) {
                console.log(data);
                $('#select-update-app').empty();
                for(var app in data){
                    $('#select-update-app').append('<option value="' + data[app].name + '">' + data[app].name + '</option>');
                }
            }
        );

        $('#select-update-app').on("changed.bs.select",function () {
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
            $('#select-update-module').selectpicker('refresh');
        })
    }
})