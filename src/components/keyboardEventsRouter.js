const hotkeysMapping = {};

(() => {
    window.onload = function () {
        document.addEventListener('keydown', (e) => {
            const keyPressed = e.key.toUpperCase();
            if (keyPressed in hotkeysMapping) {
                hotkeysMapping[keyPressed]();

            }
        });
    }
})();

export default hotkeysMapping;