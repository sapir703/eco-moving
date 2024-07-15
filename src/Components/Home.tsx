import React from "react";
import "../App.css"
import DeliveryForm from "./DeliveryForm";
import ComplaintForm from "./ComplaintForm";
import ComplaintList from "./ComplaintList";
import Typography from "@mui/material/Typography";
import DeliveryManagement from "./DeliveryEdit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {googleLogin} from "../firebase/firebaseUtils";
import ecoMovingEmployees from "../assets/ecoMovingEmployees.jpeg";
const Home = ({user, setUser,currentPage, auth, googleAuthProvider}: any) => {
    switch (currentPage) {
        case 'Home':
            return <HomePage user={user} setUser={setUser} auth={auth} googleAuthProvider={googleAuthProvider}/>
        case 'New Delivery':
            return <DeliveryForm user={user}/>
        case 'New Complaint':
            return <ComplaintForm user={user}/>
        case 'Mange my Complaints':
            if(!user){
                return <Typography align={'center'} fontSize={'30px'}>Please log in to see the complaints</Typography>
            }
            return <ComplaintList user={user}/>
        case 'Mange my Deliveries':
            if(!user){
                return <Typography align={'center'} fontSize={'30px'}>Please log in to see the deliveries</Typography>
            }
            return <DeliveryManagement user={user}/>
        default:
            return <HomePage user={user} setUser={setUser} auth={auth} googleAuthProvider={googleAuthProvider}/>
    }
};

const HomePage = ({user, setUser, auth, googleAuthProvider}:any) => {
    const login = () => {
        googleLogin({setUser, auth, googleAuthProvider})
    }
    return (
        <div className={'center'}>
            {user ?
                (<>
                    <LocalShippingIcon sx={{fontSize: 100, marginTop:3}}/>
                    <h1>Welcome to Eco Moving</h1>
                    <p>Move hassle-free with Eco Moving - your trusted choice for eco-friendly moving services. Book
                        reliable movers effortlessly and enjoy a stress-free moving experience.</p>

                    <img style={{
                        width: '45vw',
                        height: '45vh',
                        border: '5px solid #4CAF50',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                    }}  src={ecoMovingEmployees}/>

                </>)
                :
                (<h1 onClick={login} style={{cursor: 'pointer', margin: '10vh'}}>Click here to connect to your
                    account</h1>)

            }
        </div>
    )
}

export default Home;


