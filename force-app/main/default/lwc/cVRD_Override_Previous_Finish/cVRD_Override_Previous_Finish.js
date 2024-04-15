import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationFinishEvent, FlowNavigationBackEvent  } from 'lightning/flowSupport';
import { NavigationMixin } from 'lightning/navigation';
export default class CVRD_Override_Previous_Finish extends NavigationMixin(LightningElement) {
    @api availableActions = [];
    
    handleFinish() {
        if (this.availableActions.find((action) => action === 'FINISH')) {
            // navigate to the next screen
            const navigateFinishEvent = new FlowNavigationFinishEvent();
            this.dispatchEvent(navigateFinishEvent);
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