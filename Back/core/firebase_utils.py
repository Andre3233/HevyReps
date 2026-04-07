from firebase_admin import firestore

_db = None  # variável privada global para armazenar o cliente Firestore

def get_db():
    global _db
    if _db is None:
        _db = firestore.client()  #  aqui, após inicialização do Firebase
    return _db # Inicializa o firebase
