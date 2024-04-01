import "./jquery-3.7.1.min.js"
import Action from "./scenes/Action.js";

class Start {
    constructor ({call_end}) {
    this.call_end = call_end;
    this.event_end = null;
    }
    render() {
        $("#scene").html('<div id="start">start</div>');
    }
    stop() {
        console.log(2);
        this.call_end && this.call_end();
        delete this.event_end;
    }
    start() {
        this.render();
        const stop = () => (this.stop())
        $(document).on('keypress',function(event){
            if (event.key == 0) {

                console.log(1);
                stop()
            }
        });
    }

}

class Menu {
    constructor ({call_end}) {
    }
    render() {
        $("#scene").html('<div id="menu">menu</div>');
    }
    start() {
        this.render();
    }
}

// class Action {
//     constructor ({call_end}) {
//     }
//     render() {
//         $("#scene").html('<div id="action">action</div>');
//     }
//     start() {
//         this.render();
//     }
// }

class Result {
    constructor ({call_end}) {
    }
    render() {
        $("#scene").html('<div id="result">result</div>');
    }
    start() {
        this.render();
    }
}

function* next_element(data_array) {
    let current_index = 0
    while (true) {
        if (current_index > data_array.length-1) {
            current_index = 0;
        }
        yield {scene: data_array[current_index], scene_number: current_index}
        current_index += 1;
    }
}

class Scenes {
    constructor ({scenes}) {
    this.current_scenes_obj = null;
    this.current_scenes_number = null;
    this.scenes = scenes;
    this.scenes_generator = next_element(scenes);
    }

    next_scene() {
        const scene_data = this.scenes_generator.next();
        console.log(this.scenes)
        console.log(scene_data)
        this.current_scenes_obj = new scene_data["value"]["scene"]({call_end: ()=>(this.next_scene())});
        this.current_scenes_number = scene_data["value"]["scene_number"];
        this.current_scenes_obj.start();
    }


}

export {Start, Menu, Action, Result, Scenes}