import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function accueil(){
    const cookieStore = await cookies()
    const cookieConnect = cookieStore.get('connect.sid')
    
    if (cookieConnect) {
        redirect("/annonces")
    }
    else {
        redirect("/login")
    }
}