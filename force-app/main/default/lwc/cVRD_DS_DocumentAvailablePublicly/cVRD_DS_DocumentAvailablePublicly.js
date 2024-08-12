import { LightningElement, api, wire } from 'lwc';
import getFileId from '@salesforce/apex/cvrd_DS_Submission_FileController.getFileId';

export default class CVRD_DS_DocumentAvailablePublicly extends LightningElement {
    @api recordId;
    documents;
    error;
    bracketValue;
    @wire(getFileId, { ApplicationId: '$recordId' })
    wiredDocuments({ error, data }) {
        if (data) {
            this.documents = this.transformDocumentsData(data);
            this.error = undefined;
            console.log(this.documents);
        } else if (error) {
            this.error = error.body.message;
            this.documents = undefined;
        }
    }

    transformDocumentsData(documentsMap) {
        const documentsArray = [];
        for (const submissionName in documentsMap) {
            if (documentsMap.hasOwnProperty(submissionName)) {
                let bracketValue = JSON.stringify(documentsMap[submissionName]);
                let name = bracketValue.match(/\(([^)]+)\)/);
                let url = bracketValue.split(')').slice(1).join(')').trim()
                url = url.slice(0, -2);
                console.log(url);
                documentsArray.push({
                    submissionName: submissionName,
                    urls: url,
                    title: name[1]
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