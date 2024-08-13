import { LightningElement,api,wire } from 'lwc';
import getDetails from '@salesforce/apex/cvrd_DS_GetProceedingDetails.getProceedingInformation'
export default class CVRD_DS_Proceeding_Details extends LightningElement {

    @api recordId;
    details;

    @wire(getDetails, { ApplicationId: '$recordId' })
    wiredDocuments({ error, data }) {
        if(data){
            this.details=data;
            console.log('data=>'+data);
        }else if (error) {
            this.error = error.body.message;
            console.log('error=>'+this.error);
        }
    }


}