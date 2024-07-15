import Alert from '@mui/material/Alert';
import axios from 'axios';

const sleep = (delay:number) => new Promise((resolve) => setTimeout(resolve, delay))


export const displayAlert = async (setAlert: any) => {
    setAlert(true)
    await sleep(5000)
    setAlert(false)
}

export const calculateDistance = async (origin:string, destination:string) => {
    // return {distance:5,from:'PLEASE ASK YAHAV TO TURN THIS FEATURE ON',to:'PLEASE ASK YAHAV TO TURN THIS FEATURE ON'} //TODO: DELETE THIS LINE
    //If this function fails, its either because distancematrix.ai limit is reached or the API key is invalid
    //or https://cors-anywhere.herokuapp.com proxy has stopped working -
    //visit https://cors-anywhere.herokuapp.com and click on the button to temporarily fix the issue
    const apiKey = '0T4j4phMrc9miSqv63D8OCKuCaxa8ZO8fclnoojyyg7LYE1guPGfoqXlv2Bb61mU';
    const url = 'https://api-v2.distancematrix.ai/maps/api/distancematrix/json'
    const cors_url=`https://cors-anywhere.herokuapp.com/${url}`
    try {

        const response = await axios.get(cors_url, {
            params: {
                key: apiKey,
                origins: origin + ', Israel',
                destinations: destination + ', Israel'
            },
        });

        if (response.data.status === 'OK') {
            const distance = Math.round((response.data.rows[0].elements[0].distance.value)/1000);
            const from = response.data.origin_addresses[0]
            const to = response.data.destination_addresses[0]
            return {distance, from, to}
        } else {
            return {};
        }
    } catch (error) {
        return {};
    }
}

export const calculatePrice = (distance: number, formValues:any) => {
    let price = distance*100
    price += (formValues.refrigerator + formValues.oven + formValues.bed + formValues.closet + formValues.table + formValues.sofa + formValues.washingMachine + formValues.chair + formValues.tv + formValues.smallCloset)*50
    if (formValues.fromElevator){
        price -= 50
    }
    if (formValues.toElevator){
        price -= 50
    }
    return price
}

export const getStatusColor = (status:string) => {
    switch (status) {
        case 'Done':
            return {color: 'green'}
        case 'Waiting for Approval':
            return {color: 'gray'}
        case 'Pending':
            return {color: 'yellow'}
        case 'Canceled':
            return {color: 'red'}
        case 'canceled':
            return {color: 'red'}
        case 'open':
            return {color: 'red'}
        case 'solved':
            return {color: 'green'}
        default:
            return {color: 'black'}
    }
}

