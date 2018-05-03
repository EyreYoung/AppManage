function showAllApps () {
    $.get(
        '/admin/queryApps',
        function (data,status) {
            for(var app in data){
                $('#appList').append('<div class="thumbnail">\n' +
                    '                        <div class="row">\n' +
                    '                            <div class="col-md-2">\n' +
                    '                                <img alt="300x300" src="/img/1489646065480.jpg" height="100px" width="100px" />\n' +
                    '                            </div>\n' +
                    '                            <div class="col-md-8">\n' +
                    '                                <a href="#">' + data[app].name + '</a>\n' +
                    '                                <p> ' + data[app].intro + ' </p>\n' +
                    '                                <span>\n' +
                    '                                    <b>开发者：</b>\n' +
                    '                                    ' + data[app].svenderName + '\n' +
                    '                                </span>\n' +
                    '                            </div>\n' +
                    '                            <div class="col-md-2">\n' +
                    '                                <div style="vertical-align: middle;horiz-align: center">\n' +
                    '                                    <div>\n' +
                    '                                        <p>用户评分：<b>' + data[app].star + '</b></p>\n' +
                    '                                    </div>\n' +
                    '                                    <a class="btn btn-primary viewmore" href="#">查看详情</a>\n' +
                    '                                    <a class="btn btn-secondary" href="#">立即试用</a>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>')
            }
        }
    )
}


$(document).ready(function(){
    var qw = $('#queryword').val();
    console.log("搜索关键字：" + qw);
    if(qw == null || qw ==""){
        showAllApps();
    }else{
        $.post(
            '/queryAppByQW',
            {
                qw:qw
            },
            function (data) {
                $('#appList').empty();
                for(var app in data){
                    $('#appList').append('<div class="thumbnail">\n' +
                        '                        <div class="row">\n' +
                        '                            <div class="col-md-2">\n' +
                        '                                <img alt="300x300" src="/img/1489650546159.jpg" height="100px" width="100px" />\n' +
                        '                            </div>\n' +
                        '                            <div class="col-md-8">\n' +
                        '                                <a href="#">' + data[app].name + '</a>\n' +
                        '                                <p> ' + data[app].intro + ' </p>\n' +
                        '                                <span>\n' +
                        '                                    <b>开发者：</b>\n' +
                        '                                    ' + data[app].svenderName + '\n' +
                        '                                </span>\n' +
                        '                            </div>\n' +
                        '                            <div class="col-md-2">\n' +
                        '                                <div style="vertical-align: middle;horiz-align: center">\n' +
                        '                                    <div>\n' +
                        '                                        <p>用户评分：<b>' + data[app].star + '</b></p>\n' +
                        '                                    </div>\n' +
                        '                                    <a class="btn btn-primary viewmore" href="#">查看详情</a>\n' +
                        '                                    <a class="btn btn-secondary" href="#">立即试用</a>\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>')
                }
            }
        );
    }

    $("li.appcata").click(function () {
        var cata = $(this).text();
        $.post(
            '/queryAppByCata',
            {
                cata:cata
            },
            function (data) {
                $('#appList').empty();
                for(var app in data){
                    $('#appList').append('<div class="thumbnail">\n' +
                        '                        <div class="row">\n' +
                        '                            <div class="col-md-2">\n' +
                        '                                <img alt="300x300" src="/img/1489650546159.jpg" height="100px" width="100px" />\n' +
                        '                            </div>\n' +
                        '                            <div class="col-md-8">\n' +
                        '                                <a href="#">' + data[app].name + '</a>\n' +
                        '                                <p> ' + data[app].intro + ' </p>\n' +
                        '                                <span>\n' +
                        '                                    <b>开发者：</b>\n' +
                        '                                    ' + data[app].svenderName + '\n' +
                        '                                </span>\n' +
                        '                            </div>\n' +
                        '                            <div class="col-md-2">\n' +
                        '                                <div style="vertical-align: middle;horiz-align: center">\n' +
                        '                                    <div>\n' +
                        '                                        <p>用户评分：<b>' + data[app].star + '</b></p>\n' +
                        '                                    </div>\n' +
                        '                                    <a class="btn btn-primary viewmore" href="#">查看详情</a>\n' +
                        '                                    <a class="btn btn-secondary" href="#">立即试用</a>\n' +
                        '                                </div>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>')
                }
            }
        )
    });

    $('#allapp').click(function () {
        $('#appList').empty();
        showAllApps();
    })
})