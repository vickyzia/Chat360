var selectedUser = "";
$(document).ready()
{
    $('#video-container').hide();
    $('#centerDiv').hide();
   
    $('.list-group a').click(function (e) {
        e.preventDefault()

        $that = $(this);

        $that.parent().find('a').removeClass('active');
        $that.addClass('active');
        var val = $that.attr("data-username");
        var img = $that.parent().find('img').attr("src");
        selectedUser = val;
        console.log(val);
        $('#centerDiv').show();
        $('#img-circle').attr('src', img);
        $('#infoMessage').text('Click To Call');
        $('#username').text(val);
    });


}
