import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PROGRESS_NOTE_OBJECT from '@salesforce/schema/Progress_Note__c';
import CASE_OBJECT from '@salesforce/schema/Case';
import { getRecord } from 'lightning/uiRecordApi';
const FIELDS = ['Case.RecordTypeId'];

export default class CreateProgressNoteFollowUp extends LightningElement {

    @api recordId; // The record ID of the Case (or encounter) from which the action button was clicked
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    encounterRecord;


    @wire(getObjectInfo, { objectApiName: CASE_OBJECT })
    encounterObjectInfo;
    @wire(getObjectInfo, { objectApiName: PROGRESS_NOTE_OBJECT })
    progressNoteObjectInfo;

    selectedRecordTypeId;
    selectedRecordTypeName;

    connectedCallback() {
        this.fetchRecordTypes();
    }

    fetchRecordTypes() {
        this.fetchEncounterRecordTypes();
        this.fetchProgressNoteRecordTypes();
    }

    fetchEncounterRecordTypes() {
        console.log('  @api recordId;',this.recordId);

        if (this.encounterObjectInfo.data) {
            const recordTypeInfos = this.encounterObjectInfo.data.recordTypeInfos;
            // Fetch and log encounter record types if needed
        } else if (this.encounterObjectInfo.error) {
            console.error('Error fetching encounter object info:', this.encounterObjectInfo.error);
        }
    }

    fetchProgressNoteRecordTypes() {
        if (this.progressNoteObjectInfo.data) {
            const recordTypeInfos = this.progressNoteObjectInfo.data.recordTypeInfos;

            const recordTypeList = Object.values(recordTypeInfos).map(recordType => ({
                id: recordType.recordTypeId,
                name: recordType.name,
                developerName: recordType.developerName
            }));

            // Log all record types for debugging
            recordTypeList.forEach(element => {
                console.log('Progress Note Record Types', element.name);
                // Check for "Medical Progress Note" record type
                if (element.name === 'Medical Progress Note') {
                    this.selectedRecordTypeId = element.id;
                    this.selectedRecordTypeName = element.name;
                }
            });
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
