import {button_1, button_2, button_3, button_4, button_5, button_6} from "../config.js";

const key_dict = {
    [button_1]: 'bt1',
    [button_2]: 'bt2',
    [button_3]: 'bt3',
    [button_4]: 'bt4',
    [button_5]: 'bt5',
    [button_6]: 'bt6',
}
function compare_key(key) {
   return key_dict[key]
}

export default compare_key