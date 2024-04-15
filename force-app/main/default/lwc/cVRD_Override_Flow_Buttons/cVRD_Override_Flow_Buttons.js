import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationPauseEvent, FlowNavigationNextEvent, FlowNavigationBackEvent  } from 'lightning/flowSupport';
import { NavigationMixin } from 'lightning/navigation';

export default class cVRD_Override_Flow_Buttons extends NavigationMixin(LightningElement) {
    @api availableActions = [];
    handlePause() {
        if (this.availableActions.find((action) => action === 'PAUSE')) {
            // navigate to the next screen
            const navigatePauseEvent = new FlowNavigationPauseEvent();
            this.dispatchEvent(navigatePauseEvent);
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: 'https://cvrd--dev1.sandbox.my.site.com/CVRDCitizenshipPortal/s/'
                }
            },
            true // Replaces the current page in your browser history with the URL
          );
            eval("$A.get('e.force:refreshView').fire();");
        }
    }
    handleNext() {
        if (this.availableActions.find((action) => action === 'NEXT')) {
            // navigate to the next screen
            const navigateNextEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigateNextEvent);
        }
    }
    handlePrevious() {
        if (this.availableActions.find((action) => action === 'NEXT')) {
            // navigate to the next screen
            const navigateBackEvent = new FlowNavigationBackEvent();
            this.dispatchEvent(navigateBackEvent);
        }
    }
}