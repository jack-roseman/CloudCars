var socket = io();

socket.on('connected', (connectionState) => {
    const numResponders = connectionState.numResponders;
    $("#connection_status").html(`Status: <b>Connected</b> => ${numResponders} responders online`)
    socket.emit('connected_ack'); 
})

socket.on('connectionStatus', (connectionState) => {
    const numResponders = connectionState.numResponders;
    $("#connection_status").html(`Status: <b>Connected</b> => ${numResponders} responders online`)
})

socket.on('classify', (data) => {
    $("#classify_image").attr('src', data.imgUrl);
    $("#classify-div").show()
})

$(document).ready(() => {
    $('#clean_btn').on('click', () => classify('clean')); 
    $('#dirty_btn').on('click', () => classify('dirty'));
});

function classify(cl) {
    socket.emit('ack', {
        imgUrl:  $("#classify_image").attr('src'),
        label: cl
    });
    $('#classify_image').attr('src', '');
    $("#classify-div").hide();
}