    var positionOnScreen = 455;
    var position = 0;
    var speed = 1;
    var a = document.getElementById('a');
    var r = document.getElementById('r');
    var p = document.getElementById('p');
    var s = document.getElementById('s');
    var MarsRover = document.getElementById('MarsRover');
    var k = 0;
    a.addEventListener("click", function () {
        if (!MarsRover.classList.contains('reverse')) {
            var promise = new Promise(function (resolve, reject) {
                var start = Date.now();
                a.style.visibility = 'hidden';
                r.style.visibility = 'hidden';
                let timer = setInterval(function () {

                    var timePassed = Date.now() - start;

                    if (timePassed >= 1800 * (speed - k)) {
                        k = 0;
                        positionOnScreen = MarsRover.style.left;
                        positionOnScreen = positionOnScreen.replace('%', '');
                        positionOnScreen = parseFloat(positionOnScreen);
                        clearInterval(timer);
                        resolve("result");
                        return;
                    }

                    if (parseFloat(MarsRover.style.left.replace('%', '')) > 915) {
                        positionOnScreen = -(timePassed / 20);
                        k = k + 0.86;
                        changeMarsUp();
                    }

                    MarsRover.style.left = positionOnScreen + timePassed / 20 + '%';
                });

            }, 20);


            promise.then(function (result) {
                speedUp();
                p.innerHTML = 'Position: ' + position;
                s.innerHTML = 'Speed: ' + speed;
                MarsRover.style.left = positionOnScreen + '%';
                a.style.visibility = 'visible';
                r.style.visibility = 'visible';
            });

        } else {
            var promise = new Promise(function (resolve, reject) {
                var start = Date.now();
                a.style.visibility = 'hidden';
                r.style.visibility = 'hidden';
                let timer = setInterval(function () {

                    var timePassed = Date.now() - start;

                    if (timePassed >= 1800 * (speed * (-1) - k)) {
                        k = 0;
                        positionOnScreen = MarsRover.style.left;
                        positionOnScreen = positionOnScreen.replace('%', '');
                        positionOnScreen = parseFloat(positionOnScreen);
                        clearInterval(timer);
                        resolve("result");
                        return;
                    }


                    if (parseFloat(MarsRover.style.left.replace('%', '')) <= 0) {
                        k = k + 0.86;
                        positionOnScreen = (timePassed / 20) + 915;
                        changeMarsDown();
                    }

                    MarsRover.style.left = positionOnScreen - (timePassed / 20) + '%';
                });

            }, 20);


            promise.then(function (result) {
                speedUp();
                p.innerHTML = 'Position: ' + position;
                s.innerHTML = 'Speed: ' + speed;
                MarsRover.style.left = positionOnScreen + '%';
                a.style.visibility = 'visible';
                r.style.visibility = 'visible';
            });
        }

    });


    r.addEventListener("click", function () {
        k = 0;
        if (MarsRover.classList.contains('reverse')) {
            MarsRover.classList.remove('reverse');
            speed = 1;
            p.innerHTML = 'Position: ' + position;
            s.innerHTML = 'Speed: ' + speed;
        } else {
            MarsRover.classList = 'reverse';
            speed = -1;
            p.innerHTML = 'Position: ' + position;
            s.innerHTML = 'Speed: ' + speed;
        }

    });

    function speedUp() {
        position = position + speed;
        speed = speed * 2;
    }


    function changeMarsUp() {
        let last = document.getElementById('10').innerHTML;
        for (i = 0; i < 11; i++) {
            document.getElementById(i).innerHTML = ++last;
        }
    }

    function changeMarsDown() {
        let last = document.getElementById('0').innerHTML;
        for (i = 10; i > -1; i--) {
            document.getElementById(i).innerHTML = --last;
        }
    }