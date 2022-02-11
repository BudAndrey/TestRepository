
export function change (func){
    func(Date.now())
}

export function setButtons (json,funcNext,funcPrev,sub){
    const checkPrev=json.previous===null?null:json.previous.substring(sub)
    const checkNext=json.next===null?null:json.next.substring(sub)
    funcNext(checkNext)
    funcPrev(checkPrev)
}