//function key_press(key_code) {
//
//}


document.addEventListener('keypress', function(event){
    const key_code = event.keyCode;
    console.log('key_press:', key_code);
    eel.key_press(key_code)
});