import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PROGRESS_NOTE_OBJECT from '@salesforce/schema/Progress_Note__c';
import CASE_OBJECT from '@salesforce/schema/Case';



export default class CreateProgressNoteReminder extends LightningElement {
  

    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    encounterObjectInfo;
    @wire(getObjectInfo, { objectApiName: PROGRESS_NOTE_OBJECT })
    progressNoteObjectInfo;

    selectedRecordTypeId;
    selectedRecordTypeName;
    showPNForm = false;

    // Define mappings between encounter and progress note record types
    recordTypeMappings = {
        'Medical Encounter': 'Medical Progress Note',
        'Admin Encounter': 'Admin Progress Note'
    };

    connectedCallback() {
        this.fetchRecordTypes();
    }

    fetchRecordTypes() {
       
        this.fetchEncounterRecordType();
        this.fetchProgressNoteRecordTypes();
    }

    fetchEncounterRecordType() {
        if(this.encounterObjectInfo.data){
            const encounterRecordTypes = this.encounterObjectInfo.data.recordTypeInfos;
            const recordTypeList = Object.values(recordTypeInfos).map(recordType => ({
                id: recordType.recordTypeId,
                name: recordType.name,
                developerName: recordType.developerName
            }));

            console.log('Encounter List: ',recordTypeList);

        }
      
    }

    fetchProgressNoteRecordTypes() {
            console.log('progressNoteObjectInfo: ',this.progressNoteObjectInfo);

        if (this.progressNoteObjectInfo.data) {
            const recordTypeInfos = this.progressNoteObjectInfo.data.recordTypeInfos;

            const recordTypeList = Object.values(recordTypeInfos).map(recordType => ({
                id: recordType.recordTypeId,
                name: recordType.name,
                developerName: recordType.developerName
            }));

            console.log('PN List: ',recordTypeList);
        } else if (this.progressNoteObjectInfo.error) {
            console.error('Error fetching progress note object info:', this.progressNoteObjectInfo.error);
        }
    }

    handlePNCreated(event) {
        const eventId = event.detail;
        console.log('Record ID:', eventId);
        this.handleHideLoader();
    }

    handleClose() {
        this.showPNForm = false;
    }

    handleShowLoader() {
        // Show loader
    }

    handleHideLoader() {
        // Hide loader
    }
}