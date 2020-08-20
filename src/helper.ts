


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
    let unique = merged.filter((item, pos) => merged.indexOf(item) === pos);

    return unique;
}

export function sameArray(set1: string[], set2: string[]) : boolean{
    if(set1.sort().join(',')=== set2.sort().join(',')){
        return true;
    }
    return false;
}