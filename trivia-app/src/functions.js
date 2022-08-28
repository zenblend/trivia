function shuffle(arr){
    for(let i = arr.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function fixText(str){
    return str.replace(/&quot;/g, '"')
        .replace(/&#039;/g, '\'')
        .replace(/&eacute;/g, 'é')
        .replace(/&amp;/g, '&')
        .replace(/&Uuml;/g, 'Ü')
}

export {shuffle, fixText}