import { LightningElement, track, api } from 'lwc';

export default class LWCDatatableWithLookup extends LightningElement {
    @api Readonly=false;
    keyIndex = 0;
    @api Addresses = '';
    @api Parcel = [];
    @api InputAddresses = '';
    @api InputParcel = '';
    @api applicationlocationRecs = [];

    @track itemList = [];

    connectedCallback() {

        if (this.applicationlocationRecs.length>0) {
            console.log('inside if');
            for (var i = 0; i < this.applicationlocationRecs.length; i++) {
                this.itemList[i]={};
                this.itemList[i].id = i;
                this.itemList[i].address = this.applicationlocationRecs[i].MUSW__Address__c;
                this.itemList[i].parcel = this.applicationlocationRecs[i].MUSW__Parcel__c;
                this.keyIndex=i;
            }
        }
        else{
            this.itemList = 
            [{
                id: this.keyIndex,
                address: '',
                parcel: ''
            }];
        }
    }

    addRow() {
        ++this.keyIndex;
        var newItem = [{ id: this.keyIndex }];
        this.itemList = this.itemList.concat(newItem);
    }

    removeRow(event) {
        if (this.itemList.length >= 2) {
            this.itemList = this.itemList.filter(function (element) {
                return parseInt(element.id) !== parseInt(event.target.accessKey);
            });
        }
    }

    handleChangeAddress(event) {
        const id = event.target.dataset.id;

        this.itemList = this.itemList.map(item => {
            if (item.id == id) {
                return { ...item, address: event.target.value };
            }
            return item;
        });
    }

    handleChangeParcel(event) {
        const id = event.target.dataset.id;

        this.itemList = this.itemList.map(item => {
            if (item.id == id) {
                return { ...item, parcel: event.target.value };
            }
            return item;
        });
    }

    @api validate() {

        var isVal = true;
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            isVal = isVal && element.reportValidity();
        });
        if (isVal) {
            this.applicationlocationRecs = this.itemList.map(data => {
                return {
                    MUSW__Address__c: data.address,
                    MUSW__Parcel__c: data.parcel
                };
            });

            for(var i=0;i<this.applicationlocationRecs.length;i++){
                this.Parcel[i]=this.applicationlocationRecs[i].MUSW__Parcel__c;
            }
            return { isValid: true };
        }
        else {
            return {
                isValid: false,
                errorMessage: 'Please enter all the required fields'
            };
        }
    }
}