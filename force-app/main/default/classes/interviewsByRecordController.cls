public with sharing class interviewsByRecordController {
    @AuraEnabled
    public static List<FlowInterview> getInterviews(String recordId) {
        return [ SELECT Id, InterviewLabel, Owner.Name, PauseLabel, LastModifiedDate, CurrentElement 
                FROM FlowInterview Where InterviewStatus = 'Paused'
                AND OwnerId =: Id.valueOf(recordId) ];
    }

    @AuraEnabled
    public static FlowInterview deleteInterview(Id interviewId) {
        FlowInterview interview = [Select Id from FlowInterview Where Id = :interviewId];
        delete interview;
        return interview;
    }

    @AuraEnabled
    public static String getUserName() {
        System.debug(userinfo.getUserId());
        return userinfo.getUserId();
  }
}