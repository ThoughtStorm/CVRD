public class PrintJobPDFController {
    public String Id {get;set;}
    public String recordId;
    public List<MUSW__Application2__c> getApplicationList() {
        recordId = ApexPages.currentPage().getParameters().get('Id');
        System.debug(recordId);
        List<MUSW__Application2__c> appList = [Select Id, Name, MUSW__Type2__c, CVRD_DS_Description__c,
        MUSW__Applicant__c, MUSW__Status__c, CVRD_DS_Sub_Type__c, CVRD_DS_Related_Application__c, MUSW__Phase__c, MUSW__Application2__c.MUSW__Applicant__r.name From MUSW__Application2__c Where Id = :recordId];
        System.debug('Size : ' +appList.size());
        return appList;
    }

    public List<MUSW__Submission__c> getSubmissionList(){
        List<MUSW__Submission__c> subList = [Select Name, MUSW__Status__c  From MUSW__Submission__c Where MUSW__Application2__c = :recordId];
        return subList;
    }
    
    public List<MUSW__Application_Contact__c> getOwnerList(){
        List<MUSW__Application_Contact__c> ownerList = [Select Id, Name, MUSW__First_Name__c, MUSW__Last_Name__c, CVRD_DS_Primary_Owner__c From MUSW__Application_Contact__c Where MUSW__Application__c = :recordId];
        return ownerList;
    }

    public List<MUSW__Application_Location__c> getPropertyInfoList(){
        List<MUSW__Application_Location__c> pidList = [Select Name, MUSW__Parcel__r.Name, MUSW__Address__r.Name From MUSW__Application_Location__c Where MUSW__Application__c= :recordId];
        return pidList;
    }
}