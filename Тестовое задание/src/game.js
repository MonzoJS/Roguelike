var logMessages = [];

function addLog(message) {
    logMessages.push(message);
    if (logMessages.length > 5) logMessages.shift();
}

function renderLog() {
    $('#log').html(logMessages.join('<br>'));
}

function movePlayer(dx, dy) {
    var nx = player.x + dx;
    var ny = player.y + dy;
    if (map[ny][nx] !== '#') {
        var entity = getEntityAt(nx, ny);
        if (entity && entity.type === 'enemy') {
            attack();
        } else {
            var itemIndex = items.findIndex(function(it) { return it.x === nx && it.y === ny; });
            if (itemIndex > -1) {
                var item = items[itemIndex];
                if (item.type === 'potion') {
                    player.hp = Math.min(100, player.hp + 30);
                    addLog('Вы выпили зелье (+30 HP)');
                }
                if (item.type === 'sword') {
                    player.attack += 5;
                    addLog('Вы подняли меч (+5 атаки)');
                }
                items.splice(itemIndex, 1);
            }
            player.x = nx;
            player.y = ny;
        }
    }
}

function attack() {
    var dirs = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
    for (var i = 0; i < dirs.length; i++) {
        var nx = player.x + dirs[i].dx;
        var ny = player.y + dirs[i].dy;
        var enemy = getEntityAt(nx, ny);
        if (enemy && enemy.type === 'enemy') {
            enemy.hp -= player.attack;
            addLog('Вы ударили врага (' + player.attack + ' урона)');
            if (enemy.hp <= 0) {
                removeEnemy(enemy);
                addLog('Враг повержен!');
            }
        }
    }
}

function enemyTurn() {
    for (var i = enemies.length - 1; i >= 0; i--) {
        var enemy = enemies[i];
        if (Math.abs(enemy.x - player.x) + Math.abs(enemy.y - player.y) === 1) {
            player.hp -= enemy.attack;
            addLog('Враг ударил вас (' + enemy.attack + ' урона)');
            if (player.hp <= 0) {
                alert('Вы погибли!');
                resetGame();
                return;
            }
            continue;
        }
        var dirs = [{dx:1,dy:0},{dx:-1,dy:0},{dx:0,dy:1},{dx:0,dy:-1}];
        var dir = dirs[rand(0, dirs.length - 1)];
        var nx = enemy.x + dir.dx;
        var ny = enemy.y + dir.dy;
        if (map[ny][nx] === '.' && !getEntityAt(nx, ny)) {
            enemy.x = nx;
            enemy.y = ny;
        }
    }
}

function resetGame() {
    generateMap();
    enemies = [];
    items = [];
    spawnEntities();
    logMessages = [];
    render();
}

$(function() {
    resetGame();
});
