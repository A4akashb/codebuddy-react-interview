// import React from 'react';
import { useState } from 'react';

function Page1(props) {
  const { updatePageNumber, pageNumberValue, updatePage1, formsValue } = props;

  const [firstForm, setFirstForm] = useState({
    emailId: formsValue.emailId,
    password: formsValue.password,
  });

  const [nextPage, setNextPage] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFirstForm({
      ...firstForm,
      [name]: value,
    });
    if (name === 'password') {
      const re = /(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*[!@#$%]){2})/;
      if (re.test(value)) {
        setPasswordValidation('');
      } else
        setPasswordValidation(
          'Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
        );
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (passwordValidation.length) return;

    const data = new Promise(resolve => {
      Object.keys(firstForm).forEach((key, index) => {
        console.log(key, index);
        updatePage1(key, firstForm[key]);
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
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="emailId"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            onChange={handleChange}
            value={firstForm.emailId}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleChange}
            value={firstForm.password}
          />
          {passwordValidation && <p className="text-danger">{passwordValidation}</p>}
        </div>
        <div className="my-2">
          <button
            disabled
            type="button"
            className="btn btn-primary"
            onClick={() => updatePageNumber(pageNumberValue - 1)}
          >
            Prev
          </button>
          <button type="submit" className="btn btn-primary mx-2" onClick={() => setNextPage(false)}>
            Save
          </button>
          <button type="submit" className="btn btn-success" onClick={() => setNextPage(true)}>
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page1;
