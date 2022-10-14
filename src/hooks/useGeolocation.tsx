import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';




type ILocation = {
    longitude: number | null,
    latitude: number | null
}


const useGeolocation = () => {
    const [location, setLocation] = useState<ILocation>({
        longitude: null,
        latitude: null
    })
    useEffect(() => {
        console.log('Geolocation is mounted');
        console.log(setLocation);
        return () => console.log('Geolocation is unmounted');
    }, [])


    //
    function getCurrentPosition(): void{
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
        }, (error) => {
            toast.error(error.message);
        }, {
            enableHighAccuracy: true,
            timeout: 5000
        })
    }


    function watchUserPosition(): number {
        let watcherId = navigator.geolocation.watchPosition(pos => {
            console.log(pos);
        }, err => {
            console.log(err.message);
            toast.error(err.message);
        })
        return watcherId;
    }


    function clearPositionWatcher(watcherId: number): void {
        navigator.geolocation.clearWatch(watcherId);
    }


    return {
        getCurrentPosition,
        location,
        watchUserPosition,
        clearPositionWatcher
    }
}



export default useGeolocation;