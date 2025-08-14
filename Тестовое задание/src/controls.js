// Устойчивое управление: WASD / стрелки / Space, независимо от раскладки.
// Зависимости: movePlayer(dx,dy), attack(), enemyTurn(), render()

(function () {
    // Снимаем возможные старые обработчики, чтобы не было дублей
    $(window).off('keydown.rogue');

    $(window).on('keydown.rogue', function (e) {
        var act = mapKey(e);
        if (!act) return;

        // Блокируем прокрутку страницы для стрелок/пробела
        if (act.type === 'move' || act.type === 'attack') {
            if (e.preventDefault) e.preventDefault();
        }

        if (act.type === 'move') {
            movePlayer(act.dx, act.dy);
            if (typeof enemyTurn === 'function') enemyTurn();
            render();
        } else if (act.type === 'attack') {
            attack();
            if (typeof enemyTurn === 'function') enemyTurn();
            render();
        }
    });

    // Три уровня распознавания: e.code -> e.key -> keyCode/which
    function mapKey(e) {
        // 1) e.code — раскладконезависимая раскладка (KeyW/KeyA/...)
        var code = e.code || '';
        switch (code) {
            case 'KeyW': return { type: 'move', dx: 0, dy: -1 };
            case 'KeyS': return { type: 'move', dx: 0, dy:  1 };
            case 'KeyA': return { type: 'move', dx: -1, dy: 0 };
            case 'KeyD': return { type: 'move', dx:  1, dy: 0 };
            case 'ArrowUp':    return { type: 'move', dx: 0, dy: -1 };
            case 'ArrowDown':  return { type: 'move', dx: 0, dy:  1 };
            case 'ArrowLeft':  return { type: 'move', dx: -1, dy: 0 };
            case 'ArrowRight': return { type: 'move', dx:  1, dy: 0 };
            case 'Space': return { type: 'attack' };
        }

        // 2) e.key — учитываем разные раскладки (w/ц и т.п.)
        var k = (e.key || '').toLowerCase();
        if (k === 'w' || k === 'ц') return { type: 'move', dx: 0, dy: -1 };
        if (k === 's' || k === 'ы') return { type: 'move', dx: 0, dy:  1 };
        if (k === 'a' || k === 'ф') return { type: 'move', dx: -1, dy: 0 };
        if (k === 'd' || k === 'в') return { type: 'move', dx:  1, dy: 0 };
        if (k === 'arrowup')    return { type: 'move', dx: 0, dy: -1 };
        if (k === 'arrowdown')  return { type: 'move', dx: 0, dy:  1 };
        if (k === 'arrowleft')  return { type: 'move', dx: -1, dy: 0 };
        if (k === 'arrowright') return { type: 'move', dx:  1, dy: 0 };

        // 3) keyCode/which — старые браузеры / jQuery 1.x
        var kc = e.which || e.keyCode || 0;
        if (kc === 87 || kc === 38) return { type: 'move', dx: 0, dy: -1 }; // W / Up
        if (kc === 83 || kc === 40) return { type: 'move', dx: 0, dy:  1 }; // S / Down
        if (kc === 65 || kc === 37) return { type: 'move', dx: -1, dy: 0 }; // A / Left
        if (kc === 68 || kc === 39) return { type: 'move', dx:  1, dy: 0 }; // D / Right
        if (kc === 32) return { type: 'attack' };                            // Space

        return null;
    }
})();
