// Рендер поля + HP-бар прямо в клетке игрока.
// Зависимости: map, mapWidth, mapHeight, player, enemies, items, getEntityAt()

function render() {
    var $field = $('.field');
    $field.empty();

    for (var y = 0; y < mapHeight; y++) {
        for (var x = 0; x < mapWidth; x++) {
            var $tile = $('<div class="tile"></div>');

            // Бэкграунд тайла (стена/пол)
            var isFloor = (map[y][x] === '.' || map[y][x] === 'F'); // '.' у нас пол; F — если у тебя есть альтернативное обозначение
            $tile.css('background-image', isFloor ? 'url(images/tile-.png)' : 'url(images/tile-W.png)');

            // Предметы (без Array.prototype.find )
            var item = null;
            for (var ii = 0; ii < items.length; ii++) {
                if (items[ii].x === x && items[ii].y === y) { item = items[ii]; break; }
            }
            if (item) {
                if (item.type === 'potion') $tile.css('background-image', 'url(images/tile-HP.png)');
                if (item.type === 'sword')  $tile.css('background-image', 'url(images/tile-SW.png)');
            }

            // Враг
            var ent = getEntityAt(x, y);
            if (ent && ent.type === 'enemy') {
                $tile.css('background-image', 'url(images/tile-E.png)');
            }

            // Игрок + HP-бар ВНУТРИ тайла игрока
            if (player.x === x && player.y === y) {
                $tile.css('background-image', 'url(images/tile-P.png)');
                var maxHp = (player.maxHp != null) ? player.maxHp : 100; // без изменения entities.js
                var pct = Math.max(0, Math.min(100, Math.round((player.hp / maxHp) * 100)));
                $tile.append('<div class="health" style="width:' + pct + '%"></div>');
            }

            $field.append($tile);
        }
    }

    // Лог 
    if (typeof renderLog === 'function') renderLog();
}
