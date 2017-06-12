/**
 * Created by yangshibin on 2017/6/10.
 */
$(function () {
    var audio = new Audio('audios/Linkin Park-Good Goodbye.mp3');
    audio.addEventListener('canplay', function () {
        var audioDom = audio;
        if(audio) $.playBar.initBar(audioDom, audio.duration, $('.progress-slider'));
        audio = null;
    });
    $('.switch-btn').each(function(){
        $(this).dragging({
            move : 'y',
            randomPosition : false
        });
    });
    var effetGroup = [];
});
var down = false;
var isMove = false;//正在移动
var lastX = 0, NewX = 0;//记录前后位置
$(document).on("mousedown", '.turntable', function (event) {
    lastX = event.clientX;
    event.preventDefault();
    isMove = true;
});//鼠标按下
$(document).mousemove(function (event) {
    event.preventDefault();
    if (isMove) {
        NewX = event.clientX;
        console.log(parseInt(NewX));
        $('.turntable').css('transform','rotate('+ parseInt(NewX) + 'deg)');
    }
});
//文档上鼠标拖动
$(document).mouseup(function () {
    isMove = false;
});

function insertEffect(id) {
    console.log('insert ' + id + 'effect!');
}