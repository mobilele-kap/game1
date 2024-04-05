import '../jquery-3.7.1.min.js'
import key_press_obj from "../key_press.js";
import {statistic_delay_exit} from "../config.js"

const key_num_array = ['bt1','bt2','bt3','bt4','bt5','bt6'];

function format_time(num_sec) {
    return (num_sec).toFixed(2) + ' сек.';
}

function format_proc(proc) {
    return (proc).toFixed(2) + '%';
}


class Statistics {
    constructor ({call_end, old_result}) {
        this.call_end = call_end;
        this.old_result = old_result;
        this.interval_exit = null;
        this.start_time_ms = 0;
    }

    render() {
        const title = this.old_result.is_win ? "Победа": "Поражение";
        const game_time = this.old_result?.game_time / 1000;
        console.log(game_time)
        const avg_time = this.old_result?.avg_time / 1000;
        const top_time = this.old_result?.top_time / 1000;
        const worst_time = this.old_result?.worst_time / 1000;
        const accuracy = this.old_result?.accuracy*100;
        $("#scene").html(
            `<div id="statistics">
                <div id="statistics-container">
                    <div id="statistics-title">
                        <span>${title}</span>
                    </div>
                    <div id="statistics-from">
                        <div id="result-table-box">
                            <table id="result-table">
                              <tr ${!game_time > 0? "hidden": ""}>
                                <td>Время игры</td>
                                <td>${format_time(game_time)}</td>
                              </tr>
                              <tr ${!(avg_time > 0 && avg_time<9999)? "hidden": ""}>
                                <td>Среднее время на удар</td>
                                <td>${format_time(avg_time)}</td>
                              </tr>
                              <tr ${!top_time > 0? "hidden": ""}>
                                <td>Лучшее время удара</td>
                                <td>${format_time(top_time)}</td>
                              </tr>
                              <tr ${!worst_time > 0? "hidden": ""}>
                                <td>Худшее время удара</td>
                                <td>${format_time(worst_time)}</td>
                              </tr>
                              <tr ${!accuracy > 0? "hidden": ""}>
                                <td>Точность</td>
                                <td>${format_proc(accuracy)}</td>
                              </tr>
                            </table>
                        </div>
                    </div>
                    <div id="statistics-exit">
                        <span>Выход </span>
                        <span id="statistics-exit-time"></span>
                    </div>
                </div>
            </div>`
        );
        $("#statistics").css({
            "background-image": "url(js/scenes/img/fon.png)",
            "width": "100vw",
            "height": "100vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "background-size": "100%",
        });
        $("#statistics-container").css({
            "width": "90vw",
            "height": "90vh",
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
        });
        $("#statistics-title").css({
            "height": "10vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "color": "#fffffa",
            "font-size": "9vh",
            "font-family": "Brusnika",
            "font-weight": "700"
        });
        $("#statistics-from").css({
            "width": "85vw",
            "height": "85vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "font-family": "Brusnika",
            "font-size": "7vh",
            "color": "#fffffa",
        });
        $("#statistics-exit").css({
            "width": "17vw",
            "height": "10vh",
            "display": "flex",
            "align-items": "center",
            "justify-content": "center",
            "border": "solid 1vh #fffffa",
            "border-radius": "3vh",
            "color": "#fffffa",
            "font-size": "8vh",
            "font-family": "Brusnika",
            "background-color": "rgba(18, 64, 171, 0.3)",
        });
        $("#statistics-exit-time").css({
            "width": "5vw",
            "margin-left": "1vw",
        });
        $("#result-table-box").css({
            "padding": "3vh",
            "border": "solid 1vh #fffffa",
            "border-radius": "2vh",
            "background-color": "rgba(18, 64, 171, 0.3)",
        });
    }



    start() {
        this.start_time_ms = Date.now();
        // Добавить событе на кнопку:
        key_press_obj.add_element('Statistics', (event) =>(this.handler_event_key(event)));
        // Отрисовать HTML
        this.render();
        let self = this;
        this.interval_exit = setInterval(()=>{
            if (statistic_delay_exit < Date.now() - self.start_time_ms) {
                // Что делать дальше:
                self.stop();
            } else {
                $("#statistics-exit-time").text(((statistic_delay_exit - (Date.now() - self.start_time_ms))/1000).toFixed(0));
            }
        }, 500);
    }

    stop() {
        key_press_obj.del_element('Start');
        this.interval_exit && clearInterval(this.interval_exit);
        document.location.reload();
        // this.call_end && this.call_end();
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