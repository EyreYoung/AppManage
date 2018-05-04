$(document).ready(function () {
    var appid = $('#app_id').val();
    $.post(
        '/queryAppByID',
        {
            app_id: appid
        },
        function (data) {
            console.log(data);
            $('#appname').html(data.name);
            $('#app_name').html(data.name);
            $('#app_intro').html(data.intro);
        }
    );
    $.post(
        '/queryCpyByAppID',
        {
            app_id: appid
        },
        function (data) {
            console.log(data);
            $('#cpy_name').html(data.company);
            $('#cpy_tel').html("电 话:" + data.tel);
            $('#cpy_mail').html("邮 箱:" + data.mail);
        }
    );
})