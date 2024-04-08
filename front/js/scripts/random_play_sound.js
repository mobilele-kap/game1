import {get_random_int_range} from "./random.js"
import "../howler.js"

class RandomPlaySound{
    constructor(path_array) {
        this.path_array = path_array;
        this.current_sound_obj = null;
        this.current_sound_index = null;
        this.length = path_array.length
    }

    next_sound() {
        while (true) {
            const new_index =  get_random_int_range(0, this.length-1);

            if (new_index !== this.current_sound_index) {
                this.current_sound_index = new_index;
                break;
            }
        }
        console.log('new_index', this.current_sound_index)
        const path = this.path_array[this.current_sound_index];
        this.current_sound_obj && this.current_sound_obj.stop();
        let self = this;
        this.current_sound_obj = new Howl({
            src: [path],
        });
        this.current_sound_obj.on('end', function () {
            self.next_sound();
        });
        this.current_sound_obj.play();
    }

    start() {
        this.next_sound();
    }

    stop() {
        this.current_sound_obj && this.current_sound_obj.stop();
    }

}

export default RandomPlaySound