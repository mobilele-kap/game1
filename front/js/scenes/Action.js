import '../jquery-3.7.1.min.js'
import {action_delay_quest, action_stop_delay} from '../config.js'
import {get_random_int_range} from "../scripts/random.js";
import key_press_obj from "../key_press.js";



const key_num_dict = {
    'bt1': 1,
    'bt2': 2,
    'bt3': 3,
    'bt4': 4,
    'bt5': 5,
    'bt6': 6,
}

class Action {
    constructor ({call_end}) {
        this.action_history = [];
        this.call_end = call_end;
        this.score = 0;
        this.purpose = null;
        // Выбор задержки:
        this.delay_quest = action_delay_quest;
        this.delay_quest_timer = null;
        this.quest_start_time_ms = 0

        this.css_state_rest = {
            "background-color": "#6C8CD5",
            "border": "solid 1vh #1240AB",
        }
        this.css_state_active = {
            "background-color": "#FFD973",
            "border": "solid 1vh #FF4040",
        }
    }

    render() {
        //
        // const windowInnerWidth = window.innerWidth
        // const windowInnerHeight = window.innerHeight

        $("#scene").html(
            `<div id="action">
                <div id="action-field-container">
                    <div id="action-field-title">Название</div>
                    <div id="action-field">
                        <div class="action-line-1">
                            <div class="purpose-normal purpose" id="purpose_3" ></div>
                            <div class="purpose-normal purpose" id="purpose_4" ></div>
                        </div>
                        <div class="action-line-2">
                            <div class="purpose-normal purpose" id="purpose_2" ></div>
                            <div class="purpose-normal purpose" id="purpose_5" ></div>
                        </div>
                        <div class="action-line-3">
                            <div class="purpose-normal purpose" id="purpose_1" ></div>
                            <div class="purpose-normal purpose" id="purpose_6" ></div>
                        </div>
                        <div id="info-action-container">
                            <div id="time_container"></div>
                            <div class="mini-logo"></div>
                            <div id="score_container"></div>
                        </div>
                    </div>
                </div>
            </div>`
        );
        $(".action-line-1").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "33.3%"
        });

        $(".action-line-2").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "33.3%"
        });

        $(".action-line-3").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "33.3%"
        });

        $("#action").css({
            "background-color": "red",
            "width": "100vw",
            "height": "100vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            // "padding-left": '5vw',
            // "padding-right": '5vw',
            // "padding-button": '5vh',
        });
        $("#action-field-container").css({
            "width": "88vw",
            "height": "88vh",
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
        });
        $("#action-field").css({
            "background-color": "white",
            "width": "85vw",
            "height": "85vh",
            "position": "relative",
        });
        $(".purpose-normal").css({
            "width": "20vw",
            "height": "5vh",
        });
        $(".purpose-90").css({
            "width": "5%",
            "height": "90%",
        });
        $(".purpose").css(this.css_state_rest);
        $(".purpose").css(this.css_state_rest);



        $("#purpose_2").css({
            "transform": "rotate(135deg)",
            "margin-right": "auto",
        });
        $("#purpose_5").css({"transform": "rotate(45deg)"});


        $("#purpose_1").css({
            "margin-right": "auto",
            "margin-left": "calc(0 - 20vw + 20vw/2)",
            "transform": "rotate(90deg)",
        });
        $("#purpose_6").css({
            "transform": "rotate(90deg)",
        });
    }

    handler_event_key ({bt}) {
        // Обработчик нажатия клавишь:
        console.log(`KeyboardEvent: ${bt}`);
        if (bt) {
            const bt_num = key_num_dict[bt]
            bt_num && this.handler_hit({bt_num});
        }

    }

    handler_hit({bt_num}) {
        // Проверить попадания:
        const is_hit = this.check_hit(bt_num);
        // Изменить счет:
        if (is_hit) {
            this.add_score(1);
        }
        // Изменить цель:
        if (is_hit) {
            this.action_history.push({type: 'hit', wait_time: Date.now() - this.quest_start_time_ms})
            this.new_purpose();
        }
    }

    new_purpose() {
        // Новое значение цели:
        while (true) {
            const new_purpose = get_random_int_range(1,6);
            if (this.purpose !== new_purpose) {
                this.purpose = new_purpose;
                break;
            }
        }
        // Очистить если есть:
        this.delay_quest_timer && clearTimeout(this.delay_quest_timer);
        this.quest_start_time_ms = Date.now();
        // Запустить таймер:
        let self = this;
        this.delay_quest_timer = setTimeout(function () {
            self.new_purpose();
        }, self.delay_quest);
    }

    check_hit(button_num) {
        // Проверить попадение:
        return button_num === this.purpose
    }

    add_score(num) {
        // Добавить счет:
        const new_score = this.score + num;
        if (new_score >= 0) {
            this.score = new_score;
        } else {
            this.score = 0;
        }
    }

    start() {
        // Отрисовать HTML
        this.render();
        // Тут должна быть анимация:
        // Начать:
        this.start_action();
    }

    start_action() {
        // Добавить событе на кнопку:
        key_press_obj.add_element('Action', (event)=>(this.handler_event_key(event)))
        // Ноавя цель:
        this.new_purpose();
    }

    stop () {
        key_press_obj.del_element('Action');
        this.delay_quest_timer && clearTimeout(this.delay_quest_timer);
        this.call_end && this.call_end();
    }
}

export default Action