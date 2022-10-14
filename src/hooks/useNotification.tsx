import { useEffect } from "react"


type INotification = {
    title: string
    img?: string
    body: string
}

const useNotification = () => {
    useEffect(() => {
        console.log('Notification is mounted');
        return () => console.log('Notification is unmounted');
    }, [])


    function createNotification({title, img='', body}: INotification): void{
        let notification = new Notification(title, {
            body,
            icon: img
        });
        console.log({notification});
        setTimeout(() => {
            notification.close();
        }, 5000);
    }


    return {createNotification}
}



export default useNotification;