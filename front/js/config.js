const action_delay_quest = 10000;  //мс, Разрешенное время между ударами.
const action_start_delay = 5000; //мс, Отсчет времени перед началом игры.
const count_quest = 10; // Количество ударов до победы.
const statistic_delay_exit = 15000 //мс, Время показа статистики.
const start_action_text = "Попадите шайбой в любой пассер и игра начнется."
// Музыка и звуки:
const sounds_start_path = ['./js/scenes/sound/start_track1.mp3', './js/scenes/sound/start_track2.mp3', './js/scenes/sound/start_track3.mp3', './js/scenes/sound/start_track4.mp3']
const hit_action_path = './js/scenes/sound/hit1.mp3';
const mis_action_path = './js/scenes/sound/miss1.mp3';
const action_countdown_stop = './js/scenes/sound/countdown-stop.mp3';
const action_countdown_start = './js/scenes/sound/countdown-start.mp3';
const sound_action_path = './js/scenes/sound/action_track1.mp3';
const victory_statistic_path = './js/scenes/sound/victory1.mp3';
const defeat_statistic_path = './js/scenes/sound/defeat1.mp3';
const sound_statistic_path = './js/scenes/sound/end_track1.mp3';

// Управление:
const button_1 = '1';
const button_2 = '2';
const button_3 = '3';
const button_4 = '4';
const button_5 = '5';
const button_6 = '6';


export {action_delay_quest, count_quest, button_1, button_2, button_3,
    button_4, button_5, button_6, statistic_delay_exit, action_start_delay, start_action_text, sounds_start_path,
    hit_action_path, mis_action_path, sound_action_path, victory_statistic_path, defeat_statistic_path, sound_statistic_path,
    action_countdown_stop, action_countdown_start,
}