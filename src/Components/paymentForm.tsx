import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';

export const PaymentFormPopup = ({submitForm, setPaymentPage, price}:any) => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        amount: '',
    });
    const [firstPage, setFirstPage] = useState(true);
    return (
        <Dialog open={true}>
            <DialogTitle>Payment Form</DialogTitle>
            {firstPage ? (<><DialogContent>
                <Button onClick={() => setFirstPage(false)}>Credit Card</Button>
                <Button onClick={() => submitForm()}>Bit</Button>
            </DialogContent></>) : (<>
                <DialogContent >
                <TextField
                    style={{margin: '1vh'}}
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                />
                <TextField
                    style={{margin: '1vh'}}
                    label="Expiration Date"
                    value={formData.expirationDate}
                    onChange={(e) => setFormData({...formData, expirationDate: e.target.value})}
                />
                <TextField
                    style={{margin: '1vh'}}
                    label="CVV"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                />
                <TextField
                    disabled={true}
                    value = {price}
                    style={{margin: '1vh'}}
                    label="Amount"
                    />
            </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPaymentPage(false)}>Cancel</Button>
                    <Button onClick={() => submitForm()}>Submit</Button>
                </DialogActions></>)}
        </Dialog>
    );

}