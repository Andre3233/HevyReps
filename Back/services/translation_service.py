from deep_translator import GoogleTranslator
from functools import lru_cache
from typing import List

SEPARATOR = "\n###SEP###\n"  
LANG_PT = "pt"
LANG_EN = "en"

_TRANSLATOR_PT_EN = GoogleTranslator(source=LANG_PT, target=LANG_EN)
_TRANSLATOR_EN_PT = GoogleTranslator(source=LANG_EN, target=LANG_PT)

def _safe_translate(text: str, translator: GoogleTranslator) -> str:
    if not text or not text.strip():
        return text
    
    try:
        return translator.translate(text)
    except Exception as e:
        print(f"[Erro na tradução]: {e}")
        return text

@lru_cache(maxsize=5000)#guarda até 5000 traduções únicas em memória
def translate_to_english(text: str) -> str:
    return _safe_translate(text, _TRANSLATOR_PT_EN)


@lru_cache(maxsize=5000)
def translate_to_portuguese(text: str) -> str:
    return _safe_translate(text, _TRANSLATOR_EN_PT)


def translate_list_to_portuguese(texts: List[str]) -> List[str]:
    if not texts:
        return []
    
    if len(texts) == 1:
        return [translate_to_portuguese(texts[0])]
    
    try:
        joined = SEPARATOR.join(texts)
        translated_joined = _safe_translate(joined, _TRANSLATOR_EN_PT)
        translated_list = translated_joined.split(SEPARATOR)
        
        if len(translated_list) == len(texts):
            return translated_list
        else:
            print(f"[Tradução] Batch failed: {len(texts)} → {len(translated_list)}, falling back to one-by-one")
    except Exception as e:
        # Erro durante batch (rede, timeout, etc)
        print(f"[Tradução] Batch error: {e}, falling back to one-by-one")
    
    # Traduzir uma a uma (fallback robusto), com lru_cache, textos repetidos são instantâneos
    return [translate_to_portuguese(text) for text in texts]
