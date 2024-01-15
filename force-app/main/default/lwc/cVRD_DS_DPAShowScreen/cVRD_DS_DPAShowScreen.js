import { LightningElement, api,track } from 'lwc';
import DPAExemptURL from '@salesforce/label/c.CVRD_DS_DPA_Exemption_Applicable';
export default class CVRD_DS_DPAShowScreen extends LightningElement {

    @api DPA_Data='';
    DPAExempturl=DPAExemptURL;
    DPAList=[];
    resetCommentData=[];
    @track CommentData=[];
    hasEmptyComment=false;
    showSave=true;
    @api commentDataArray=[];
    @api disabledShow=false;
    @api nonExemptData='';

    connectedCallback() {

        this.DPAList = this.DPA_Data.toString().split(';');
        for (var i = 0; i < this.DPAList.length; i++) {
            this.CommentData[i] = {};

            this.CommentData[i].id = i;
            this.CommentData[i].Name = this.DPAList[i];
            this.CommentData[i].Exempt = false;
            this.CommentData[i].commentEnabled = true;
            this.CommentData[i].Explaination = '';
        }
        if (this.commentDataArray) {
            this.CommentData.forEach(commentObj=>{
                this.commentDataArray.forEach(dataObj=>{
                    if(commentObj.Name===dataObj.CVRD_DS_DPA_Name__c){
                        commentObj.Explaination=dataObj.CVRD_DS_Applicant_Comment__c;
                        commentObj.Exempt=true;
                        commentObj.commentEnabled=false;
                    }
                });
            });
        }
        else {

        }
    }

    handleExemptionChange(event) {
        const id = event.target.dataset.id;
        const ischecked = event.target.checked;

        this.CommentData = this.CommentData.map(item => {
            if (item.id == id) {
                console.log('inside if con++' + ischecked);
                return { ...item, commentEnabled: !ischecked, Exempt:ischecked };
            }
            return item;
        });

        if(!ischecked){
            this.CommentData = this.CommentData.map(item => {
            if (item.id == id) {
                console.log('inside if con++' + ischecked);
                return { ...item, Explaination:'' };
            }
            return item;
        });
        }

        /*for (var i = 0; i < this.CommentData.length; i++) {
            if (this.CommentData[i].Exempt == true) {
                this.showSave = false;
                break;
            }
            else {
                this.showSave = true;
            }
        }*/
    }

    handleCommentValueChange(event){
        const id = event.target.dataset.id;

        this.CommentData=this.CommentData.map(item=>{
            if(item.id==id){
                console.log('this.hasEmptyComment=>'+item.Explaination);
                return {...item,Explaination:event.target.value };
            }
            return item;
        });

    }

    /*handleSave(){
        this.commentDataArray = this.CommentData.filter(data => data.Exempt == true).map(data => {
                return {
                    Name: data.Name,
                    CVRD_DS_Applicant_Comment__c: data.Comment
                };
            });
            //console.log('commentDataArray=>'+commentDataArray);
           // const event = new CustomEvent('commentDataCollation', {
            //    detail: { commentDataArray }
           // });
            //console.log('event details=>'+event);
            //this.dispatchEvent(event);
    }*/

    /*handleClear(){
        this.CommentData= this.resetCommentData.map(x=>x);
    }*/

    @api validate() {
        
        this.hasEmptyComment = this.CommentData.some(item => item.Exempt && (!item.Explaination || item.Explaination.trim() === ''));
        if (this.hasEmptyComment) {
            this.commentDataArray = this.CommentData.filter(data => data.Exempt == true).map(data => {
                return {
                    CVRD_DS_DPA_Name__c: data.Name,
                    CVRD_DS_Applicant_Comment__c: data.Explaination
                };
            });
            /*for(var i=0;i<this.CommentData.length;i++){
                if(!this.CommentData.Exempt){
                    this.nonExemptData=this.CommentData.Name+';';
                }
            }
            this.nonExemptData=this.nonExemptData.slice(0, this.nonExemptData.length-1);
            console.log('Non Exemption'+this.nonExemptData);*/
            return {
                isValid: false,
                errorMessage: 'Please add the explanation'
            };
        } else {
            this.commentDataArray = this.CommentData.filter(data => data.Exempt == true).map(data => {
                return {
                    CVRD_DS_DPA_Name__c: data.Name,
                    CVRD_DS_Applicant_Comment__c: data.Explaination
                };
            });
            for(var i=0;i<this.CommentData.length;i++){
                console.log('this.CommentData.Exempt'+this.CommentData[i].Exempt);
                if(this.CommentData[i].Exempt==false){
                    console.log('inside');
                    this.nonExemptData=this.nonExemptData+this.CommentData[i].Name+';';
                }
            }
            this.nonExemptData=this.nonExemptData.slice(0, this.nonExemptData.length-1);
            console.log('Non Exemption'+this.nonExemptData);
            return { isValid: true };
        }
    }

    /*handleChange(event){
        console.log('Input1=>'+event.target.name);
        
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
    }*/
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