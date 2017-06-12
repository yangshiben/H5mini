/**
 * Created by yangshibin on 2017/6/10.
 */
$(function () {
    var audio = new Audio('audios/Linkin Park-Good Goodbye.mp3');
    audio.addEventListener('canplay', function () {
        console.log(audio);
        $.playBar.duration = audio.duration;
        $.playBar.initBar(audio, audio.duration, $('.progress-slider'));
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