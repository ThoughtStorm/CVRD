import { LightningElement, api, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreatePDF extends NavigationMixin(LightningElement) {
    @api applicationRecords = [];
    saveAsPdf(){
        console.log(JSON.stringify(this.applicationRecords));
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                title: 'CVRD Application',
                attributes: {
                    url: 'https://cvrd--qa--c.sandbox.vf.force.com/apex/cVRD_Application_PDF_Generator?Id='+this.applicationRecords[0].Id
                },
                //console.log(url);
            })
            console.log(url);
    }    
}