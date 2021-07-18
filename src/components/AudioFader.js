(function() {
    function loadSound(url, toBufferKey) {
        return new Promise(function(res) {
            // 异步获取音频文件
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';

            // 加载成功后进行解码操作
            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    res(buffer);
                });
            }

            // 发起请求
            request.send();
        });
    }

    var context;
    var BUFFERS = [];
    try {
        context = new(window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        alert('Web Audio API is not supported in this browser');
    }


    var CrossfadePlaylistSample = {
        FADE_TIME: 1, // 渐变时间，单位：秒
        playing: false,
        playIndex: 0,
        timer: void 0
    };

    CrossfadePlaylistSample.play = function() {
        function createSource(buffer) {
            var source = context.createBufferSource();
            var gainNode = context.createGain ? context.createGain() : context.createGainNode();

            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(context.destination);
            return {
                source: source,
                gainNode: gainNode
            };
        }
        var self = this;
        var bufferNow = BUFFERS[this.playIndex];
        var playNow = createSource(bufferNow);
        var source = this.source = playNow.source;
        var gainNode = this.gainNode = playNow.gainNode;
        var duration = bufferNow.duration; //持续时间
        var currTime = context.currentTime;
        //开始的时候渐强
        gainNode.gain.linearRampToValueAtTime(0, currTime);
        gainNode.gain.linearRampToValueAtTime(1, currTime + this.FADE_TIME);
        //结束的时候减弱
        gainNode.gain.linearRampToValueAtTime(1, currTime + duration - this.FADE_TIME);
        gainNode.gain.linearRampToValueAtTime(0, currTime + duration);
        source.start ? source.start(0) : source.noteOn(0);

        this.timer = setTimeout(function() {
            // console.log(duration - self.FADE_TIME)
            self.playIndex === 0 ? self.playIndex = 1 : self.playIndex = 0;
            self.play();
        }, ((currTime + duration - this.FADE_TIME) - currTime) * 1000);
    };

    CrossfadePlaylistSample.cut = function() {
        clearTimeout(this.timer);
        var oldSource = this.source;
        this.gainNode.gain.linearRampToValueAtTime(0, context.currentTime + this.FADE_TIME);
        setTimeout(function() {
            oldSource.stop ? oldSource.stop(0) : oldSource.noteOff(0);
        }, this.FADE_TIME * 1000);
        this.playIndex === 0 ? this.playIndex = 1 : this.playIndex = 0;
        this.play();
    }

    CrossfadePlaylistSample.pause = function() {
        clearTimeout(this.timer);
        this.source.stop ? this.source.stop(0) : this.source.noteOff(0);
    };

    CrossfadePlaylistSample.toggle = function() {
        this.playing ? this.pause() : this.play();
        this.playing = !this.playing;
    };

    Promise.all([loadSound('https://api.soundcloud.com/tracks/242638919/stream?client_id=a0f84e7c2d612d845125fb5eebff5b37').then(function(buffer) { BUFFERS.push(buffer) }),
        loadSound('https://api.soundcloud.com/tracks/242638919/stream?client_id=a0f84e7c2d612d845125fb5eebff5b37').then(function(buffer) { BUFFERS.push(buffer) })
    ]).then(function() {
        document.body.removeChild(document.getElementById('loading'));
        document.getElementById('playBtn').addEventListener('click', function() { CrossfadePlaylistSample.toggle() });
        document.getElementById('cut').addEventListener('click', function() { CrossfadePlaylistSample.cut() });
    });


}())