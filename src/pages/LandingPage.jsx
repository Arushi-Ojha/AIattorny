import { useNavigate } from "react-router-dom";
function LandingPage(){
    var navigate= useNavigate();
    function Login(){
        navigate('/login')
    }
    function Open(){
        navigate('/open')
    }
    function Donate(){
        navigate('/donate')
    }
    return(
        <div>
            <button onClick={Login}>GET STARTED</button>
            <button onClick={Open}>ARE YOU A LAWYER? help our clients with your consultation</button>
            <button onClick={Donate}>Donate</button>
        </div>
    );
}
export default LandingPage;