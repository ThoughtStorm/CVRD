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
            //submissionLinkMap.get(sub.name).add(str);
        }
        system.debug('check!!::'+SubmissionLinkMap);
        return SubmissionLinkMap;
    }
    
    public static Map<String,List<string>> getFileId2(Id ApplicationId) {
        Map<String,List<string>> SubmissionLinkMap=new Map<String,List<string>>();
        List<SubmissionDocument> SubmissionDocuments = new List<SubmissionDocument>();
        
        List<MUSW__Submission__c>sublist=[Select id,name,MUSW__View_Links__c from MUSW__Submission__C where MUSW__application2__C=:ApplicationId AND CVRD_DS_Publicly_Available__c=true ];
        
        for(MUSW__Submission__c sub:sublist){
            
            if(sub.MUSW__View_Links__c!=null && !SubmissionLinkMap.containskey(sub.name)){
                List<String> str=sub.MUSW__View_Links__c.split(',');	
                SubmissionLinkMap.put(sub.name,new List<string>(str));
            }
            
        }
        system.debug('check!!::'+SubmissionLinkMap);
        return SubmissionLinkMap;
    }

}