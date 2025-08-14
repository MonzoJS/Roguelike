var player = { x: 0, y: 0, hp: 100, attack: 10, type: 'player' };
var enemies = [];
var items = [];

function getEmptyCell() {
    var x, y;
    do {
        x = rand(1, mapWidth - 2);
        y = rand(1, mapHeight - 2);
    } while (map[y][x] !== '.' || getEntityAt(x, y));
    return { x: x, y: y };
}

function getEntityAt(x, y) {
    if (player.x === x && player.y === y) return player;
    for (var i = 0; i < enemies.length; i++) {
        if (enemies[i].x === x && enemies[i].y === y) return enemies[i];
    }
    return null;
}

function removeEnemy(enemy) {
    var i = enemies.indexOf(enemy);
    if (i > -1) enemies.splice(i, 1);
}

function spawnEntities() {
    var pos = getEmptyCell();
    player.x = pos.x;
    player.y = pos.y;

    for (var i = 0; i < 10; i++) {
        pos = getEmptyCell();
        enemies.push({ x: pos.x, y: pos.y, hp: 20, attack: 5, type: 'enemy' });
    }

    for (var i = 0; i < 2; i++) {
        pos = getEmptyCell();
        items.push({ x: pos.x, y: pos.y, type: 'sword' });
    }

    for (var i = 0; i < 10; i++) {
        pos = getEmptyCell();
        items.push({ x: pos.x, y: pos.y, type: 'potion' });
    }
}
