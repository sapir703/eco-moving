import React, {useEffect, useState} from 'react';
import {Typography, List, ListItem, ListItemText, Paper, ImageListItem} from '@mui/material';
import {getAllDocs} from "../firebase/firebaseUtils";
import {getStatusColor} from "../utils";

const ComplaintList = ({ user }:any) => {
    const [documents, setDocuments] :any= useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const retrieveDocuments = async () => {
        const docs:any = await (await getAllDocs('complaints')).map(doc => {
            return {...doc.data(), id: doc.id}
        });
        const userDocs = docs.filter((doc:any) => doc.metadata.createdBy === user.email)
        const sortedDocuments = userDocs.sort((a:any, b:any) => {
            const aDate :any = new Date(a?.metadata?.createdAt?.seconds)
            const bDate :any= new Date(b?.metadata?.createdAt?.seconds)
            return  bDate - aDate;
        })
        setDocuments(sortedDocuments);
    }
    useEffect(() => {
        retrieveDocuments()
    },[])

    const handleDocumentClick = (document:any) => {
        setSelectedDocument(document);
    };

    const renderDocumentDetails = () => {
        if (!selectedDocument) return null;
        const documentData:any = selectedDocument['data'];
debugger
        return (
            <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Complaint Details</Typography>
                <Typography variant="subtitle1">Delivery Date</Typography>
                <Typography variant="body2">{new Date(documentData.deliveryDate?.seconds*1000).toLocaleDateString(navigator.language,{hour: '2-digit', minute:'2-digit'})}</Typography>
                <Typography variant="subtitle1">From</Typography>
                <Typography variant="body2">{documentData.from}</Typography>
                <Typography variant="subtitle1">To</Typography>
                <Typography variant="body2">{documentData.to}</Typography>
                <Typography variant="subtitle1">Name Of Movers</Typography>
                <Typography variant="body2">{documentData.nameOfMovers}</Typography>
                <Typography variant="subtitle1">Complaint Details</Typography>
                <Typography variant="body2">{documentData.complaintDetails}</Typography>
                <Typography variant="subtitle1">Decision</Typography>
                <Typography variant="body2">{documentData.decision}</Typography>
                <img src={documentData.imageDownloadUrl} loading="lazy"/>
            </Paper>
        );
    };



    if(!documents){
        return null
    }
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            <Paper style={{padding: 20}}>
                <Typography variant="h6" align="center">Complaints</Typography>
                <List style={{height: '50vh', overflowY: 'auto'}}>
                    {documents.map((document:any, index:number) => (
                        <ListItem button key={index} onClick={() => handleDocumentClick(document)}>
                            <ListItemText primary={`${document.id}`} secondary={
                                <span style={getStatusColor(document.data.status)}>{document.data.status}</span>}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {renderDocumentDetails()}
        </div>
    );
};

export default ComplaintList;
