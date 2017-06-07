var width = 800, height = 600, boundary = 30;
var catcher_speed = 5;
var cat, catcher, cursors, txtScore, score;
var game = new Phaser.Game(width, height, Phaser.CANVAS, null, { preload: preload, create: create, update: update });

function preload() {
    game.load.image('cat', 'assets/img/cat.png');
    game.load.image('catcher', 'assets/img/catcher.png');
    game.load.image('bg', 'assets/img/bg.png');
}

function create() {
    game.add.sprite(0, 0, 'bg');

    catcher = game.add.sprite(width/2, height/2, 'catcher');
    catcher.anchor.setTo(0.5, 0);
    game.physics.enable(catcher, Phaser.Physics.ARCADE)

    var rand_width = randomPos(game.width, boundary);
    var rand_height = randomPos(game.height, boundary);
    cat = game.add.sprite( rand_width, rand_height, 'cat');
    game.physics.enable(cat, Phaser.Physics.ARCADE);

    score = 0;
    var style = { font: '20px Arial', fill: '#FFF' };
    txtScore = game.add.text(10, 10, "SCORE: "+score.toString(), style);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    var left = cursors.left.isDown;
    var right = cursors.right.isDown;
    var up = cursors.up.isDown;
    var down = cursors.down.isDown;
    var diagonal = (left && down) || (left && up) || (right && down) || (right && up);

    // Avoid diagonal speed higher than normal
    var speed = diagonal ? catcher_speed * 0.8 : catcher_speed;

    if (left) {
        catcher.x -= (catcher.x >= boundary) ? speed : 0;
        catcher.scale.x = 1; // Flip the sprit in the right direction
    }
    if (right) {
        catcher.x += (catcher.x <= width - boundary) ? speed : 0;
        catcher.scale.x = -1; // Flip the sprit in the right direction
    }
    if (up) {
        catcher.y -= (catcher.y >= boundary) ? speed : 0;
    }
    if (down) {
        catcher.y += (catcher.y <= height - boundary - 20) ? speed : 0;
    }

    game.physics.arcade.overlap(catcher, cat, catHitHandler);
}

function randomPos(pmax, pmin) {
    return Math.floor((Math.random() * (pmax - pmin)) + pmin);
}

function catHitHandler(catcherObject, catObject) {
    catObject.x = randomPos(game.width, boundary);
    catObject.y = randomPos(game.height, boundary);
    score ++;
    txtScore.setText("SCORE: "+score.toString());
}
