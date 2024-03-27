import eel

@eel.expose
def key_press(key_code: int) -> bool:
    print(key_code)
    return True