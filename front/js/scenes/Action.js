import '../jquery-3.7.1.min.js'
import {action_lvl1_delay_quest, action_lvl2_delay_quest, action_lvl3_delay_quest, action_stop_delay} from '../config.js'
import {get_random_int_range} from "../scripts/random.js";
import compare_key from "../scripts/compare_key.js";

const key_num_dict = {
    'bt1': 1,
    'bt2': 2,
    'bt3': 3,
    'bt4': 4,
    'bt5': 5,
    'bt6': 6,
}

class Action {
    constructor ({call_end, lvl}) {
        this.call_end = call_end;
        this.score = 0;
        this.miss = 0;
        this.purpose = null;
        // Выбор задержки:
        switch(lvl) {
            case 1:
                this.delay_quest = action_lvl1_delay_quest;
                break;
            case 2:
                this.delay_quest = action_lvl2_delay_quest;
                break;
            case 3:
                this.delay_quest = action_lvl3_delay_quest;
                break;
            default:
                this.delay_quest = 10;
                break;
        }
        this.delay_quest_timer = null;
        this.timmer_stop = null;

    }

    render() {
        $("#scene").html(
            `<div id="action">
                <div id="action-field-container">
                    <div id="action-field-title">Название</div>
                    <div id="action-field">
                        <div class="purpose" id="purpose_1" ></div>
                        <div class="purpose" id="purpose_2" ></div>
                        <div class="purpose" id="purpose_3" ></div>
                        <div class="purpose" id="purpose_4" ></div>
                        <div class="purpose" id="purpose_5" ></div>
                        <div class="purpose" id="purpose_6" ></div>
                        <div id="info-action-container">
                            <div id="time_container"></div>
                            <div class="mini-logo"></div>
                            <div id="score_container"></div>
                        </div>
                    </div>
                </div>
            </div>`
        );
        $("#action").css({
            "background-color": "red",
            "width": "100%",
            "height": "100%",
        });
        $(".purpose").css({
            "background-color": "blue",
            "width": "10%",
            "height": "3%",
            "border": "solid 1px #1437AD"
        });
    }


    add_event_key() {
        // Начать считывать нажатия на кнопки:
        let self = this;
        $(document).on('keypress', self.handler_event_key);
    }

    del_event_key() {
        // Закончить считывать нажатия на кнопки:
        let self = this;
        $(document).off('keypress', self.handler_event_key);
    }

    add_stop_timer() {
        let self = this
        // Запустить займер остановки:
        this.timmer_stop = setTimeout(function () {
            self.stop();
        }, action_stop_delay);

    }

    handler_event_key (event) {
        // Обработчик нажатия клавишь:
        console.log(`KeyboardEvent: key='${event.key}' | code='${event.code}'`);
        const bt = compare_key(event.key);
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
        } else {
            this.add_miss(1);
        }
        // Изменить цель:
        if (is_hit) {
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

    add_miss(num) {
        // добавить промах:
        this.miss += num;
    }

    start() {
        // Отрисовать HTML
        this.render();
        // Добавить событе на кнопку:
        this.add_event_key();
        // Ноавя цель:
        this.new_purpose();
        this.add_stop_timer();
    }

    stop () {
        this.del_event_key();
        this.delay_quest_timer && clearTimeout(this.delay_quest_timer);
        this.call_end && this.call_end();
    }
}

export default Action