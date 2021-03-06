
;(function($) {
    $.fn.circleMagic = function(options) {

        let width, height, largeContainer, canvas, ctx, target, animateHeader = true;
        let circles = [];

        let settings = $.extend({
            elem: '.header',
            color: 'rgba(255,255,255,.5)',
            radius: 10,
            densety: 0.3,
            clearOffset: 0.2
        }, options);
        //Main
        initContainer();
        addListeners();

        function initContainer() {
            width  = window.innerWidth;
            height = window.innerHeight;
            target = {x: 0, y: height};
            largeContainer = document.querySelector(settings.elem);
            largeContainer.style.height = height+'px';
            //create canvas element
            initCanvas();
            canvas = document.getElementById('canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');

            // create circles
            for(let x = 0; x < width * settings.densety; x++) {
                let c = new Circle();
                circles.push(c);
            }
            animate();
        }

        //Init canvas element
        function initCanvas() {
            let canvasElement = document.createElement('canvas');
            canvasElement.id = 'canvas';
            largeContainer.append(canvasElement);

        }

        // Event handling
        function addListeners() {
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }

        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            largeContainer.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }

        function animate() {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                for(let i in circles) {
                    circles[i].draw();
                }
            }
            requestAnimationFrame(animate);
        }

        function randomColor(){
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let alpha = Math.random().toPrecision(2);
            let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            return rgba;
        }
        // Canvas manipulation
        function Circle() {
            var self = this;

            // constructor
            (function() {
                self.pos = {};
                init();
            })();

            function init() {
                self.pos.x = Math.random()*width;
                self.pos.y = height+Math.random()*100;
                self.alpha = 0.1+Math.random()*settings.clearOffset;
                self.scale = 0.1+Math.random()*0.3;
                self.speed = Math.random();
                if (settings.color == 'random'){
                    self.color = randomColor();
                }
                else {
                    self.color = settings.color;
                }
            }

            this.draw = function() {
                if(self.alpha <= 0) {
                    init();
                }
                self.pos.y -= self.speed;
                self.alpha -= 0.0005;
                ctx.beginPath();
                ctx.arc(self.pos.x, self.pos.y, self.scale * settings.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = self.color;
                ctx.fill();
                ctx.closePath();
            };
        }
    }
})(jQuery);