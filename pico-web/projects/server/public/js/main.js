console.log("main js");
$(function () {

    const $btnon = $('#btnon');
    const $btnoff = $('#btnoff');
    const $rled = $('#led1');
    const $gled = $('#led2');
    
    function sendPostLed(v) {
        console.log("v", v);
        $.post('/LED',
            { led: v })
            .done(function (data) {
                console.log('data', data);
                let led = data.led;
                $rled.removeClass('red');
                if (led == 'on'){
                    $rled.addClass('red');
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