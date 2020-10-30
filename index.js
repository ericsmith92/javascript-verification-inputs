const form = document.forms[0];
const inputs = form.querySelectorAll('input[type=text]');

const handleInput = e => {
    const input = e.target;
    if(input.nextElementSibling && input.value.trim() !== ''){
        if(input.nextElementSibling.value){
            input.nextElementSibling.select();
        }else{
            input.nextElementSibling.focus();
        }
    }
}

const handleBackspace = e => {
    if(e.keyCode !== 8){
        return;
    }

    const input = e.target;

    if(input.previousElementSibling){
        input.previousElementSibling.focus();
    }
}

const pasteCode = e => {
    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    const clipboardData = e.clipboardData;
    const pastedDataArr = clipboardData.getData('Text').split('');

    if(pastedDataArr.length <= inputs.length){
        pastedDataArr.forEach( (char, index, thisArg) => {
            inputs[index].value = char || '';

            if(index === thisArg.length - 1 && inputs[index].nextElementSibling){
                inputs[index].nextElementSibling.focus();
            }
        });
    }
}

form.addEventListener('input', handleInput);
form.addEventListener('keydown', handleBackspace);
inputs[0].addEventListener('paste', pasteCode);

