import "./jquery-3.7.1.min.js"



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

    next_scene(result) {
        const scene_data = this.scenes_generator.next();
        console.log("result", result)
        console.log(scene_data)
        if (this.current_scenes_obj) {
            delete this.current_scenes_obj
        }
        this.current_scenes_obj = new scene_data["value"]["scene"]({old_result: result, call_end: (end_result)=>(this.next_scene(end_result))});
        this.current_scenes_number = scene_data["value"]["scene_number"];
        this.current_scenes_obj.start();
    }


}

export {Scenes}