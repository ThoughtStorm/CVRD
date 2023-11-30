import { LightningElement } from 'lwc';
export default class CVRD_DS_DPAShowScreen extends LightningElement {

    showComment1=false;
    showComment2=false;
    showComment3=false;
    showError1=false;
    showError2=false;
    showError3=false;
    showReq=true;


    handleChange(event){
        console.log('Input1=>'+event.target.name);
        console.log('Input1=>'+event.target.checked);
        if(event.target.name==='input1'){
            console.log('Input1=>'+event.target.checked);
            this.showComment1=event.target.checked;
            this.showError1=false;
        }
        if(event.target.name==='input2'){
            console.log('Input2=>'+event.target.checked);
            this.showComment2=event.target.checked;
            this.showError2=false;
        }
        if(event.target.name==='input3'){
            console.log('Input3=>'+event.target.checked);
            this.showComment3=event.target.checked;
            this.showError3=false;
        }
        //console.log('Input2=>'+event.target.value);
    }

    handleBlur(event){
        console.log('inside id1=>'+event.target.name);
        console.log('this.showComment1=>'+this.showComment1);
        console.log('this.showComment2=>'+this.showComment2);
        console.log('this.showComment3=>'+this.showComment3);
        if(event.target.name==='DPA1' && this.showComment1==true){
            console.log('inside id1=>'+event.target.value);
            if(event.target.value==='' || event.target.value===undefined){
                this.showError1=true;
            }
            else{
                this.showError1=false;
            }
        }
        if(event.target.name==='DPA2' && this.showComment2==true){
            console.log('inside id2=>'+event.target.value);
            if(event.target.value==='' || event.target.value===undefined){
                this.showError2=true;
            }
            else{
                this.showError2=false;
            }
            
        }
        if(event.target.name==='DPA3' && this.showComment3==true){
            console.log('inside id3=>'+event.target.value);
            if(event.target.value==='' || event.target.value===undefined){
                this.showError3=true;
            }
            else{
                this.showError3=false;
            }
            
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