import { LightningElement, api } from 'lwc';

export default class CreateProgressNoteForm extends LightningElement {
    @api recordTypeId;
    @api encounterDetails;

    handleSuccess(event) {
        const eventId = event.detail.id;
        this.dispatchEvent(new CustomEvent('pncreated', { detail: eventId }));
        this.handleClose();
    }

    handleError(event) {
        console.error('Error:', event.detail.detail);
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}
