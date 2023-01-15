import { useState } from 'react';
import '../styles/Page3css.css';

function Page3(props) {
  const { updatePageNumber, pageNumberValue, updatePage3, formSubmit, formsValue } = props;

  const [thirdForm, setThirdForm] = useState({
    countryCode: formsValue.countryCode,
    phoneNumber: formsValue.phoneNumber,
  });

  const [numberValidation, setNumberValidation] = useState();
  const handleChange = e => {
    const { name, value } = e.target;
    setThirdForm({
      ...thirdForm,
      [name]: value,
    });
    if (name === 'phoneNumber') {
      // const re = /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/;
      if (value.length === 10) {
        setNumberValidation('');
      } else setNumberValidation('Phone Number must be of 10 digits');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (numberValidation.length) return;

    const data = new Promise(resolve => {
      Object.keys(thirdForm).forEach(key => {
        updatePage3(key, thirdForm[key]);
      });
      resolve();
    });
    data.then(() => formSubmit());
  };

  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <label className="my-1 mr-2">
          Country Code
          <select
            name="countryCode"
            className="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            onChange={handleChange}
            value={thirdForm.countryCode}
          >
            <option value="">Choose Country Code</option>
            <option value="+91">India (+91)</option>
            <option value="+1">America (+1)</option>
          </select>
        </label>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Phone Number</label>
          <input
            required
            // max={9999999999}
            name="phoneNumber"
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Phone Number"
            onChange={handleChange}
            value={thirdForm.phoneNumber}
          />
          {numberValidation && <p className="text-danger">{numberValidation}</p>}
        </div>
        <div className="custom-control custom-checkbox my-1 mr-sm-2">
          <label className="custom-control-label">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customControlInline"
              required
            />
            Accept Terms And Conidtion
          </label>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => updatePageNumber(pageNumberValue - 1)}
          >
            Prev
          </button>
          <button type="submit" className="btn btn-primary mx-2">
            Save
          </button>
          <button
            disabled
            type="submit"
            className="btn btn-success"
            onClick={() => updatePageNumber(pageNumberValue + 1)}
          >
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page3;
