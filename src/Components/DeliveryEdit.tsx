import React, {useEffect, useState} from "react";
import {getAllDocs} from "../firebase/firebaseUtils";
import {ImageListItem, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import DeliveryForm from "./DeliveryForm";
import {getStatusColor} from "../utils";


const DELIVERIES_COLLECTION_NAME = 'deliveries';

const DeliveryManagement = ({ user }:any) => {
    const [documents, setDocuments] :any= useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const retrieveDocuments = async () => {
        const docs = await getAllDocs(DELIVERIES_COLLECTION_NAME);
        const docsDataWithId:any = docs.map(doc=> {
            return {...doc.data(), docId: doc.id}
        })
        const userDocs = docsDataWithId.filter((doc:any) => doc.metadata.createdBy === user.email)
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
        const documentData = selectedDocument['data'];
        const docId = selectedDocument['docId']

        return (
            <Paper style={{ padding: 20 }}>
                <DeliveryForm user={user} defaultFormValues={documentData} docId={docId} setSelectedDocument={setSelectedDocument}/>
            </Paper>
        );
    };




    if(!documents){
        return null
    }
    return (
        <div style={{display: 'flex', justifyContent:'center'}}>
            {!selectedDocument ? <Paper style={{padding: 20}}>
                <Typography variant="h6" align="center">Deliveries</Typography>
                <List style={{height: '500px', overflowY: 'auto'}}>
                    {documents.map((document:any, index:number) => (
                        <ListItem button key={index} onClick={() => handleDocumentClick(document)}>
                            <ListItemText primary={`From: ${document.data.from} To: ${document.data.to}`} secondary={<span style={getStatusColor(document.data.status)}>{document.data.status}</span>}/>
                        </ListItem>
                    ))}
                </List>


            </Paper>: null}

            {renderDocumentDetails()}
        </div>
    );
};

export default DeliveryManagement;


