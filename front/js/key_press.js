

function add_keypress_event() {

}

document.addEventListener('keypress', function(event){
    console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
    eel.key_press(event.key, event.code)
});


eel.expose(say_hello_js); // Expose this function to Python
function say_hello_js(x) {
    console.log("Hello from " + x);
}