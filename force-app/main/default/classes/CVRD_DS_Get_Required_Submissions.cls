public class CVRD_DS_Get_Required_Submissions {
    
    @InvocableMethod
    public static List<string> getRequiredSubmission(List<string> recordId){
        List<MUSW__Submission__c> RequiredSubmissionList=new List<MUSW__Submission__c>();
        RequiredSubmissionList=[SELECT Id FROM MUSW__Submission__c WHERE MUSW__Application2__c IN: recordId AND MUSW__Status__c ='Pending' AND MUSW__Required__c=true];
    	system.debug('RequiredSubmissionList'+RequiredSubmissionList);
        if(!RequiredSubmissionList.isEmpty()){
            system.debug('inside if');
            return new List<String>{'false'};
        }
        else{
            system.debug('inside else');
            return new List<String>{'true'};
        }
    }
}