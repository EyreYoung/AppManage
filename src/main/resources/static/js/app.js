$(document).ready(function () {
    var appid = $('#app_id').val();
    var appname;
    //进入应用详情界面时将应用热度加1
    $.post(
        '/updateAppClicks',
        {
            app_id:appid
        },
        function (data) {
            console.log(data.response);
        }
    )

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
                    for(var i = 0;i < data.length;i++){
                        $('#modTable').append('<h4>' + data[i].mName + '</h4>\n' +
                            '                            <ul id="mod' + i + '">\n' +
                            '                            </ul>');
                    }
                    for(var i = 0;i < data.length;i++){
                        //selectService(data,i);
                        var mid = data[i].mID;
                        //执行同步POST
                        $.ajax({
                            type: "POST",
                            url: '/showServiceByModuleID',
                            async: false,//是否异步
                            data: {
                                moduleid: mid
                            },
                            success: function (result) {
                                console.log(result);
                                for(var service in result){
                                    var id = "mod"+i;
                                    if(result[service].sDepen!=null){
                                        if(result[service].sReq=="是"){
                                            $('#'+id).append('<li>' + result[service].sName + '(必选)<p>(依赖服务：' + result[service].sDepen + ')</p><p>(所需权限：' + result[service].sAuth + ')</p></li>');
                                        }else{
                                            $('#'+id).append('<li>' + result[service].sName + '<p>(依赖服务：' + result[service].sDepen + ')</p><p>(所需权限：' + result[service].sAuth + ')</p></li>');
                                        }
                                    }else{
                                        if(result[service].sReq=="是"){
                                            $('#'+id).append('<li>' + result[service].sName + '(必选)<p>(所需权限：' + result[service].sAuth + ')</p></li>');
                                        }else{
                                            $('#'+id).append('<li>' + result[service].sName + '<p>(所需权限：' + result[service].sAuth + ')</p></li>');
                                        }

                                    }
                                }
                            }
                        });
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


/*
闭包问题
$.post（）属于异步请求，所以在执行for 循环的时候，JS 发送了一个异步的post请求，但是在该请求还没有返回结果的同时 ，JS继续执行了第二次for 循环，依次类推，有可能js把for 循环都执行完了，第一次的post 请求还没有结束，此时就可能出现种种问题；
而解决该问题的办法 就是把post请求换成同步请求，当post结束之后，才会进行下一次循环；
但问题又来了，$.post()的格式 为$.post(url,para,function,type)    这四个参数依次为请求url,请求参数，请求回调函数，请求类型，并没有一个参数是设置异步还是同步的，所以，此时就应该换一种请求方 法，$.ajax(); 参数如下：
$.ajax({
 type: "POST",
 url: url,
 async : false,//是否为异步
 data: data,
 success: success,
 dataType: dataType
});
所以在for循环中使用请求方法，最好使用$.ajax ，而非使用post
*/


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