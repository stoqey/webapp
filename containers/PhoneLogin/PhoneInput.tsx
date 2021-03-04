import * as React from "react";
import { PhoneInput, SIZE } from "baseui/phone-input";

export default () => {
  const [country, setCountry] = React.useState(undefined);
  const [text, setText] = React.useState("");
  return (
    <PhoneInput
      country={country}
      onCountryChange={({ option }) => setCountry(option)}
      text={text}
      onTextChange={e => setText(e.currentTarget.value)}
      size={SIZE.default}
    />
  );
}