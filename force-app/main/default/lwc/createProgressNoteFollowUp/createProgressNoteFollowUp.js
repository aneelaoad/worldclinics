import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PROGRESS_NOTE_OBJECT from '@salesforce/schema/Progress_Note__c';

export default class CreateProgressNoteFollowUp extends LightningElement {

    showLoader = true;
    showPNForm = false;
    showFUForm = false;
    createdPNId;
    encounterDetails;

    @api recordId;
    recordTypeId;
    recordTypeName;

    @wire(getObjectInfo, { objectApiName: PROGRESS_NOTE_OBJECT })
    objectInfo({ error, data }) {
        if (data && this.recordId) {
            const recordTypeInfos = data.recordTypeInfos;
            const defaultRecordTypeId = data.defaultRecordTypeId;
            this.recordTypeId = defaultRecordTypeId;
            this.recordTypeName = recordTypeInfos[defaultRecordTypeId].name;

            console.log('Record Type Name: '+this.recordTypeName);
            this.showPNForm = true;
            // this.showLoader = false;
        } else if (error) {
            console.error('Error fetching object info', error);
        }
    }

    handlePNCreated(event) {
        this.createdPNId = event.detail.id;
        this.showPNForm = false;
        this.showFUForm = true;
    }

    handleShowLoader() {
        this.showLoader = true;
    }

    handleHideLoader() {
        this.showLoader = false;
    }

    handleClose() {
        this.showPNForm = false;
        this.showFUForm = false;
    }

    connectedCallback(){
        this.showPNForm= true
    }
}