$(document).ready(function () {
    //加载推荐应用
    $.post(
        '/queryRecApps',
        {

        },
        function (data) {
            var i = 0;
            $('#recommendApps').empty();
            for(var app in data){
                $('#recommendApps').append('<div class="col-md-3">\n' +
                    '                    <div class="thumbnail">\n' +
                    '                        <img alt="300x200" src="/img/1489646065480.jpg" style="height: 150px;width: 150px"/>\n' +
                    '                        <div class="caption">\n' +
                    '                            <h4 style="text-align: center">' + data[app].name + '</h4>\n' +
                    '                            <p style="text-align: center">' + data[app].svenderName + '</p>\n' +
                    '                            <p style="text-align: center">\n' +
                    '                                <a class="btn btn-info" href="/app?app_id=' + data[app].id + '">查看详情</a>\n' +
                    '                            </p>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>');
            }
        }
    );
    //加载热度应用
    $.post(
        '/queryHotApps',
        {

        },
        function (data) {
            var i = 0;
            $('#hotApps').empty();
            for(var app in data){
                i++;
                if(i <= 8){
                    $('#hotApps').append('<div class="col-md-3">\n' +
                        '                    <div class="thumbnail">\n' +
                        '                        <img alt="300x200" src="/img/1489646065480.jpg" style="height: 150px;width: 150px"/>\n' +
                        '                        <div class="caption">\n' +
                        '                            <h4 style="text-align: center">' + data[app].name + '(热度:' + data[app].clicks + ')' + '</h4>\n' +
                        '                            <p style="text-align: center">' + data[app].svenderName + '</p>\n' +
                        '                            <p style="text-align: center">\n' +
                        '                                <a class="btn btn-info" href="/app?app_id=' + data[app].id + '">查看详情</a>\n' +
                        '                            </p>\n' +
                        '                        </div>\n' +
                        '                    </div>\n' +
                        '                </div>');
                }
            }
        }
    );
});