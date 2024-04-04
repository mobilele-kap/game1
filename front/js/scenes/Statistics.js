import '../jquery-3.7.1.min.js'
import key_press_obj from "../key_press.js";

const key_num_array = ['bt1','bt2','bt3','bt4','bt5','bt6'];

class Statistics {
    constructor ({call_end}) {
        this.call_end = call_end;
    }

    render() {
        $("#scene").html(
            `<div id="start">
                <div id="start-container">
                    <div id="start-logo">Название</div>
                    <div id="start-action">
                        Начни
                    </div>
                </div>
            </div>`
        );
        $("#start").css({
            "background-image": "url(js/scenes/img/fon.png)",
            "width": "100vw",
            "height": "100vh",
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
    }

    stop() {
        key_press_obj.del_element('Start');
        this.call_end && this.call_end();
    }

    handler_event_key (event) {
        // Обработчик нажатия клавишь:
        console.log(`KeyboardEvent: ${JSON.stringify(event)}`);
        if (event.bt && (key_num_array.includes(event.bt))) {
            this.stop();
        }
    }
}

export default Statistics