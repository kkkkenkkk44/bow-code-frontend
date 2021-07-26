const languageID = {
    "c": 50,
    "cpp": 54,
    "csp": 51,
    "java": 62,
    "javascript": 63,
    "python": 71
}

export function getLanguageID(language){
    return languageID[language]
}