$(document).ready(function () {
    $('#searchapp').click(function () {
        var qw = $('#querywordinput').val();
        if(qw != null && qw!= ""){
            window.location.replace("/appsearch?qw=" + qw);
        }
    });
})
