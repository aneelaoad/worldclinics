import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CreateProgressNoteForm extends LightningElement {
    @api recordTypeId;
    @api encounterDetails;

    handleSuccess(event) {
        this.showToast('Success', 'Progress Note created successfully!', 'success');

        const eventId = event.detail.id;
        this.dispatchEvent(new CustomEvent('pncreated', { detail: eventId }));
        this.handleClose();
    }

    handleError(event) {
        this.showToast('Error', 'Error creating Progress Note: ' + event.detail.detail, 'error');

        console.error('Error:', event.detail.detail);
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}