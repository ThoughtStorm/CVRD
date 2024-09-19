import { LightningElement,api  } from 'lwc';
import { FlowNavigationNextEvent,FlowNavigationBackEvent} from 'lightning/flowSupport';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import GoogleRecaptchaPhoto from '@salesforce/resourceUrl/GoogleRecaptchaPhoto';

export default class CVRD_DS_RepatchaLwc extends LightningElement {
    @api
    subject;
    recaptchaPhotoUrl = GoogleRecaptchaPhoto;
    
    
    handleSubjectChange(event) {
        this.subject = event.target.checked;
    }

    @api 
    validate(){
        if(this.subject){
            return { isValid: true };
        }else{
            return {
               
                isValid: false,
                errorMessage: "Please authorize the recapatch by selecting the checkbox."
            }
        }   
    }
    

}