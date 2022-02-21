import Color from './color';

const colorInput = document.querySelector('input[type="color"]');

const colorPropertyInputs = document.querySelectorAll('div[data-color-property]');

const color = new Color(colorInput.value);

function colorChanged(evt) {
    
}

// Listen for color when the color input value changes
colorInput.addEventListener('change', (evt) => color.hex = colorInput.value);

// Update the UI when the Color object changes
document.addEventListener('color:changed', () => {
    colorInput.value = color.hex;
    ['hex', 'rgb'].forEach(value => {
        const colorValue = color[value];
        document.getElementById(`${value}-color`).style.backgroundColor = colorValue;
        document.getElementById(`${value}-notation`).value = colorValue;
    });
});

// listen for changes to the input[type="range"] elements
colorPropertyInputs.forEach(ele => {
    ele.querySelector('input[type="range"').addEventListener('change', evt => {
        evt.stopPropagation();
        const property = ele.dataset.colorProperty;
        color[property] = evt.target.value;
        ele.querySelector('div[role="label"').innerHTML = evt.target.value;
    });
});

// invoke a change event so the color swtches and
// labels sync with the color object
colorInput.dispatchEvent(new Event('change'));