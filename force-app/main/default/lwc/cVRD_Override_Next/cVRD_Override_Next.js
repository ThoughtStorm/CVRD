import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationPauseEvent, FlowNavigationNextEvent, FlowNavigationBackEvent  } from 'lightning/flowSupport';
import { NavigationMixin } from 'lightning/navigation';

export default class CVRD_Override_Next extends NavigationMixin(LightningElement) {
    @api availableActions = [];
    handleNext() {
        if (this.availableActions.find((action) => action === 'NEXT')) {
            // navigate to the next screen
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
}