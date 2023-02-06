console.log("main js");
$(function () {

    const $btnon = $('#btnon');
    const $btnoff = $('#btnoff');
    const $led = $('#led');
    
    function sendPostLed(v) {
        console.log("v", v);
        $.post('/LED',
            { led: v })
            .done(function (data) {
                console.log('data', data);
                let led = data.led;
                $led.removeClass('red');
                if (led == 'on'){
                    $led.addClass('red');
                }
            });
    }

    $btnon.click(function (e) {
        e.preventDefault();
        console.log("on clicked");
        sendPostLed($btnon.val());
    });

    $btnoff.click(function (e) {
        e.preventDefault();
        console.log("off clicked");
        sendPostLed($btnoff.val());
    });
});