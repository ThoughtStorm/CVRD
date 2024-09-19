public class CVRD_DS_PublicSearchController {
  
    @AuraEnabled(cacheable=true)
    public static List<MUSW__Application2__c> getAppList(String electorialArea) {
       String str='SELECT Id,name,MUSW__Applicant__r.Name,toLabel(MUSW__Type2__c),MUSW__Address__r.Name , MUSW__Description__c FROM MUSW__Application2__c WHERE CVRD_DS_Parcel_Electoral_Area__c = \''+electorialArea+'\' ORDER BY Createddate DESC';
        
        return database.query(str);
    }

}