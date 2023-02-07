import {showMessage} from 'react-native-flash-message'

export function showError(text) {
  showMessage({
    message: text,
    type: 'danger',
    icon: {icon: 'danger', position: 'right'},
  })
}

export function showSuccess(text) {
  showMessage({
    message: text,
    type: 'success',
    icon: {icon: 'success', position: 'right'},
  })
}
