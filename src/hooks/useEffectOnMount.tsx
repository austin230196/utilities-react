import {useEffect, useRef} from "react";




const useEffectOnMount = (cb: () => void, dependencies: Array<any>=[]): void => {
    const flag = useRef(false);
    useEffect(() => {
        if(flag.current) return;
        cb();
        flag.current = true;
    }, dependencies);
}



export default useEffectOnMount;