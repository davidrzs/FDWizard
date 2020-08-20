


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


export function powerSet(bag:string[]) : (string[])[]{

    let powerSet : (string[])[] = [];
    const twoPow = 2**bag.length;

    for(let i =0; i < twoPow; i++){
        let tempSet :string[] = [];
        // create binary representation
        let num = i.toString(2);

        // we need to add padding:
        while(bag.length < num.length){
            num = '0' + num;
        }

        for(let k = 0; k < bag.length; k++){
            if(num[k] == "1"){
                tempSet.push(bag[k]);
            }
        }

        powerSet.push(tempSet);
    }
    return powerSet;

}