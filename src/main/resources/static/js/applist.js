$(function () {
    $.get(
        '/admin/queryApps',
        function (data,status) {
            alert(data+status);
            for(var app in data){
                $('#appList').append('<div class="thumbnail">\n' +
                    '                        <div class="row">\n' +
                    '                            <div class="col-md-2">\n' +
                    '                                <img alt="300x300" th:src="@{~/img/1489646065480.jpg}" th:height="100px" th:width="100px" />\n' +
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
                    '                                        <a>用户评分：</a>\n' +
                    '                                        <b>' + data[app].star + '</b>\n' +
                    '                                    </div>\n' +
                    '                                    <a class="btn btn-primary" href="#">查看详情</a>\n' +
                    '                                    <a class="btn btn-secondary" href="#">立即试用</a>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                    </div>')
            }
        }
    )
})