// DOM及初始化
const bgm = document.getElementById("bgm"),
    hint = document.getElementById("hint"),
    char = [
        "💗💛💙💚💜💖💘💝",
        "🍕🍔🍟🍳🍞🍜🍣🍤🍥🍢🍲🍝🍩🍪🎂🍰🍫🍬🍭🍡🍮🍯🍼🍵🍶",
        "🎃👹👺💀👻👽👾🤖💩🦄",
    ],
    table = prompt("请输入秘密口令");
let group;

if (table == 216) {
    bgm.src = "https://juanerjun-1253312316.cos.ap-chengdu.myqcloud.com/files/music/216.mp3";
    group = 0;
} else {
    bgm.src = "https://juanerjun-1253312316.cos.ap-chengdu.myqcloud.com/files/music/3.mp3";
    group = 1;
}

// 画布初始化
let directionX = 0,
    time = 0,
    bgcH = 34,
    bgcS = 78,
    body = document.getElementsByTagName("body")[0],
    c = document.getElementById("canvas");

(window.onresize = function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
})();

// 音乐准备就绪，可以开始
bgm.oncanplay = function () {
    c.style.display = "block";
    hint.style.fontSize = "7em";
    setInterval(count, 5);
    setInterval(out, 20);
    // 点击画面后，刷新计时
    document.onclick = function (event) {
        const e = event || window.event;
        draw(e.clientX, e.clientY);
        bgm.play();
        if (bgm.currentTime >= 33 && table == 216) {
            hint.style.animation = "beatsSmall .24s";
        } else {
            hint.style.animation = "beats .24s";
        }
        hint.style.animationIterationCount = "infinite";
        hint.style.animationDirection = "alternate";
        hint.style.animationTimingFunction = "ease-in";
        body.style.backgroundColor = "#FFF";
        bgm.volume = 1;
        bgcS = 100;
        time = 80;
    };
};

// 在(x,y)位置绘制图标
function draw(x, y) {
    // 随机旋转图标一定角度
    const randR = (Math.round(Math.random() * 20) - 10) / 20;
    // const randY = (Math.round(Math.random()*10)-0)*10;
    const ctx = c.getContext("2d");
    ctx.font = "60px Arial";
    ctx.translate(x, y);
    ctx.rotate(randR);
    const charIndex = randomInteger(0, char[group].length / 2 - 2) * 2;
    ctx.fillText(char[group].substr(charIndex, 2), -40, +30);
    ctx.rotate(-randR);
    ctx.translate(-x, -y);
}

// 平移画面内容
function out() {
    const ctx = c.getContext("2d");
    const nowImage = ctx.getImageData(0, 0, c.width, c.height);
    ctx.putImageData(nowImage, directionX * 7, -8);
}

// 生成范围内随机整数
function randomInteger(min, max) {
    const length = max - min;
    let value = Math.round(Math.random() * (length + 1)) + min;
    if (value == max + 1) {
        value = min;
    }
    return value;
}
function change() {
    group = randomInteger(0, char.length - 1);
}

// 计时器
function count() {
    // 没有互动的情况下，逐渐降低音量，直到停止播放
    if (time) {
        time -= 1;
        bgcH += 1;
        hint.style.color = "hsl(" + bgcH + ", " + bgcS + "%, 70%)";
        if (bgm.volume >= 0.01) {
            bgm.volume -= 0.01;
        }
    } else {
        bgm.pause();
        hint.style.animation = "";
        body.style.backgroundColor = "#222";
        hint.style.color = "white";
        hint.innerHTML = "<i class='fas fa-headphones-alt'></i>";
    }
    // 【彩蛋】 倒计时
    // 在输入秘密口令正确时，播放到33秒后更改画面内容
    if (bgm.currentTime >= 33 && table == 216) {
        hint.style.fontSize = "2em";
        hint.innerHTML = "<i class='fab fa-qq'></i> 315038639";
    }
}
