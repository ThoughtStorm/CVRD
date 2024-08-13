public without sharing class cvrd_DS_GetProceedingDetails {

    @AuraEnabled(cacheable=true)
    public static List<MUSW__Proceeding_Agenda_Item__c> getProceedingInformation(Id ApplicationId){
        List<MUSW__Proceeding_Agenda_Item__c> PAIList=[Select MUSW__Proceeding__r.MUSW__Type__c,MUSW__Proceeding__r.MUSW__Scheduled_Date__c,MUSW__Proceeding__c,CVRD_DS_Outcome__c,CVRD_DS_Public_URL__c FROM MUSW__Proceeding_Agenda_Item__c where MUSW__Application__c=:Applicationid];
        return PAIList;
    }
}