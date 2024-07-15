import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React, {ChangeEvent, useState} from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import {displayAlert} from "../utils";
import {saveDoc} from "../firebase/firebaseUtils";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from 'uuid';

const COMPLAINT_COLLECTION_NAME = 'complaints'


const ComplaintForm = ({user}:any) => {
    const [sucessAlert,setSucessAlert] = useState(false)
    const [loginAlert,setLoginAlert] = useState(false)
    const [currentComplaintId, setCurrentComplaintId] = useState<string>('')
    const [file, setFile] = useState<File>();
    const [formValues,setFormValues]= useState({deliveryDate: new Date(), nameOfMovers: '', complaintDetails:'', from:'', to:'', status:'open', decision:''})
    const submitForm = async () => {
        if(!user){
            displayAlert(setLoginAlert)
            return
        }
        let imageDownloadUrl = ''

        //Firebase Storage
        if(file){
            const storage = getStorage();
            var storageRef = ref(storage,'img/'+uuid());
            imageDownloadUrl = await uploadBytes(storageRef, file).then((snapshot) => {
                return getDownloadURL(snapshot.ref).then((downloadURL) => {
                    return downloadURL
                })
            });
        }
        //Firestore
        const doc = {
            metadata: {
                createdBy: user.email,
                createdAt: new Date()
            },
            data: {...formValues, imageDownloadUrl}
        }
        const currentComplaint = await saveDoc(doc, COMPLAINT_COLLECTION_NAME)
        setCurrentComplaintId(currentComplaint.id)
        displayAlert(setSucessAlert)
    }
    const resetForm = () => {
        setFormValues({deliveryDate: new Date(), nameOfMovers: '', complaintDetails:'', from:'', to:'', status:'open', decision: ''})
        setFile(undefined)
    }
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        setFile(file)
    };
    return (
        <div>
            <form className='center'>
                {sucessAlert ?(<Alert icon={<CheckIcon fontSize="inherit" />} severity="success" style={{fontSize:'20px'}}>
                    The complaint was successfully opened! Our representative will contact you soon.
                    Complaint ID: {currentComplaintId}
                </Alert>): null}
                {loginAlert? (<Alert severity="error">Please log in!</Alert>): null}
                <h1>Make a complaint</h1>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    value = {formValues.deliveryDate.toISOString().split('T')[0]}
                    onChange={e => {
                        setFormValues({...formValues,deliveryDate:new Date(e.target.value)})
                    }}
                    style={{width: "200px", margin: "5px"}}
                    type="date"
                    label="Delivery Date"
                    variant="outlined"
                />
                <br/>
                <TextField
                    style={{width: "370px", margin: "5px"}}
                    value = {formValues.from}
                    onChange={e => {
                        setFormValues({...formValues,from:e.target.value})
                    }}
                    label="From"
                />
                <br/>
                <TextField
                    style={{width: "370px", margin: "5px"}}
                    value = {formValues.to}
                    onChange={e => {
                        setFormValues({...formValues,to:e.target.value})
                    }}
                    label="To"
                />
                <br/>
                <TextField
                    style={{width: "370px", margin: "5px"}}
                    value = {formValues.nameOfMovers}
                    onChange={e => {
                        setFormValues({...formValues,nameOfMovers:e.target.value})
                    }}
                    type="text"
                    label="Names of the movers"
                    variant="outlined"
                />
               <br/>
                <TextField
                    style={{width: "370px", margin: "5px"}}
                    value = {formValues.complaintDetails}
                    onChange={e => {
                        setFormValues({...formValues,complaintDetails:e.target.value})
                    }}
                    id="standard-multiline-flexible"
                    label="Complaint details"
                    multiline
                    minRows={3}
                    maxRows={8}
                />
                <br/>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<FileUploadIcon />}
                    sx={{ marginRight: "1rem", marginBottom: "1rem"}}
                >
                    Upload CSV
                    <input type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={handleFileUpload} />
                </Button>
                <br/>
                <Button  variant="contained" color="primary" onClick={submitForm}>
                    save
                </Button>
                <Button  variant="contained" color="secondary" onClick={resetForm}>
                    cancel
                </Button>

            </form>
        </div>
    );
}

export default ComplaintForm;