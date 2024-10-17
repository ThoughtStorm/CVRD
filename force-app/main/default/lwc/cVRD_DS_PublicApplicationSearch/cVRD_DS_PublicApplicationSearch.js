import { LightningElement, track,api } from 'lwc';
import getAppList from '@salesforce/apex/CVRD_DS_PublicSearchController.getAppList';

const columns = [
    {
        label: 'Application Number',
        fieldName: 'AppLink',
        type: 'url',
        typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' },
        sortable: true
    },
    { label: 'Application Type', fieldName: 'MUSW__Type2__c', sortable: true },
    { label: 'Applicant', fieldName: 'ApplicantName', type: 'string', sortable: true },
    { label: 'Civic Address', fieldName: 'AddressName', type: 'string', sortable: true },
    { label: 'Open for Commenting', fieldName: 'CVRD_DS_Available_for_Public_Notice__c', type: 'boolean',sortable: true },
];

export default class CVRD_DS_PublicApplicationSearch extends LightningElement {
    @track details;
    filterData;
    area='none';
    recordData;
    @api area_val;
    @track columns = columns;
    errorMessage = '';
    @track sortBy;
    @track sortDirection;
    alldata;
    currentPage = 1;
    recordsearching=false;
    pageData = [];
    totalPages; 
    first = true; 
    last = false;

    get options() {
        return [
            { label: '--None--', value: 'none' },
            { label: 'Agricultural Land Reserve', value: 'Agricultural Land Reserve' },
            { label: 'Board of Variance', value: 'Board of Variance' },
            { label: 'Cannabis Retail Licence', value: 'Cannabis Retail Licence' },
            { label: 'Covenant Amendment/Discharge', value: 'Covenant Amendment/Discharge' },
            { label: 'Crown Land Referrals', value: 'Crown Land Referrals' },
            { label: 'Development Permit', value: 'Development Permit' },
            { label: 'Development Variance Permit', value: 'Development Variance Permit' },
            { label: 'Flood Management Bylaw Exemption', value: 'Flood Management Bylaw Exemption' },
            { label: 'Liquor Licence Referrals', value: 'Liquor Licence Referrals' },
            { label: 'Minimum Frontage Exception', value: 'Minimum Frontage Exception' },
            { label: 'OCP, Zoning or Land Use Bylaw Amendment', value: 'OCP, Zoning or Land Use Bylaw Amendment' },
            { label: 'Phased Development Agreement', value: 'Phased Development Agreement' },
            { label: 'Strata Conversion', value: 'Strata Conversion' },
            { label: 'Subdivision (Referral)', value: 'Subdivision (Referral)' },
            { label: 'Telecommunication Antenna Structure', value: 'Telecommunication Antenna Structure' },
            { label: 'Temporary Use Permit', value: 'Temporary Use Permit' }
        ];
    }

    connectedCallback() {
        getAppList({ electorialArea: this.area_val })
            .then(res => {

                if (res != null && res != '') {
                    res = JSON.parse(JSON.stringify(res));
                    res.forEach(data => {
                        data.AppLink = '/s/open-application-details?id=' + data.Id;
                        if (data.MUSW__Applicant__c != undefined) {
                            data.ApplicantName = data.MUSW__Applicant__r.Name;
                        }
                        if (data.MUSW__Address__c != undefined) {
                            data.AddressName = data.MUSW__Address__r.Name;
                        }
                        if(data.CVRD_DS_Available_for_Public_Notice__c){
                            data.PublicNotice='Commenting Available for Public Notice';
                        }
                        if(!data.CVRD_DS_Available_for_Public_Notice__c){
                            data.PublicNotice='Commenting Not Available for Public Notice';
                        }

                    });
                    this.details = res;
                    console.log('detail Length->'+this.details.length);
                    this.alldata=[...this.details];
                    this.filterData=[...this.details];
                    console.log('filter Length->'+this.filterData.length);
                    this.updatePage();
                }
                else {
                    this.details = undefined;
                    this.errorMessage = 'No Records Found';
                }
            })
            .catch((error) => {
                this.error = error;
                cosnole.log(this.error);
            }); 
    }

    updatePage() {
        this.recordData = this.details.slice((this.currentPage-1)*10, (this.currentPage-1)*10+10);
        this.totalPages=Math.ceil((this.details.length-1)/10);
    }

    doSorting(event) {      
        this.sortBy = event.detail.fieldName; 
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection);
        this.updatePage();
    }

    sortData(fieldname, direction) {
        if(fieldname=='AppLink'){
            fieldname='Name';
        }
        
        let parseData = JSON.parse(JSON.stringify(this.details));
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1 : -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });
        this.details = parseData;  
    }

    handleNext(){
        this.currentPage++;
        this.first = false;
        this.last = (this.currentPage == this.totalPages); 
        this.updatePage();
        this.refreshButtons(); 
    }

    handlePrevious(){
        this.currentPage--;
        this.first = (this.currentPage == 1);
        this.last = (this.currentPage == this.totalPages); 
        this.updatePage();
        this.refreshButtons(); 
    }

    handleFirst(){
        this.currentPage = 1; 
        this.first = true;
        this.last=false;
        this.updatePage();
        this.refreshButtons();
    }

    handleLast(){
        this.currentPage = this.totalPages;
        this.first = false;
        this.last = true; 
        this.updatePage();
        this.refreshButtons();
    }

    handleCombo(event){
        this.area = event.detail.value;
        if (this.area != 'none') {
            this.details.splice(0, this.details.length);
            this.alldata.forEach(data => {
                if (this.area == data.MUSW__Type2__c) {
                    this.details.push(data);
                }
            });
        }
        else if(this.area == 'none'){
            this.details.splice(0, this.details.length);
            this.details=[...this.alldata];
        }
        this.filterData=[...this.details];
        this.updatePage();
    }

    handleSearch(event) {
        let searchList;
            searchList=[...this.filterData];
  
            const searchKey = event.detail.value.toUpperCase();
            if (searchKey) {
                if (this.alldata) {
                    this.details.splice(0, this.details.length);
                    searchList.forEach(data => {
                        let valuesArray = Object.values(data);
                        //for (let val of valuesArray) {
                            let strVal = String(valuesArray[1]);
                            //console.log('val->'+strVal);
                            if (strVal) {
                                if (strVal.toUpperCase().includes(searchKey)) {
                                    this.details.push(data);
                                    //break;
                                }
                            }
                        //}
                    });
                    this.currentPage = 1;
                    this.updatePage();
                    this.totalPages = Math.ceil((this.details.length - 1) / 10);
                    this.first = true;
                    this.last = (this.currentPage == this.totalPages);
                    this.refreshButtons();
                }
            }
            else {
                this.details.splice(0, this.details.length);
                this.details = [...this.filterData];
                this.updatePage();

            }
    }

    refreshButtons() {
        this.template.querySelectorAll('.icon_button').forEach(button => {
            button.classList.remove('icon_button_disabled');
        });
        if(this.last) {
            this.template.querySelector('[role=next]').classList.add('icon_button_disabled');
            this.template.querySelector('[role=last]').classList.add('icon_button_disabled');
        }
        if(this.first) {
            this.template.querySelector('[role=first]').classList.add('icon_button_disabled');
            this.template.querySelector('[role=previous]').classList.add('icon_button_disabled');
        }
    }
}