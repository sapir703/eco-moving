import {Checkbox, FormControlLabel, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {saveCustomer, saveDelivery, saveDoc} from "../firebase/firebaseUtils";
import {calculateDistance, calculatePrice, displayAlert} from "../utils";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {PaymentFormPopup} from "./paymentForm";

const DELIVERIES_COLLECTION_NAME = 'deliveries'
const CUSTOMERS_COLLECTION_NAME = 'customers'
const defaultValues = {
    from: '',
    fromFloor: 0,
    fromElevator: false,
    to: '',
    toFloor: 0,
    toElevator: false,
    specialRequests: '',
    numOfBoxes: 0,
    distance: 0,
    price: 0,
    refrigerator: 0,
    oven: 0,
    bed: 0,
    closet: 0,
    table: 0,
    sofa: 0,
    washingMachine: 0,
    chair: 0,
    tv: 0,
    smallCloset: 0,
    status: 'Pending'
}
const DeliveryForm = ({user, defaultFormValues = defaultValues, docId = null, setSelectedDocument = null}: any) => {
    const [successAlert, setSuccessAlert] = useState(false)
    const [loginAlert, setLoginAlert] = useState(false)
    const [formValues, setFormValues] = useState(defaultFormValues)
    const [isInEdit, setIsInEdit] = useState(false)
    const [paymentForm, setPaymentForm] = useState(false)
    const submitForm = () => {
        if (!user) {
            displayAlert(setLoginAlert)
            return
        }
        const doc = {
            metadata: {
                createdBy: user.email,
                createdAt: new Date().toISOString()
            },
            data: formValues
        }
        if(isInEdit){
            doc.data.status = 'Waiting for Approval'
        }
        saveDelivery(docId, doc, DELIVERIES_COLLECTION_NAME)
        saveCustomer({
            email: user.email,
            address: formValues.to,
            floor: formValues.toFloor,
            hasElevator: formValues.toElevator
        }, CUSTOMERS_COLLECTION_NAME)
        displayAlert(setSuccessAlert)
        setPaymentForm(false)
    }
    const cancelEdit = () => {
        setSelectedDocument(null)
    }
    const showDistance = async () => {
        const {distance, from, to} = await calculateDistance(formValues.from, formValues.to)
        const price = calculatePrice(formValues.distance, formValues)
        setFormValues({...formValues, price, distance, from, to})
    }
    const isFormDisabled = () => {
        return !((setSelectedDocument && isInEdit) || !setSelectedDocument)
    }
    const isShowDistanceDisabled = formValues.from === '' || formValues.to === '' || isFormDisabled()

    return (
        <div>
            <form className='center'>
                {successAlert ? (<Alert icon={<CheckIcon fontSize="inherit"/>} severity="success" style={{fontSize:'20px'}}>
                    The order was successfully completed!
                </Alert>) : null}
                {loginAlert ? (<Alert severity="error">Please log in!</Alert>) : null}
                <h1>Make a delivery</h1>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.from}
                    onChange={e => {
                        setFormValues({...formValues, from: e.target.value})
                    }}
                    style={{width: "200px", margin: "5px"}}
                    type="text"
                    label="From"
                    variant="outlined"
                />
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.fromFloor}
                    style={{width: "70px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, fromFloor: Number(e.target.value)})
                    }}
                    type="number"
                    label="Floor"
                    variant="outlined"
                />
                <FormControlLabel disabled={isFormDisabled()} label="Elevator" labelPlacement='bottom' control={<Checkbox
                    value={formValues.fromElevator}
                    onChange={e => {
                        setFormValues({...formValues, fromElevator: Boolean(e.target.value)})
                    }}
                />}/>
                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.to}
                    onChange={e => {
                        setFormValues({...formValues, to: e.target.value})
                    }}
                    style={{width: "200px", margin: "5px"}}
                    type="text"
                    label="To"
                    variant="outlined"
                />
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.toFloor}
                    style={{width: "70px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, toFloor: Number(e.target.value)})
                    }}
                    type="number"
                    label="Floor"
                    variant="outlined"
                />
                <FormControlLabel disabled={isFormDisabled()} label="Elevator" labelPlacement='bottom' control={<Checkbox
                    value={formValues.toElevator}
                    onChange={e => {
                        setFormValues({...formValues, toElevator: Boolean(e.target.value)})
                    }}
                />}/>

                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.specialRequests}
                    style={{width: "370px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, specialRequests: e.target.value})
                    }}
                    id="standard-multiline-flexible"
                    label="Special requests"
                    multiline
                    minRows={3}
                    maxRows={8}
                />
                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.numOfBoxes}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, numOfBoxes: Number(e.target.value)})
                    }}
                    type="number"
                    label="# of boxes"
                    variant="outlined"
                />

                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.refrigerator}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, refrigerator: Number(e.target.value)})
                    }}
                    type="number"
                    label="refrigerator"
                    variant="outlined"
                />

                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.oven}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, oven: Number(e.target.value)})
                    }}
                    type="number"
                    label="Ovens"
                    variant="outlined"
                />
                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.bed}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, bed: Number(e.target.value)})
                    }}
                    type="number"
                    label="Beds"
                    variant="outlined"
                />
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.closet}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, closet: Number(e.target.value)})
                    }}
                    type="number"
                    label="Closets"
                    variant="outlined"
                />

                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.table}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, table: Number(e.target.value)})
                    }}
                    type="number"
                    label="Tables"
                    variant="outlined"
                />
                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.sofa}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, sofa: Number(e.target.value)})
                    }}
                    type="number"
                    label="Sofas"
                    variant="outlined"
                />
                <TextField
                    disabled={isFormDisabled()}
                    InputLabelProps={{shrink: true}}
                    value={formValues.washingMachine}
                    style={{width: "200px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, washingMachine: Number(e.target.value)})
                    }}
                    type="number"
                    label="Washing machines"
                    variant="outlined"
                />
                <br/>
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.chair}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, chair: Number(e.target.value)})
                    }}
                    type="number"
                    label="Chairs"
                    variant="outlined"
                />
                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.tv}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, tv: Number(e.target.value)})
                    }}
                    type="number"
                    label="TVs"
                    variant="outlined"
                />

                <TextField
                    disabled={isFormDisabled()}
                    value={formValues.smallCloset}
                    style={{width: "150px", margin: "5px"}}
                    onChange={e => {
                        setFormValues({...formValues, smallCloset: Number(e.target.value)})
                    }}
                    type="number"
                    label="Small closets"
                    variant="outlined"
                />
                <br/>
                {setSelectedDocument ? (<Select
                    disabled={true}
                    value={formValues.status}
                    onChange={e => {
                        setFormValues({...formValues, status: e.target.value})
                    }}
                    type="text"
                    variant="outlined"
                >
                    <MenuItem value="Done">Done</MenuItem>
                    <MenuItem value="Waiting for Approval">Waiting for Approval</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                </Select>) : null}
                <br/>
                <Button variant="contained" color="secondary" onClick={showDistance} disabled={isShowDistanceDisabled}>
                    Click to get an Offer
                </Button>
                <Typography>
                    Distance: {formValues.distance}
                </Typography>
                <Typography>
                    Price: {formValues.price}
                </Typography>
                <Button disabled={isFormDisabled()} variant="contained" color="primary" onClick={()=>setPaymentForm(true)}>
                    save
                </Button>
                <br/>
                {setSelectedDocument ? (
                    <Button style={{margin: "5px"}} variant="contained" color="error" onClick={cancelEdit}>
                        Return
                    </Button>) : null}
                {setSelectedDocument && (formValues.status === 'Pending' || isInEdit) ? (
                    <Button style={{margin: "5px"}} variant="contained" color="info" onClick={()=>{setIsInEdit(!isInEdit)}}>
                        {!isInEdit ? 'Edit' : 'Stop editing'}
                    </Button>
                ) : null}
            </form>
            {paymentForm ? <PaymentFormPopup price={formValues.price} submitForm={submitForm} setPaymentPage={setPaymentForm}/> : null}
        </div>
    );
}

export default DeliveryForm;