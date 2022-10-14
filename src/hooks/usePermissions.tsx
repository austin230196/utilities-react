import {useEffect } from 'react';



export type PermissionResponse = 'default' | 'error' | 'denied';


const usePermission = () => {
    useEffect(() => {
        console.log('Permissions data mounted');
        return () => console.log('Permissions data unmounted');
    }, [])


    async function requestPermission(): Promise<PermissionResponse> {
        try{
            let hasNavigator: boolean = 'Notification' in window;
            if(!hasNavigator) throw new Error('Browser does not have this option');
            else {
                let status: any = await window.Notification.requestPermission();
                return status;
            }
        }catch(err: any){
            console.log(err.message);
            return 'error';
        }
    }


    return {requestPermission};
}



export default usePermission;