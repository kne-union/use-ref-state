import {useCallback, useRef, useState, useEffect} from 'react';

const useMounted = () => {
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    return mounted;
};

const useRefState = (initState) => {
    const mounted = useMounted();
    const [state, setState] = useState(initState);
    const refState = useRef(state);
    const setRefState = useCallback((args) => {
        if (!mounted.current) {
            return;
        }
        refState.current = (typeof args === 'function') ? args(refState.current) : args;
        setState(refState.current);
    }, []);
    return [refState, setRefState];
};

export default useRefState;
