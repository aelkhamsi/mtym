/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, EventHandler } from "react"
import {
  type CountryCallingCode,
  type E164Number,
} from "libphonenumber-js"
import i18nIsoCountries from "i18n-iso-countries"
import enCountries from "i18n-iso-countries/langs/en.json"
import PhoneInput, { type Country } from "react-phone-number-input/input"
import Input from "../input"

import { ComboboxCountryInput } from "./combobox"
import {
  getCountriesOptions,
  isoToEmoji,
} from "./helpers"

type CountryOption = {
  value: Country
  label: string
  indicatif: CountryCallingCode
}

i18nIsoCountries.registerLocale(enCountries)

const ReactPhoneInput = ({
  onValueChange,
  defaultCountry,
  defaultValue,
}:{
  onValueChange: EventHandler<any>,
  defaultCountry: string,
  defaultValue: E164Number,
}) => {
  const options = getCountriesOptions()
  const defaultCountryOption = options.find(
    (option) => option.value === defaultCountry,
  )

  const [country, setCountry] = useState<CountryOption>(
    defaultCountryOption || options[0]!,
  )
  const [phoneNumber, setPhoneNumber] = useState<E164Number|undefined>(defaultValue)

  const onCountryChange = (value: CountryOption) => {
    setPhoneNumber(undefined)
    onValueChange(undefined)
    setCountry(value)
  }

  return (
    <div className="not-prose mt-8 flex flex-col gap-4">
      <div className="flex gap-2">
        <ComboboxCountryInput
          value={country}
          onValueChange={onCountryChange}
          options={options}
          renderOption={({ option }) => `${isoToEmoji(option.value)} ${option.label}`}
          renderValue={(option) => option.label}
          emptyMessage="No country found."
        />
        <PhoneInput
          international
          withCountryCallingCode
          country={country.value.toUpperCase() as Country}
          value={phoneNumber}
          inputComponent={Input}
          onChange={(value: E164Number) => {
            setPhoneNumber(value)
            onValueChange(value)
          }}
        />
      </div>
    </div>
  )
}

export default ReactPhoneInput;