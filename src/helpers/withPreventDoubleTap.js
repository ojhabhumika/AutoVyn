import React from 'react';
import { debounce } from 'lodash'

const withPreventDoubleTap = (WrappedComponent) => {

    class PreventDoubleTap extends React.PureComponent {

        debouncedOnPress = () => {
            this.props.onPress && this.props.onPress();
        }

        onPress = debounce(this.debouncedOnPress, 300, { leading: true, trailing: false });

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
    }

    PreventDoubleTap.displayName = `withPreventDoubleTap(${WrappedComponent.displayName || WrappedComponent.name})`
    return PreventDoubleTap;
}

export default withPreventDoubleTap;