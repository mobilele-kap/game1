import '../jquery-3.7.1.min.js'
import {action_delay_quest, count_quest} from '../config.js'
import {get_random_int_range} from "../scripts/random.js";
import key_press_obj from "../key_press.js";
import {max_data, min_data} from "../scripts/data_record.js";

const key_num_dict = {
    'bt1': 1,
    'bt2': 2,
    'bt3': 3,
    'bt4': 4,
    'bt5': 5,
    'bt6': 6,
}

const key_css_button = {
    1: '#purpose_1',
    2: '#purpose_2',
    3: '#purpose_3',
    4: '#purpose_4',
    5: '#purpose_5',
    6: '#purpose_6',
}

class Action {
    constructor ({call_end}) {
        this.action_history = [];               // Таблица историй ударов
        this.call_end = call_end;               //Функция для остановки
        this.score = 0;                         // количества очков
        this.purpose = null;                    // Текущея цель
        this.delay_quest = action_delay_quest;  // Задержка до конца квеста
        this.interval_timer = null;             // Интервал для подсчета времени
        this.interval_quest_end = null;         // Интервал для отцета конца квеста
        this.quest_start_time_ms = 0;            //Время начала квеста
        this.start_time_action = 0;             // Начала ативности
        this.passed_time = 0;                   // Время игры
        this.css_state_active = {
            "background-color": "#7bf57d",
            "border": "solid 1vh #2f2e2e",
        }
        this.css_state_inactive = {
            "background-color": "#FFD973",
            "border": "solid 1vh #FF4040",
        }
    }

    render() {

        $("#scene").html(
            `<div id="action">
                <div id="action-field-container">
                    <div id="action-field-title"><span>Дай Пас!</span></div>
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
                            
                            <div id="info-action-container">
                                <div id="time_container">
                                    <div class="time_block">
                                        <span>Время</span>
                                    </div>
                                    <div class="time_block">
                                        <span id="count_time">0</span>
                                    </div>
                                </div>
                                <div class="mini-logo"></div>
                                <div id="score_container">
                                    <div class="score_block">
                                        <span>Балы</span>
                                    </div>
                                    <div class="score_block">
                                        <span id="count_score">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="quest_time_box">
                            <span id="quest_time"></span>
                        </div>
                    </div>
                </div>
            </div>`
        );

        $("#quest_time_box").css({
            "position": "absolute",
            "border-radius": "10vh 10vh 0 0",
            "background-color": "red",
            "height": "10vh",
            "width": "10vw",
            "z-index": "10",
            "top": "74vh",
            "left": "37.5vw",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "font-family": "Brusnika",
            "font-size": "8vh",
            "color": "#fffffa",
            "padding": "1vh",
        })

        $("#info-action-container").css({
            "display": "flex",
        });

        $("#time_container").css({
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "height": "20vh",
            "width": "15vw",
            "border": "solid 3px #d3c1c8",
            "border-radius": "2vh",
        });
        $("#score_container").css({
            "margin-left": "1vh",
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "height": "20vh",
            "width": "15vw",
            "border": "solid 3px #d3c1c8",
            "border-radius": "2vh",
        });

        $(".score_block").css({
            "height": "50%",
            "font-size": "8vh",
            "font-family": "Brusnika",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
        });
        $(".time_block").css({
            "height": "50%",
            "font-size": "8vh",
            "font-family": "Brusnika",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
        });

        $("#action-field-title").css({
            "color": "#fffffa",
            "font-size": "9vh",
            "font-family": "Brusnika",
            "height": "10vh",
        });

        $(".action-line-1").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "16.0%"
        });

        $(".action-line-2").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "25%"
        });

        $(".action-line-3").css({
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            'height': "59%",
            "position": "relative",
        });

        $("#action").css({
            "background-color": "red",
            "width": "100vw",
            "height": "100vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
        });
        $("#action-field-container").css({
            "width": "88vw",
            "height": "93vh",
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
            "border-radius": "3px",
            "clip-path": "polygon(22% 0, 78% 0, 100% 41%, 100% 100%, 0 100%, 0 41%)",
        });
        $(".purpose-normal").css({
            "width": "20vw",
            "height": "5vh",
        });
        $(".purpose-90").css({
            "width": "5%",
            "height": "90%",
        });

        $("#purpose_3").css({
            "margin-right": "2vw",
        });
        $("#purpose_4").css({
        });

        $("#purpose_2").css({
            "transform": "rotate(135deg)",
            "margin-right": "auto",
        });
        $("#purpose_5").css({"transform": "rotate(45deg)"});

        $("#purpose_1").css({
            "transform": "rotate(90deg)",
            "position": "absolute",
            "left": "-6.8vw",
            "top": "24vh",
        });
        $("#purpose_6").css({
            "transform": "rotate(90deg)",
            "position": "absolute",
            "left": "71vw",
            "top": "24vh",
        });

        $(".purpose").css(this.css_state_inactive);
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
        const old_purpose = this.purpose;
        while (true) {
            const new_purpose = get_random_int_range(1,6);
            if (this.purpose !== new_purpose) {
                this.purpose = new_purpose;
                break;
            }
        }
        // Очистить если есть:
        this.interval_quest_end && clearInterval(this.interval_quest_end);
        this.quest_start_time_ms = Date.now();
        // Поменять цвет:
        $(key_css_button[old_purpose]).css(this.css_state_inactive);
        $(key_css_button[this.purpose]).css(this.css_state_active);
        // Запустить таймер:
        this.start_interval_quest();
    }

    start_interval_quest() {
        let self = this;
        this.interval_quest_end = setInterval(function () {
            if (Date.now()-self.quest_start_time_ms > self.delay_quest) {
                //Что делать если закончилось время:
                self.stop(self.get_statistics(false));
            } else {
                $("#quest_time").text(Math.floor((self.delay_quest-(Date.now()-self.quest_start_time_ms))/1000)+1);
            }
        }, 200)
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
        if (this.score >= count_quest) {   // Если количество попадание совпало
            this.stop(this.get_statistics(true));
        }  else {
            $("#count_score").text(this.score);
        }
    }

    start() {
        // Отрисовать HTML
        this.render();
        // Тут должна быть анимация:
        // Начать:
        this.start_action();
    }

    start_timer() {
        let self = this;
        this.interval_timer = setInterval(()=>{
            self.passed_time = Date.now() - self.start_time_action;
            $("#count_time").text((self.passed_time/1000).toFixed(2));
        }, 63);
    }

    start_action() {
        // Добавить событе на кнопку:
        key_press_obj.add_element('Action', (event)=>(this.handler_event_key(event)))
        this.start_time_action = Date.now();
        this.start_timer()
        // Ноавя цель:
        this.new_purpose();
    }

    get_statistics(is_win) {
        let self = this;
        return {
            is_win,
            game_time: (Date.now() - self.start_time_action),
            avg_time: (Date.now() - self.start_time_action) / count_quest,
            top_time: max_data(self.action_history.filter(({type})=>type==='hit'), 'wait_time'),
        }
    }
    stop (statistics) {
        let self = this;
        key_press_obj.del_element('Action');
        self.interval_timer && clearInterval(self.interval_timer);
        self.interval_quest_end && clearInterval(self.interval_quest_end);
        self.call_end && self.call_end(statistics);
    }
}

export default Action