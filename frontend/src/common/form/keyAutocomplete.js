export const city = 'CityId'

export function description(id, name, returnName){
    if(returnName){
        return name;
    }
    return ("000000" + id).slice(-4) + " - " + name;
}

export function returnId(txt){
    let pos = txt.indexOf("-")
    if(pos === -1){
        return txt
    }
    return txt.substring(0, pos-1)
}

export function removePontFront(txt){
    txt = txt.replace(/[.].*/g, "")
    return txt
}

