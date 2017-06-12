/**
 * Created by yangshibin on 2017/6/10.
 */
$(function () {
    var audio = new Audio('audios/James Galway-记忆.mp3');
    audio.addEventListener('canplay', function () {
        $.duration = audio.duration;
        console.log(audio);
        audio.play();
        $.playBar.playStart();
    });
    $('.switch-btn').each(function(){
        $(this).dragging({
            move : 'y',
            randomPosition : false
        });
    });
})
function insertEffect(id) {
    console.log('insert ' + id + 'effect!');
}