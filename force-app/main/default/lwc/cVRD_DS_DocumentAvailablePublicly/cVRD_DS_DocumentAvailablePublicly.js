import { LightningElement, api, wire } from 'lwc';
import getFileId from '@salesforce/apex/cvrd_DS_Submission_FileController.getFileId';
import getFileId2 from '@salesforce/apex/cvrd_DS_Submission_FileController.getFileId2';

export default class CVRD_DS_DocumentAvailablePublicly extends LightningElement {
    @api recordId;
    publicLinkDoc;
    showPublicLink=false;
    documents;
    error;
    bracketValue;
    errorMessage;
    @wire(getFileId, { ApplicationId: '$recordId' })
    wiredDocuments({ error, data }) {
        if (data) {
            this.documents = this.transformDocumentsData(data);
            if(this.documents!=null && this.documents!=''){
                this.error = undefined;
            }
            else{
                this.documents = undefined;
            this.errorMessage = 'No submission documents are available';
            }
        } else if (error) {
            this.error = error.body.message;
            this.documents = undefined;
        }
    }
    @wire(getFileId2, { ApplicationId: '$recordId' })
    wiredDocuments({ error, data }) {
        if (data) {
            if (data != null && data != '') {
            this.publicLinkDoc=data[0];
            this.showPublicLink=data[1];
            }

        } else if (error) {
            this.error = error.body.message;
            this.documents = undefined;
        }
    }

    transformDocumentsData(documentsMap) {
        const documentsArray = [];
        for (const submissionName in documentsMap) {       
            if (documentsMap.hasOwnProperty(submissionName)) {
                const documentEntries = documentsMap[submissionName];
                const urls = documentEntries.map(entry => {
                                let name = entry.match(/\(([^)]+)\)/);
                                let url = entry.split(')').slice(1).join(')').trim()
                                return {
                                    title: name[1],
                                    url: url
                                };
                            });
                            documentsArray.push({
                                submissionName: submissionName,
                                urls: urls
                            });
            }
        }
        return documentsArray;
    }

    handleDownload(event) {
        const url = event.target.dataset.url;
        window.open(url);
    }
}