import '../jquery-3.7.1.min.js'
import key_press_obj from "../key_press.js";
import {start_action_text, sounds_start_path} from "../config.js"
import "../howler.js"
import RandomPlaySound from "../scripts/random_play_sound.js";



const key_num_array = ['bt1','bt2','bt3','bt4','bt5','bt6'];

class Start {
    constructor ({call_end}) {
        this.call_end = call_end;
        this.sound_track = null
    }

    render() {
        $("#scene").html(
            `<div id="start">
                <div id="start-container">
                    <div id="start-logo">Дай Пас!</div>
                    <div id="start-action-box">
                        <marquee direction="left" scrollamount="10">${start_action_text}</marquee>
                    </div>
                </div>
            </div>`
        );
        $("#start-container").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "flex-direction": "column",
        });
        $("#start-logo").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "font-family": "Brusnika",
            "color": "#fffffa",
            "font-size": "12vh",
            "margin": "5vh",
        });
        $("#start-action-box").css({
            "color": "#fffffa",
            "font-size": "8vh",
            "font-family": "Brusnika",
            "background-color": "rgba(18, 64, 171, 0.3)",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "margin-top": "61vh",
        });
        $("#start").css({
            "background-image": "url(js/scenes/img/fon.png)",
            "width": "100vw",
            "height": "100vh",
            "background-size": "100%",
        });
        $("#action-field-container").css({
            "background-color": "white",
            "width": "100%",
            "height": "100%",
            "margin": "10px",
        });
        $(".purpose").css({
            "background-color": "blue",
            "width": "10vw",
            "height": "3vh",
            "border": "solid 1px #1437AD"
        });
    }



    start() {
        // Добавить событе на кнопку:
        key_press_obj.add_element('Start', (event) =>(this.handler_event_key(event)));
        // Отрисовать HTML
        this.render();
        this.start_sound_track();
    }

    stop() {
        key_press_obj.del_element('Start');
        this.sound_track.stop();
        this.call_end && this.call_end();
    }

    start_sound_track() {
        // Запистить музыку:
        this.sound_track = new RandomPlaySound(sounds_start_path);
        this.sound_track.start();
    }

    handler_event_key (event) {
        // Обработчик нажатия клавишь:
        console.log(`KeyboardEvent: ${JSON.stringify(event)}`);
        if (event.bt && (key_num_array.includes(event.bt))) {
            this.stop();
        }
    }
}

export default Start