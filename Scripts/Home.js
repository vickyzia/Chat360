var selectedUser = "";
let port;
var tracketTask ;
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
        var image = $that.attr("data-img");
        var name = $that.attr("data-name");
        var about = $that.attr("data-about");
        var img = $that.parent().find('img').attr("src");
        selectedUser = val;
        console.log(val);
        $('#centerDiv').show();
        $('#img-circle').attr('src', image);
        $('#infoMessage').text('Click To Call');
        $('#username').text(val);
        $('#username').css('textTransform', 'capitalize');
        $('#name').text(name);
        $('#about').text(about);
    });

    $('.arrow').mousedown(function (element) {

        if(currentMode == Modes.Controls){
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
        }
    });
    $('.arrow').mouseup(function (element) {
        if(currentMode == Modes.Controls){
            var target = element.currentTarget;
            window.dataConnection.send(movements.RESET);
        }

    });
    $('#ChangeMode').on('click', function () {
        var val = $('#ChangeMode').html();
        if(val == 'Controls'){
            $('#ChangeMode').html('Face Detect');
            $('#ChangeMode').css('padding-top','18px');
            if(tracketTask!=null){
                tracketTask.run();
            }
        }
        else if(val == 'Face Detect'){
            $('#ChangeMode').html('Controls');
            $('#ChangeMode').css('padding-top','23px');
            var canvas = document.getElementById('overlay');
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            currentMode
            if(tracketTask!=null)
                tracketTask.stop();
        }
    });
    //Get Online Users after every minute.
    window.setInterval(function () {
        GetOnlineContacts();
    }, 60000);


    //Connectivity with device.
    $('#connectButton').on('click', function () {
        if (port) {
            port.disconnect();
            $('#connectButton').text('Disconnect Device');
            port = null;
        } else {
            $('#connectButton').text('Connect Device');
            serial.requestPort().then(selectedPort => {
                port = selectedPort;
            connect();
        }).catch(error => {
        });
        }
    });
    function connect() {
        port.connect().then(() => {
        $('#connectButton').text('Disconnect Device');
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

        function Update(value) {
            if (!port) {
                return;
            }

            let view = new Uint8Array(1);

            view[0]= value; //assign the value to be sent , here
            port.send(view);
        }
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

function InitializeTracking(){
    var videoInput = document.getElementById('their-video');
    var canvas = document.getElementById('overlay');
    var context = canvas.getContext('2d');

    var tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);

    tracketTask = tracking.track('#their-video', tracker);
    tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if(event.data.length>0){
            var rect = event.data[0];
            var midX = GetCenterX(rect.x,rect.width);
            var midY = GetCenterY(rect.y,rect.height);
            var movement = CalculateMovementDirection(midX,midY);
            window.dataConnection.send(movement);
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        }
        else{
            window.dataConnection.send(movements.RESET);

        }
    });
    tracketTask.stop();

    //var htracker = new headtrackr.Tracker();
    ////To get the different statuses of the tracking being done.
    //document.addEventListener('headtrackrStatus', 
    //      function (event) {
    //          if (event.status == "getUserMedia") {
                  
    //          }
    //          else if(event.status == "found"){

    //          }
    //          else if(event.status == "lost"){
              
    //          }
    //      });
    //document.addEventListener('facetrackingEvent', function (event) {
    //    console.log("event x: " + event.x);
    //    console.log("event y: "+ event.y);

    //});
    ////document.addEventListener('headtrackingEvent',function (event) {

    ////});

    //htracker.init(videoInput, canvasInput);
    //htracker.start();
}
function GetCenterX(x,width){
    return x+(1/2)*width;
}
function GetCenterY(y, height){
    return y + (1/2)*height;
}
function CalculateMovementDirection(x, y){
    if(x<300 || x>380 || y <210 || y>270){
        // if this is the case then movement is required to reach within this rectangle which we consider the center
        if(x>380 && y>270){
            return facemovements.BR;
        }
        else if(x> 380 && y<210){
            return facemovements.TR;
        }
        else if(x > 380 && y>=210 && y<=270){
            return facemovements.RIGHT;
        }
        else if(x<300 && y>270){
            return facemovements.BL
        }
        else if(x< 300 && y<210){
            return facemovements.TL;
        }
        else if(x < 300 && y>=210 && y<=270){
            return facemovements.LEFT;
        }
        else if(x >= 300 && x<=380 && y>270){
            return facemovements.DOWN;
        }
        else if(x >= 300 && x<=380 && y<210){
            return  facemovements.TOP;
        }

    }
    else{
        return movements.RESET;
    }

}