
function GetPageHeight() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight,
        document.documentElement.clientHeight, document.documentElement.scrollHeight,
        document.documentElement.offsetHeight);
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

function WindowScrollNormalPosition() {
    return window.scrollY / (GetPageHeight() - window.innerHeight);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

function page_init(lib) {

    let _this = stage.children[0];
    let page = _this.page;

    let padding = 0;

    let scrollStart = page.y + padding;
    let scrollEnd = calcScrollEnd();


    function calcScrollEnd() {
        return scrollStart - (page.nominalBounds.height) + (canvas.clientHeight) - (2 * padding);
    }

    function onScroll(e) {

        let currentScroll = WindowScrollNormalPosition();

        page.y = lerp(scrollStart, scrollEnd, currentScroll);

        let pageCurrentFrame = clamp(currentScroll * (page.totalFrames - 1),0, page.totalFrames - 1);

        console.log("new frame: "+pageCurrentFrame);

        _this.gotoAndStop(pageCurrentFrame);

        console.log("current frame: "+ page.currentFrame)

    }

    function onResize(e) {

        let stageRatio = lib.properties.height / lib.properties.width;

        stage.scaleY = canvas.clientWidth / canvas.clientHeight * window.devicePixelRatio * stageRatio;

        scrollEnd = calcScrollEnd();
        onScroll(null);

        stage.tickOnUpdate = false;
        stage.update();
        stage.tickOnUpdate = true;
    }

    onResize(null);
    onScroll(null);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll);

    console.log(lib);

}