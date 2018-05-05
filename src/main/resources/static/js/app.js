$(document).ready(function () {
    var appid = $('#app_id').val();
    var appname;
    //应用信息
    $.post(
        '/queryAppByID',
        {
            app_id: appid
        },
        function (data) {
            console.log(data);
            appname = data.name;
            $('#appname').html(data.name);
            $('#app_name').html(data.name);
            $('#app_intro').html(data.intro);
            $('#appcata').html(data.catagory);
            $('#app_intro2').html(data.intro);
            //模块服务信息
            $.post(
                '/showModuleByAppName',
                {
                    appname: appname
                },
                function (data) {
                    console.log(data);
                    $('#modTable').empty();
                    for(var module in data){
                        $('#modTable').append('<h4>' + data[module].mName + '</h4>\n' +
                            '                            <ul id="mod' + data[module].mID + '">\n' +
                            '                            </ul>');
                        $.post(
                            '/showServiceByModuleID',
                            {
                                moduleid: data[module].mID
                            },
                            function (data2) {
                                console.log(data2);
                                for(var service in data2){
                                    $('#mod' + data[module].mID).append('<li>\n' +
                                        '                                    ' + data2[service].sName + '\n' +
                                        '                                </li>');
                                }

                            }
                        );

                    }
                }
            );
        }
    );
    //开发商信息
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

$('#toA').click(function () {
    document.getElementById("A").scrollIntoView(true);
})
$('#toB').click(function () {
    document.getElementById("B").scrollIntoView(true);
})
$('#toC').click(function () {
    document.getElementById("C").scrollIntoView(true);
})
$('#toD').click(function () {
    document.getElementById("D").scrollIntoView(true);
})