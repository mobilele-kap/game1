import "./jquery-3.7.1.min.js"
import compare_key from "./scripts/compare_key.js";

//function add_keypress_event(func) {
//    document.addEventListener('keypress', function(event){
//        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
//        eel.key_press(event.key, event.code)
//    });
//}

class KeyPress {
    constructor () {
        this.func_list = [];
        this.add_event_keypress();
    }

    add_event_keypress() {
        $(document).on('keypress',function(event){
            self.run_all(event);
        });
    }

    add_element(name, func) {
        this.func_list.push({name, func});
    }

    del_element(name) {
        this.func_list = this.func_list.filter((row) => row['name'] !== name)
    }

    run_all(event) {
        for(const element of this.func_list) {
            const key = event.key;
            const code = event.code;
            const bt = compare_key(key)
            element['func'] && element['func']({bt, code, key});
        }
    }
}



//eel.expose(say_hello_js); // Expose this function to Python
//function say_hello_js(x) {
//    console.log("Hello from " + x);
//}