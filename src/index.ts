import {contained,merge,sameArray} from './helper'

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





