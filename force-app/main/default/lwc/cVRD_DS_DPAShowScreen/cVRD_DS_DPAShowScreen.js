import { LightningElement, api } from 'lwc';
export default class CVRD_DS_DPAShowScreen extends LightningElement {

    showComment1=false;
    showComment2=false;
    showComment3=false;
    showError1=false;
    showError2=false;
    showError3=false;
    showReq=true;
    @api dpaComment1='';
    @api dpaComment2='';
    @api dpaComment3='';
    @api exemptDPA1=false;
    @api exemptDPA2=false;
    @api exemptDPA3=false;


    handleChange(event){
        console.log('Input1=>'+event.target.name);
        console.log('Input1=>'+event.target.checked);
        if(event.target.name==='input1'){

            this.exemptDPA1=event.target.checked;
            this.showComment1=event.target.checked;
            this.showError1=false;
        }
        if(event.target.name==='input2'){

            this.exemptDPA2=event.target.checked;
            this.showComment2=event.target.checked;
            this.showError2=false;
        }
        if(event.target.name==='input3'){

            this.exemptDPA3=event.target.checked;
            this.showComment3=event.target.checked;
            this.showError3=false;
        }
        //console.log('Input2=>'+event.target.value);
    }

    handlecommentchange(event){

        if(event.target.name==='DPA1'){
            this.dpaComment1=event.target.value;
        }
        if(event.target.name==='DPA2'){
            this.dpaComment2=event.target.value;
        }
        if(event.target.name==='DPA3'){
            this.dpaComment3=event.target.value;
        }
    }

    handleBlur(event){
        if(event.target.name==='DPA1' && this.showComment1==true){

            if(event.target.value==='' || event.target.value===undefined){
                this.showError1=true;

            }
            else{
                this.showError1=false;
            }
        }
        if(event.target.name==='DPA2' && this.showComment2==true){

            if(event.target.value==='' || event.target.value===undefined){
                this.showError2=true;
            }
            else{
                this.showError2=false;
            }
            
        }
        if(event.target.name==='DPA3' && this.showComment3==true){

            if(event.target.value==='' || event.target.value===undefined){
                this.showError3=true;
            }
            else{
                this.showError3=false;
            }
            
        }
    }

    @api validate() {

        // If the component is invalid, return the isValid parameter 
        // as false and return an error message. 
        if (((this.dpaComment1 === '' || this.dpaComment1 === undefined) && this.exemptDPA1 === true) ||
            ((this.dpaComment2 === '' || this.dpaComment2 === undefined) && this.exemptDPA2 === true) ||
            ((this.dpaComment3 === '' || this.dpaComment3 === undefined) && this.exemptDPA3 === true)) {
            return {
                isValid: false,
                errorMessage: 'Please add comment'
            };
        }
        else {
            return { isValid: true };
        }
    }
    /*handleBlur1(event){
            if(event.target.value==='' || event.target.value===undefined){
                this.showError1=true;
            }
            else{
                this.showError1=false;
            }
    }
    handleBlur2(event){
            if(event.target.value==='' || event.target.value===undefined){
                this.showError2=true;
            }
            else{
                this.showError2=false;
            }
            
    }
    handleBlur3(event){
            console.log('inside id3=>'+event.target.value);
            if(event.target.value==='' || event.target.value===undefined){
                this.showError3=true;
            }
            else{
                this.showError3=false;
            }
            
    }*/
}