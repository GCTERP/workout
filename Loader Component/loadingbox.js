export default function LoaderPrimary(){
    return(
       
       <div className="fixed bg-white opacity-80 top-0 left-0 w-full h-full min-h-screen flex justify-center items-center">
            <svg className="transition duration-500 delay-300 ease-in animate-spin" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <rect x="1" y="1" width="50" height="50" rx="5" stroke="#0177FB" stroke-width="2"/>
            </svg>
            <svg className="absolute transition duration-500 delay-300 ease-in animate-spin transform rotate-180" xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                <rect x="1" y="1" width="50" height="50" rx="5" stroke="#0177FB" stroke-width="2"/>
            </svg>
        </div>
    )
}
