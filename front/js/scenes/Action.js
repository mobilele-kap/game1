import '../jquery-3.7.1.min.js'
import {action_delay_quest, count_quest, action_start_delay, hit_action_path, mis_action_path, sound_action_path,
    action_countdown_stop, action_countdown_start} from '../config.js'
import {get_random_int_range} from "../scripts/random.js";
import key_press_obj from "../key_press.js";
import {max_data, min_data} from "../scripts/data_record.js";
import "../howler.js"

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
        this.sound_track = null;
        this.css_state_active = {
            "background-color": "#FFFFFF",
            "border-top": "1vh solid #FF0000",
            "border-right": "1vh solid #FF0000",
            "border-bottom": "1vh dashed #000000",
            "border-left": "1vh solid #FF0000",
        }
        this.css_state_inactive = {
            "background-color": "#CFCFCF",
            "border": "solid 1vh #737373",

        }
    }

    render() {

        $("#scene").html(
            `<div id="action">
                <div id="action-field-container">
                    <div id="action-field-title"><span>Можно Пас!</span></div>
                    <div id="action-field">
                        <div id="timer-start-box">
                            <span id="timer-start"></span>
                        </div>
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

        $("#timer-start-box").css({
            "height": "20vh",
            "width": "20vh",
            "border": "solid 1vh #fffffa",
            "border-radius": "10vh",
            "color": "#fffffa",
            "font-family": "Brusnika",
            "font-size": "10vh",
            "background-color": "rgba(255,0,0,0.7)",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center",
            "position": "absolute",
            "top": "32.5vh",
            "left": "36.5vw",
            "z-index": "15",
        });

        $("#quest_time_box").css({
            "position": "absolute",
            "border-radius": "10vh 10vh 0 0",
            "background-color": "#0A295F",
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
            "border": "solid 3px #FF3636",
            "border-radius": "2vh",
        });
        $("#score_container").css({
            "margin-left": "1vh",
            "display": "flex",
            "flex-direction": "column",
            "justify-content": "center",
            "height": "20vh",
            "width": "15vw",
            "border": "solid 3px #FF3636",
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
            "background-color": "#0A295F",
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
            "transform": "rotate(-47deg)",
            "margin-right": "auto",
        });
        $("#purpose_5").css({"transform": "rotate(47deg)"});

        $("#purpose_1").css({
            "transform": "rotate(-90deg)",
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

        if (is_hit) {
            // звук:
            let sound = new Howl({
                src: [hit_action_path], autoplay: true,
            });
                // Изменить счет:
            this.action_history.push({type: 'hit', wait_time: Date.now() - this.quest_start_time_ms})
            this.add_score(1);
            //Проверить условия конца:
            if (this.score >= count_quest) {   // Если количество попадание совпало
                this.stop(this.get_statistics(true));
            }  else {
                $("#count_score").text(this.score);
                // Изменить цель:
                this.new_purpose();
            }
        } else {
            this.action_history.push({type: 'miss', wait_time: Date.now() - this.quest_start_time_ms})
            let sound = new Howl({
                src: [mis_action_path], autoplay: true,
            });
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
    }

    start_counting_down() {
        //Отсчет времени
        let self = this
        let count_sec = Math.ceil(action_start_delay/1000);
        $("#timer-start").text(count_sec);
        let sound = new Howl({src: [action_countdown_stop], autoplay: true,});
        let start_counting_down_timer = setInterval(function () {
            count_sec -= 1;
            if (count_sec < 0) {
                self.start_action();
                $("#timer-start-box").hide();
                clearInterval(start_counting_down_timer);
            } else {
                if (count_sec <= 0) {
                    $("#timer-start").text("GO");
                    let sound = new Howl({src: [action_countdown_start], autoplay: true,});
                } else {
                    $("#timer-start").text(count_sec);
                    $("#timer-start").css({"opacity": "0"});
                    $("#timer-start").animate({"opacity": "1"});
                    let sound = new Howl({src: [action_countdown_stop], autoplay: true,});
                }
            }
        }, 1000);
    }

    start() {
        // Отрисовать HTML
        this.render();
        // Тут должна быть анимация:
        // Начать:
        this.start_counting_down();
    }

    start_timer() {
        let self = this;
        this.interval_timer = setInterval(()=>{
            self.passed_time = Date.now() - self.start_time_action;
            $("#count_time").text((self.passed_time/1000).toFixed(2));
        }, 63);
    }

    start_sound_track() {
        this.sound_track = new Howl({
            src: [sound_action_path],
            volume: 0.7,
            loop: true,
        });
        console.log('play')
        this.sound_track.play()
    }

    start_action() {
        // Добавить событе на кнопку:
        key_press_obj.add_element('Action', (event)=>(this.handler_event_key(event)))
        this.start_time_action = Date.now();
        this.start_timer()
        // Ноавя цель:
        this.new_purpose();
        this.start_sound_track();
    }

    get_statistics(is_win) {
        let self = this;
        const count_hit = self.action_history.filter(({type})=>type==='hit').length;
        const count_miss = self.action_history.filter(({type})=>type==='miss').length;
        return {
            is_win,
            game_time: (Date.now() - self.start_time_action),
            avg_time: (Date.now() - self.start_time_action) / this.score,
            top_time: min_data(self.action_history.filter(({type})=>type==='hit'), 'wait_time'),
            worst_time: max_data(self.action_history.filter(({type})=>type==='hit'), 'wait_time'),
            accuracy: count_hit/(count_hit+count_miss)
        }
    }
    stop (statistics) {
        let self = this;
        this.sound_track && this.sound_track.stop();
        key_press_obj.del_element('Action');
        self.interval_timer && clearInterval(self.interval_timer);
        self.interval_quest_end && clearInterval(self.interval_quest_end);
        self.call_end && self.call_end(statistics);
    }
}

export default Action