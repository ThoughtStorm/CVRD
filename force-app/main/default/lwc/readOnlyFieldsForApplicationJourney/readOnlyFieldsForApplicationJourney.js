import { LightningElement, api, track, wire } from 'lwc';

export default class ReadOnlyFieldsForApplicationJourney extends LightningElement {
    @api fieldLabel;
    @api fieldValue;
    @api fieldType;
    @api fieldLevelHelp;

   isCheckboxField = false;
   isPhoneField = false;
   isString = false;

    connectedCallback() {

        if (this.fieldType != null && (this.fieldType=='toggle' ||  this.fieldType=='checkbox' )) {
            this.isCheckboxField = true;
        }
        else if (this.fieldType != null && this.fieldType=='tel'){
            this.isPhoneField = true;
        }
        else if (this.fieldType != null && (this.fieldType=='text')){
            this.isString = true;
        }
    }
}