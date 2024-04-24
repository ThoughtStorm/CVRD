public class CVRD_DS_PublicSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<MUSW__Application2__c> getAppList(String query) {
        
        return database.query(query);
    }

}