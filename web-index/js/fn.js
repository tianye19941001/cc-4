<<<<<<< HEAD
fnResize();
window.addEventListener("resize", function() {
    fnResize()
}, false);
function fnResize(){
    var docWidth = document.documentElement.clientWidth,
            body = document.getElementsByTagName('html')[0];
    body.style.fontSize = docWidth / 30 + 'px';
=======
fnResize();
window.addEventListener("resize", function() {
    fnResize()
}, false);
function fnResize(){
    var docWidth = document.documentElement.clientWidth,
            body = document.getElementsByTagName('html')[0];
    body.style.fontSize = docWidth / 30 + 'px';
>>>>>>> f410ee65735f169ea7d2dea46971cab9201b62de
}