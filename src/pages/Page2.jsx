import { useState } from 'react';

function Page2(props) {
  const { updatePageNumber, pageNumberValue, updatePage2, formsValue } = props;

  const [nextPage, setNextPage] = useState(false);

  const [secondForm, setSecondForm] = useState({
    firstName: formsValue.firstName,
    lastName: formsValue.lastName,
    address: formsValue.address,
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setSecondForm({
      ...secondForm,
      [name]: value,
    });
    if (name !== 'address') {
      const re = /^[a-zA-Z ]*$/;
      if (re.test(value)) {
        setErrorMessages({
          ...errorMessages,
          [name]: '',
        });
      } else {
        setErrorMessages({
          ...errorMessages,
          [name]: value,
        });
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(firstForm);
    const data = new Promise(resolve => {
      Object.keys(secondForm).forEach((key, index) => {
        console.log(key, index);
        updatePage2(key, secondForm[key]);
      });
      resolve();
    });
    data.then(() => {
      if (nextPage) updatePageNumber(pageNumberValue + 1);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input
              type="text"
              required
              className="form-control"
              placeholder="First name"
              onKeyDown={event => /[a-z]/i.test(event.value)}
              name="firstName"
              minLength={2}
              maxLength={50}
              onChange={handleChange}
              value={secondForm.firstName}
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              onChange={handleChange}
              value={secondForm.lastName}
            />
          </div>
          <div className="my-2">
            <input
              type="text"
              required
              minLength={2}
              className="form-control"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={secondForm.address}
            />
          </div>
          <div className="my-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => updatePageNumber(pageNumberValue - 1)}
            >
              Prev
            </button>
            <button
              type="submit"
              className="btn btn-primary mx-2"
              onClick={() => setNextPage(false)}
            >
              Save
            </button>
            <button type="submit" className="btn btn-success" onClick={() => setNextPage(true)}>
              Save and Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page2;
