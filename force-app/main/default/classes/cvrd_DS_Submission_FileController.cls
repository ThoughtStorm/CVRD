public without sharing class cvrd_DS_Submission_FileController {
    
    public class SubmissionDocument {
        @AuraEnabled public String contactName { get; set; }
        @AuraEnabled public id document { get; set; }
    }
    
    @AuraEnabled(cacheable=true)
    public static Map<String,List<String>> getFileId(Id ApplicationId) {
        Map<String,List<String>> SubmissionLinkMap=new Map<String,List<String>>();
        List<SubmissionDocument> SubmissionDocuments = new List<SubmissionDocument>();
        
        List<MUSW__Submission__c>sublist=[Select id,name,MUSW__View_Links__c from MUSW__Submission__C where MUSW__application2__C=:ApplicationId AND CVRD_DS_Publicly_Available__c=true ];
        
        for(MUSW__Submission__c sub:sublist){
            
            if(sub.MUSW__View_Links__c!=null && !SubmissionLinkMap.containskey(sub.name)){
                List<String> str=sub.MUSW__View_Links__c.split(',');
                SubmissionLinkMap.put(sub.name,new List<string>(str));
            }
        }
        return SubmissionLinkMap;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<String> getFileId2(Id ApplicationId) {
                List<String> publicLinkList=new List<String>();
        List<MUSW__Application2__c> appRecord=[SELECT Id,MUSW__Description__c,CVRD_DS_Available_for_Public_Notice__c FROM MUSW__Application2__c where Id=:ApplicationId AND CVRD_DS_Available_for_Public_Notice__c=true];
        if(!appRecord.isempty()){      
            publicLinkList.add(appRecord[0].MUSW__Description__c);
            publicLinkList.add('true');
            return publicLinkList;
        }

        return publicLinkList;
    }

}