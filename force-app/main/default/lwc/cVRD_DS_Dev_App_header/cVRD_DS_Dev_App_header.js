import { LightningElement } from 'lwc';
import IMAGES from "@salesforce/resourceUrl/CVRD_Logo";
import INSTA from "@salesforce/resourceUrl/CVRD_Logo_Icon";
import InstaURL from '@salesforce/label/c.CVRD_DS_Instagram_Link';

export default class CVRD_DS_Dev_App_header extends LightningElement {
    company_logo=IMAGES;
    Logo_Insta=INSTA;
    Instalink=InstaURL;
}