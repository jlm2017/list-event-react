import React from 'react';

import countryCodes from '../../data/country.json';

const orderedCountryCodes = [['FR', countryCodes['FR']]].concat(
  Object.entries(countryCodes)
    .filter(([code, country]) => (code !== 'FR'))
    .sort(([code, label]) => label)
);

export default function CountrySelector(input) {
  return <select {...input}>
    {
      orderedCountryCodes.map(([code, label]) => <option value={code} key={code}>{label}</option>)
    }
  </select>;
}
