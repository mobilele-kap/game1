import './jquery-3.7.1.min.js'
import key_press_obj from "./key_press.js";
import {Start, Action, Result, Scenes} from './scenes.js'

const scenes_obj = new Scenes({scenes:[Start, Action, Result]});

$(document).ready(function () {
    $('body').css({'margin': 0})

    scenes_obj.next_scene()
    console.log('1111')



//    document.addEventListener('keypress', function(event){
//        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
//        eel.key_press(event.key, event.code)
//        scenes_obj.next_scene()
//    });
});