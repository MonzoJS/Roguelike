var mapWidth = 40;
var mapHeight = 24;
var map = [];

function generateMap() {
    map = [];
    for (var y = 0; y < mapHeight; y++) {
        map[y] = [];
        for (var x = 0; x < mapWidth; x++) {
            map[y][x] = '#'; // стена
        }
    }

    var roomsCount = rand(5, 10);
    var roomCenters = [];

    for (var i = 0; i < roomsCount; i++) {
        var w = rand(3, 8);
        var h = rand(3, 8);
        var x = rand(1, mapWidth - w - 1);
        var y = rand(1, mapHeight - h - 1);

        // Создаём комнату
        for (var yy = y; yy < y + h; yy++) {
            for (var xx = x; xx < x + w; xx++) {
                map[yy][xx] = '.';
            }
        }

        // Запоминаем центр комнаты
        var centerX = Math.floor(x + w / 2);
        var centerY = Math.floor(y + h / 2);
        roomCenters.push({ x: centerX, y: centerY });

        // Соединяем с предыдущей комнатой
        if (i > 0) {
            var prev = roomCenters[i - 1];
            connectRooms(prev, { x: centerX, y: centerY });
        }
    }

    // Дополнительно создаём несколько горизонтальных и вертикальных коридоров
    for (var i = 0; i < rand(3, 5); i++) {
        var row = rand(1, mapHeight - 2);
        for (var x = 1; x < mapWidth - 1; x++) {
            map[row][x] = '.';
        }
    }

    for (var i = 0; i < rand(3, 5); i++) {
        var col = rand(1, mapWidth - 2);
        for (var y = 1; y < mapHeight - 1; y++) {
            map[y][col] = '.';
        }
    }
}

function connectRooms(a, b) {
    // Сначала идём по X
    var x = a.x;
    var y = a.y;

    while (x !== b.x) {
        map[y][x] = '.';
        x += (b.x > x) ? 1 : -1;
    }
    // Потом по Y
    while (y !== b.y) {
        map[y][x] = '.';
        y += (b.y > y) ? 1 : -1;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
