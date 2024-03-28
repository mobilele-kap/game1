import eel

@eel.expose
def key_press(key: str, code: str) -> bool:
    print(key, code)
    return True