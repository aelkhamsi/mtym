import { FieldType } from '../../types/FieldConfig';
import { FormInput } from './FormInput';
import { FormDob } from './FormDob';
import { FormPhoneInput } from './FormPhoneInput';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';

const getFieldRenderFn = (type: FieldType) => {
  switch(type) {
    case FieldType.TEXT_INPUT:
      return FormInput;
    case FieldType.PHONE_INPUT:
      return FormPhoneInput;
    case FieldType.DATE_OF_BIRTH:
      return FormDob;
    case FieldType.TEXTAREA:
      return FormTextarea;
    case FieldType.SELECT:
      return FormSelect;
    
    default:
      return () => {}
  }
}

export {
  FormInput,
  FormDob,
  FormPhoneInput,
  FormTextarea,
  FormSelect,
  getFieldRenderFn,
}

