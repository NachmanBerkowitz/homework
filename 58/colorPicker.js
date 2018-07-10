/* eslint no-undef:off*/
(function () {
    bgColorPicker.defaultValue='#ffffff';
    textColorPicker.defaultValue='#ffffff';
    repaint.addEventListener('click', function () {
        console.log('hi');
        main.style.backgroundColor = bgColorPicker.value;
        main.style.color = textColorPicker.value;
    });
}());