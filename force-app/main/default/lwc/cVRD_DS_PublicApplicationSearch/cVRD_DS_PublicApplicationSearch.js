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
];

export default class CVRD_DS_PublicApplicationSearch extends LightningElement {
    @track details;
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

    //used to Load the First Page. 
    first = true;
    //used to Load the Last Page. 
    last = false;

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

                    });
                    this.details = res;
                    this.alldata=[...this.details];
                    //this.totalPages=Math.ceil((this.details.length-1)/10);
                    this.updatePage();
                }
                else {
                    console.log('else->res::' + res);
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
        /*if(this.recordsearching){
            this.recordData = datalist.slice((this.currentPage-1)*10, (this.currentPage-1)*10+10);
            this.totalPages=Math.ceil((datalist.length-1)/10);
        }
        else{*/
        this.recordData = this.details.slice((this.currentPage-1)*10, (this.currentPage-1)*10+10);
        this.totalPages=Math.ceil((this.details.length-1)/10);
        }

    //}
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

    handleSearch(event){
        const searchKey = event.detail.value.toUpperCase();
        if(searchKey){
            if(this.alldata){
                this.details.splice(0, this.details.length);
                console.log('length->'+this.alldata.length);
                this.alldata.forEach(data => {
                    let valuesArray = Object.values(data);
                    for (let val of valuesArray) {
                        let strVal = String(val);
                        if (strVal) {
                            if (strVal.toUpperCase().includes(searchKey)) {
                                this.details.push(data);
                                break;
                            }
                        }
                    }
                });
                this.currentPage=1;
                this.updatePage();
                this.totalPages=Math.ceil((this.details.length-1)/10);
                this.first = true;
                this.last = (this.currentPage == this.totalPages);
                this.refreshButtons();
            }
        }
        else{
            this.details.splice(0, this.details.length);
            this.details=[...this.alldata];
            this.updatePage();
                
        }
    }
}