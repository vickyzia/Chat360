var selectedUser = "";
let port;
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

    $('.arrow').mousedown(function (element) {

        var target = element.currentTarget;
        if (target.id == 'up') {
            window.dataConnection.send(movements.TOP);
        }
        else if (target.id == 'down') {
            window.dataConnection.send(movements.DOWN);
        }
        else if (target.id == 'right') {
            window.dataConnection.send(movements.RIGHT);
        }
        else if (target.id == 'left') {
            window.dataConnection.send(movements.LEFT);
        }
        else if (target.id == 'tl') {
            window.dataConnection.send(movements.TL);
        }
        else if (target.id == 'tr') {
            window.dataConnection.send(movements.TR);
        }
        else if (target.id == 'bl') {
            window.dataConnection.send(movements.BL);
        }
        else if (target.id == 'br') {
            window.dataConnection.send(movements.BR);
        }
    });
    $('.arrow').mouseup(function (element) {

        var target = element.currentTarget;
        if (target.id == 'up') {
            window.dataConnection.send(-movements.TOP);
        }
        else if (target.id == 'down') {
            window.dataConnection.send(-movements.DOWN);
        }
        else if (target.id == 'right') {
            window.dataConnection.send(-movements.RIGHT);
        }
        else if (target.id == 'left') {
            window.dataConnection.send(-movements.LEFT);
        }
        else if (target.id == 'tl') {
            window.dataConnection.send(-movements.TL);
        }
        else if (target.id == 'tr') {
            window.dataConnection.send(-movements.TR);
        }
        else if (target.id == 'bl') {
            window.dataConnection.send(-movements.BL);
        }
        else if (target.id == 'br') {
            window.dataConnection.send(-movements.BR);
        }
    });
    $('#reset').on('click', function () {
        window.dataConnection.send(movements.RESET);
    });
    //Get Online Users after every minute.
    window.setInterval(function () {
        GetOnlineContacts();
    }, 60000);


    //Connectivity with device.
    $('#connectButton').on('click', function () {
        if (port) {
            port.disconnect();
            $('#connectButton').text = 'Disconnect';
            port = null;
        } else {
            serial.requestPort().then(selectedPort => {
                port = selectedPort;
            connect();
        }).catch(error => {
        });
        }
    });
    function connect() {
        port.connect().then(() => {
        $('#connectButton').text = 'Disconnect';
        port.onReceive = data => {
            let textDecoder = new TextDecoder();
        console.log(textDecoder.decode(data));
        }
        port.onReceiveError = error => {
            console.error(error);
        };
        }, error => {
        });
}
        if(serial!=null){
        serial.getPorts().then(ports => {
            if (ports.length == 0) {
        } else {
            port = ports[0];
            connect();
        }
    });
}

        function Update() {
            if (!port) {
                return;
            }

            let view = new Uint8Array(1);

            view[0]= 20; //assign the value to be sent , here
            port.send(view);
        };
}
function GetOnlineContacts() {

    $.post(Contacts_URL, null, function (data) {
        if(data == false){
        
        }
        else{
            for (var i in data)
            {
                var anchor = $('.list-group').find("[data-username='" + data[i].username + "']");
                var user =   anchor.find('.current-status');
                if (data[i].status == true)
                    user.removeClass('offline-icon').addClass('online-icon');
                else
                    user.addClass('offline-icon').removeClass('online-icon');
                
            }
        }
    });
}
