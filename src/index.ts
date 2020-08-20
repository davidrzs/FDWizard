import {powerSet, contained,merge,sameArray,unique,removeSubset} from './helper'

export interface functionalDependency {
    left: string[];
    right: string[];
}



export function closure(attrs: string[], deps: functionalDependency[]) : string[] {

    let hasChanged = true;

    let closure :string[] = attrs;

    while(hasChanged){
        hasChanged = false;
        for(let dep of deps){
            if(contained(dep.left,closure)){
                let oldClosure = closure;
                closure = merge(closure,dep.right);
                if(!sameArray(oldClosure,closure)){
                    hasChanged = true;
                }
            }
        }
    }

    return closure;

}


export function minimalBasis(deps: functionalDependency[]) : functionalDependency[] {


    // first we do the left reduction
    for(let i = 0; i < deps.length; i++){
        

        for(let attr of deps[i].left){
            let closureWithoutAttr = closure(removeSubset(deps[i].left,[attr]),deps);

            if(contained(deps[i].right,closureWithoutAttr)){
                deps[i] = {
                    left: removeSubset(deps[i].left,[attr]),
                    right: deps[i].right
                };
            }
        }

    }


    // now we do a right reduction
    for(let i = 0; i < deps.length; i++){
        
        for(let attr of deps[i].right){

            let modifiedDeps = (deps.filter((item, pos) => pos != i)).concat ([{
                "left": deps[i].left,
                "right": removeSubset(deps[i].right, [attr])
            }]);


            let closureWithoutAttr = closure(deps[i].left,modifiedDeps);

            // check if we can reduce the right side
            if(contained([attr],closureWithoutAttr)){
                deps[i] = {
                    "left": deps[i].left,
                    "right": removeSubset(deps[i].right, [attr])
                };
            }
          
        }

    }

    // get rid of empty dependencies (if right side empty due to right side reduction)
    deps = deps.filter((el) => { return (el.right.length > 0)});

    return deps;

}


export function superKeys(attrs: string[],deps: functionalDependency[]) : (string[])[]{

    let ps = powerSet(attrs);

    // now check for each if their closure is all the attributes:

    let ck : (string[])[] = []

    for(let st of ps){
        const stClosure = closure(st,deps);
        if(contained(attrs,stClosure)){
            ck.push(st);
        }
    }

    return ck;

}


export function candidateKeys(attrs: string[],deps: functionalDependency[]) : (string[])[]{

    const sK = superKeys(attrs,deps);

    let minLength = Number.MAX_VALUE;

    for(let key of sK){
        if(key.length < minLength){
            minLength = key.length;
        }
    }

    return sK.filter((e) => e.length == minLength);

}











