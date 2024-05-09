import { LightningElement, track } from 'lwc';
import getAppList from '@salesforce/apex/CVRD_DS_PublicSearchController.getAppList';

const columns = [
    { label: 'Electoral Area', fieldName: 'CVRD_DS_Parcel_Electoral_Area__c' },
    {
        label: 'Date Received', fieldName: 'CreatedDate', type: 'date', typeAttributes: {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        }
    },
    { label: 'File No.', fieldName: 'Name' },
    { label: 'Application Type', fieldName: 'MUSW__Type2__c' },
    { label: 'Address', fieldName: 'MUSW__Address__r.name' },
    { label: 'Applicant', fieldName: 'MUSW__Applicant__r.name' },
    { label: 'Status', fieldName: 'MUSW__Status__c' },
    { label: 'Purpose', fieldName: 'MUSW__Status__c' },
];

export default class CVRD_DS_PublicApplicationSearch extends LightningElement {
    @track data;
    @track error;
    @track columns = columns;
    whereClause = '';
    errorMessage = '';
    dynamicQuery = '';
    area='none';
    app_number;
    address;
    pid;
    flag = false;
    get options() {
        return [
            { label: '--None--', value: 'none' },
            { label: 'A', value: 'A' },
            { label: 'B', value: 'B' },
            { label: 'C', value: 'C' },
            { label: 'D', value: 'D' },
            { label: 'E', value: 'E' },
            { label: 'F', value: 'F' },
            { label: 'G', value: 'G' },
            { label: 'H', value: 'H' },
            { label: 'I', value: 'I' },
        ];
    }

    handleApplication(event) {
        this.app_number = event.detail.value;
        //this.whereClause += `Name LIKE '%${this.app_number}%' AND `;
    }

    handleAddress(event) {
        this.address = event.detail.value;

    }

    handlePID(event) {
        this.pid = event.detail.value;
        //this.whereClause += `MUSW__Parcel__c LIKE '%${event.detail.value}%' AND `;
    }

    handleCombo(event) {
        if (event.detail.value != 'none') {
            console.log('Inside if');
            this.area = event.detail.value;
            console.log('Inside if'+this.area);
        }
        //this.whereClause += `CVRD_DS_Parcel_Electoral_Area__c LIKE '%${event.detail.value}%' AND `;
    }

    handleSearch() {
        if (this.app_number != null) {
            this.whereClause += `Name LIKE '%${this.app_number}%' AND `;
            this.flag = true;
        }
        if (this.address != null) {
            this.whereClause += `MUSW__Address__r.name LIKE '%${this.address}%' AND `;
            this.flag = true;
        }
        if (this.pid != null) {
            this.whereClause += `MUSW__Parcel__r.name LIKE '%${this.pid}%' AND `;
            this.flag = true;
        }
        if (this.area != null) {
            this.whereClause += `CVRD_DS_Parcel_Electoral_Area__c LIKE '%${this.area}%' AND `;
            this.flag = true;
        }
        if (this.whereClause.endsWith(' AND ')) {
            this.whereClause = this.whereClause.slice(0, -5);
        }
        this.dynamicQuery = 'SELECT Id, Name,CreatedDate,MUSW__Applicant__r.name, MUSW__Status__c,MUSW__type2__c ,CVRD_DS_Parcel_Electoral_Area__c,MUSW__Address__r.name FROM MUSW__Application2__c WHERE ' + this.whereClause;
        if (this.flag=true) {
            console.log(this.dynamicQuery);
            getAppList({ query: this.dynamicQuery })
                .then(res => {
                    console.log('res::' + res);
                    if (res != null && res != '') {
                        console.log('if condition res::' + res);
                        this.data = res;
                    }
                    else {
                        console.log('else->res::' + res);
                        this.data = undefined;
                        this.errorMessage = 'No Records Found';
                    }

                })
                .catch((error) => {
                    this.error = error;
                    cosnole.log(this.error);
                });
            this.dynamicQuery = '';
            this.whereClause = '';
        }
    }

    handleCancel() {
        this.data = undefined;
        this.app_number = undefined;
        this.address = undefined;
        this.pid = undefined;
        this.area = undefined;
        this.whereClause = '';
        this.errorMessage = '';
        this.dynamicQuery = '';
    }
}