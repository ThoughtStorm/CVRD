public class CVRD_DS_CreateSubmissions {
    
    //public static Id Development_Permit=Schema.SObjectType.MUSW__Application2__c.getRecordTypeInfosByName().get('Development Permit').getRecordTypeId();
    
    @InvocableMethod
    public static void createSubmissionRecords(List<ID> ids) {
        try{
            Map<Id,List<String>> selectedDPAs=new Map<Id,List<String>>();
            List<MUSW__Submission__c> SubmissionCreate=new List<MUSW__Submission__c>();
            
            List<MUSW__Application2__c> appList=[SELECT Id,MUSW__Type2__c,MUSW__Phase__c,MUSW__Status__c,CVRD_DS_Selected_DPAs__c,CVRD_DS_Non_Exempted_DPAs__c,recordtypeId,Agent_Authorization__c FROM MUSW__Application2__c WHERE Id IN: ids];        
            
            List<MUSW__Template_Object_Mapping__c> FilterObjMapping=[SELECT Id FROM MUSW__Template_Object_Mapping__c WHERE MUSW__Template_Object_Name__c='MUSW__Master_Submission_List__c' AND MUSW__Target_Object_Name__c='MUSW__Application2__c'];
            
            List<MUSW__Master_Submission_List__c> submissiontempList=[SELECT Id,Name,MUSW__Application_Phases__c,MUSW__Application_Statuses__c,MUSW__Application_Types__c,CVRD_DS_DPA_Types__c,MUSW__Submission_Description__c,MUSW__Required__c,MUSW__Submission_Name__c
                                                                      FROM MUSW__Master_Submission_List__c WHERE MUSW__Filter_Mapping__c=:FilterObjMapping AND MUSW__Active__c=true];                  
            
            for(MUSW__Master_Submission_List__c Sub_Temp:submissiontempList){
                List<String> tempDPAs=Sub_Temp.CVRD_DS_DPA_Types__c!=null?Sub_Temp.CVRD_DS_DPA_Types__c.split(';'):new List<String>();
                
                for(MUSW__Application2__c app:appList){
                    
                    List<string> SelectedDPA=app.CVRD_DS_Non_Exempted_DPAs__c!=null?app.CVRD_DS_Non_Exempted_DPAs__c.split(';'):new List<string>();
                    boolean flag=false;
                    if(Sub_Temp.MUSW__Application_Phases__c==app.MUSW__Phase__c && Sub_Temp.MUSW__Application_Statuses__c==app.MUSW__Status__c 
                       && Sub_Temp.MUSW__Application_Types__c==app.MUSW__Type2__c){
                           
                           system.debug('submission Template::'+SelectedDPA);
                           system.debug('Application Object::'+tempDPAs);
                           if(app.MUSW__Type2__c=='Development_Permit'){
                               system.debug('Inside if condition');
                               for(String strTemp:tempDPAs){
                                   if(SelectedDPA.contains(strTemp) && !flag){
                                       //system.debug('Sub_Temp::::'+Sub_Temp.Name);
                                       MUSW__Submission__c submission=new MUSW__Submission__c();
                                       submission.MUSW__Description__c=Sub_Temp.MUSW__Submission_Description__c;
                                       submission.MUSW__Application2__c =app.Id;
                                       submission.MUSW__Required__c=Sub_Temp.MUSW__Required__c;
                                       Submission.Name=Sub_temp.MUSW__Submission_Name__c;
                                       SubmissionCreate.add(Submission);
                                       flag=true;
                                   }
                               }
                           }
                           else{
                               MUSW__Submission__c submission=new MUSW__Submission__c();
                               submission.MUSW__Description__c=Sub_Temp.MUSW__Submission_Description__c;
                               submission.MUSW__Application2__c =app.Id;
                               submission.MUSW__Required__c=Sub_Temp.MUSW__Required__c;
                               Submission.Name=Sub_temp.MUSW__Submission_Name__c;
                               SubmissionCreate.add(Submission);
                           }
                       }
                    if(Sub_Temp.MUSW__Application_Phases__c==app.MUSW__Phase__c && Sub_Temp.MUSW__Application_Statuses__c==app.MUSW__Status__c
                       && Sub_Temp.Name.contains('Agent Authorization') && app.Agent_Authorization__c){
                        MUSW__Submission__c submission=new MUSW__Submission__c();
                        submission.MUSW__Description__c=Sub_Temp.MUSW__Submission_Description__c;
                        submission.MUSW__Application2__c =app.Id;
                        submission.MUSW__Required__c=Sub_Temp.MUSW__Required__c;
                        Submission.Name=Sub_temp.MUSW__Submission_Name__c;
                        SubmissionCreate.add(Submission);
                           system.debug('Inside->SubmissionCreate::'+SubmissionCreate);
                    }
                }
            }
            system.debug('SubmissionCreate::'+SubmissionCreate);
            Database.SaveResult[] lsr = Database.insert(SubmissionCreate,false);
        }catch(exception ex){
            system.debug('Exception'+ex.getmessage());
        }
    }
    
}