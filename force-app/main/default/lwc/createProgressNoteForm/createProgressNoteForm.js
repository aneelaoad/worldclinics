import { LightningElement, api, track } from 'lwc';
import createProgressNote from '@salesforce/apex/ProgressNoteController.createProgressNote';

export default class CreateProgressNoteForm extends LightningElement {
    @api recordTypeId;
    @api recordTypeName;
    @api encounterDetails;
    @track summaryContent;
    @track actualDate;

    handleSummaryContentChange(event) {
        this.summaryContent = event.target.value;
    }

    handleActualDateChange(event) {
        this.actualDate = event.target.value;
    }

    handleSave() {
        const fields = {
            Summary_Content__c: this.summaryContent,
            Actual_Date__c: this.actualDate,
            Encounter__c: this.encounterDetails, // Assuming encounterDetails contains the Case Id
            RecordTypeId: this.recordTypeId
        };

        createProgressNote({ fields })
            .then(result => {
                // handle success
                this.dispatchEvent(new CustomEvent('pncreated', { detail: result }));
                this.handleClose();
            })
            .catch(error => {
                // handle error
                console.error(error);
            });
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
