import '../../css/LoginCard.css';

export const LoginCard = () => {
    return (
        <div className="flex w-[700px] h-[425px] shadow-lg rounded-3xl">
            <div id='sign-in' className="w-6/12 h-full">
                <h1>Sign In</h1>
            </div>
            <div id='sign-up' className="w-6/12 h-full bg-black">
                <h1>Sign Up</h1>
            </div>
        </div>
    )
}