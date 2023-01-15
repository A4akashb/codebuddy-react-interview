// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';

const Home = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    'emailId': '',
    'password': '',
    'firstName': '',
    'lastName': '',
    'address': '',
    'countryCode': '',
    'phoneNumber': '',
  });
  const [pageNumber, setPageNumber] = useState(1);

  const [formStatus, setFormStatus] = useState({
    'firstFormStatus': false,
    'secondFormStatus': false,
    'thirdFormStatus': false,
  });

  const updateFormValue = (key, value) => {
    const temp = formValue;
    temp[key] = value;
    setFormValue(temp);
    console.log(formValue);
  };

  const submitForm = () => {
    fetch('https://codebuddy.review/submit', {
      method: 'POST',
      body: JSON.stringify(formValue),
    })
      .then(response => response.json())
      .then(() => {
        navigate('/posts');
      });
  };

  const navigateInOtherForms = index => {
    if (index === pageNumber) return;

    const { firstFormStatus, secondFormStatus } = formStatus;
    if (index === 3 && firstFormStatus && secondFormStatus) {
      setPageNumber(3);
    }

    if (index === 2 && firstFormStatus) {
      setPageNumber(2);
    }

    setPageNumber(1);
  };

  const pageDisplay = () => {
    if (pageNumber === 1) {
      return (
        <Page1
          updatePage1={updateFormValue}
          pageNumberValue={pageNumber}
          updatePageNumber={setPageNumber}
          updateFormStatus={setFormStatus}
          formsValue={formValue}
        />
      );
    }

    if (pageNumber === 2) {
      return (
        <Page2
          updatePage2={updateFormValue}
          pageNumberValue={pageNumber}
          updatePageNumber={setPageNumber}
          updateFormStatus={setFormStatus}
          formsValue={formValue}
        />
      );
    }

    if (pageNumber === 3) {
      return (
        <Page3
          updatePage3={updateFormValue}
          pageNumberValue={pageNumber}
          updatePageNumber={setPageNumber}
          formSubmit={submitForm}
          updateFormStatus={setFormStatus}
          formsValue={formValue}
        />
      );
    }

    return <></>;
  };

  // const onSubmit = () => navigate('/posts');

  return (
    <main>
      {/* <div className="bg-light p-5 mb-5">
        <h1>React + Bootstrap v4</h1>
        <p>React template with Bootstrap version v4</p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </div> */}
      <Container>
        <div>
          <div className="my-2">
            <button
              type="button"
              className={pageNumber === 1 ? 'btn btn-success' : 'btn btn-primary'}
              disabled={pageNumber === 1}
              onClick={() => navigateInOtherForms(1)}
            >
              1
            </button>
            <button
              type="submit"
              className={pageNumber === 2 ? 'btn mx-2 btn-success' : 'btn btn-primary mx-2'}
              disabled={pageNumber === 2}
              onClick={() => navigateInOtherForms(2)}
            >
              2
            </button>
            <button
              type="submit"
              className={pageNumber === 3 ? 'btn btn-success' : 'btn btn-primary'}
              disabled={pageNumber === 3}
              onClick={() => navigateInOtherForms(3)}
            >
              3
            </button>
          </div>
          {pageDisplay()}
        </div>
        {/* <Button onClick={onSubmit}>Goto Posts</Button> */}
      </Container>
    </main>
  );
};

export default Home;
