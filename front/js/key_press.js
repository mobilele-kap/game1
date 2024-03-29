import "./jquery-3.7.1.min.js"

//function add_keypress_event(func) {
//    document.addEventListener('keypress', function(event){
//        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
//        eel.key_press(event.key, event.code)
//    });
//}


class KeyPress {
    constructor () {
        func_list = [];
    }

    add_element(name, func) {
        func_list.push({name, func});
        this.reload();
    }

    reload() {
        $(document).off('keypress',function(event){
            this.run_all(event);
        });
        $(document).on('keypress',function(event){
            this.run_all(event);
        });
    }

    run_all(event) {
        for(const element of func_list) {
            element['func'](event)
        }
    }
}



//eel.expose(say_hello_js); // Expose this function to Python
//function say_hello_js(x) {
//    console.log("Hello from " + x);
//}