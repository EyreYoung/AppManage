$(document).ready(function () {
    var cpyid = $('#cpyID').val();
    console.log(cpyid);
    $.post(
        '/company/queryCpy',
        {
            id:cpyid
        },
        function (data) {
            $('#appCpy').val(data.cpy);
            $('#appCpy').attr("disabled",true);
        }
    );

});