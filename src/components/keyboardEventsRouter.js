const hotkeysMapping = {};

(() => {
    window.onload = function () {
        document.addEventListener('keydown', (e) => {
            const keyPressed = e.key.toUpperCase();
            if (keyPressed in hotkeysMapping) {
                hotkeysMapping[keyPressed][0]();
            }
        });

        document.addEventListener('keyup', (e) => {
            const keyPressed = e.key.toUpperCase();
            if (keyPressed in hotkeysMapping) {
                hotkeysMapping[keyPressed][1]();
            }
        });
    }
})();

export default hotkeysMapping;