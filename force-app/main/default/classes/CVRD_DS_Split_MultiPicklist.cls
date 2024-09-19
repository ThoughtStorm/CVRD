public class CVRD_DS_Split_MultiPicklist {
    
     @InvocableMethod
    public static void splitMultipicklist(List<InputVar> InputVariable){
        
        List<String> feeTemplateSubTypeSet = new List<String>(InputVariable[0].MultipicklistValues.split(';'));
        List<MUSW__Master_Fee_List__c> feetempList=new List<MUSW__Master_Fee_List__c>(InputVariable[0].FeeTemplateRecords);
        List<MUSW__fee__c> CreateFeeList=new List<MUSW__fee__c>();
        for(MUSW__Master_Fee_List__c FeetempRecord:feetempList){
            if(feeTemplateSubTypeSet.contains(FeetempRecord.CVRD_DS_Application_DP_Sub_Type__c)){
                MUSW__fee__c feeRecords=new MUSW__Fee__c();
                feeRecords.MUSW__Type__c=FeetempRecord.MUSW__Type__c;
                feeRecords.MUSW__Description__c=FeetempRecord.MUSW__Fee_Description__c;
                feeRecords.MUSW__Amount__c=FeetempRecord.MUSW__Standard_Price__c;
                feeRecords.CVRD_DS_Application_Sub_Type__c=FeetempRecord.CVRD_DS_Application_DP_Sub_Type__c;
                feeRecords.MUSW__Application2__c=InputVariable[0].RecordId;
                CreateFeeList.add(feeRecords);
            }
        }
        Insert CreateFeeList; 
    }

	public class InputVar{
        @InvocableVariable
        public string MultipicklistValues;
        @InvocableVariable
        public List<MUSW__Master_Fee_List__c> FeeTemplateRecords;
        @InvocableVariable
        public Id RecordId;
	}
    
}