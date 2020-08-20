


export function contained(subset: string[], wholeList: string[]){

    let allIncluded = true;
    
    for(let item of subset){
        if(!wholeList.includes(item)){
            allIncluded = false;
        }

    }

    return allIncluded;

}

export function merge(set1: string[], set2: string[]) : string[]{

    let merged = set1.concat(set2);

    return unique(merged);
}

export function sameArray(set1: string[], set2: string[]) : boolean{
    if(set1.sort().join(',')=== set2.sort().join(',')){
        return true;
    }
    return false;
}

export function unique(bag:string[]):string[]{
    return   bag.filter((item, pos) => bag.indexOf(item) === pos);
}


export function removeSubset(total:string[], toRemove:string[]):string[]{
    return total.filter( ( el ) => !toRemove.includes( el ) );
}