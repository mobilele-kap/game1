import './jquery-3.7.1.min.js'
import {Start, Menu, Action, Result, Scenes} from './scenes.js'

var scenes_obj = new Scenes({scenes:[Start, Menu, Action, Result]});



$(document).ready(function () {
    scenes_obj.next_scene()
    console.log('1111')



//    document.addEventListener('keypress', function(event){
//        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
//        eel.key_press(event.key, event.code)
//        scenes_obj.next_scene()
//    });
});