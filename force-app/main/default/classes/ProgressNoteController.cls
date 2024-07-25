public with sharing class ProgressNoteController {
    @AuraEnabled
    public static Id createProgressNote(Map<String, Object> fields) {
        Progress_Note__c newNote = new Progress_Note__c();

        for (String fieldName : fields.keySet()) {
            newNote.put(fieldName, fields.get(fieldName));
        }

        insert newNote;
        return newNote.Id;
    }
}
