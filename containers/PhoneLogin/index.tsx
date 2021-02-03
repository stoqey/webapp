import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input'


export function PhoneLogin() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
  )
}