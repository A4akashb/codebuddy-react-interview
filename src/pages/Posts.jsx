import { useEffect, useState } from 'react';

function Posts() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    fetch('https://codebuddy.review/posts')
      .then(response => response.json())
      .then(responseData => {
        setApiData(responseData.data.posts);
      });
  }, []);

  return (
    <div className="container">
      <div className="row">
        {apiData.map(item => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 my-2">
            <div className="card">
              <img className="card-img-top" src={item.image} alt="cardim" />
              <div className="card-body">
                <h5 className="card-title">{item.id}</h5>
                <img src="https://picsum.photos/50" alt="avatar" className="avatar" />
                <p>{`${item.firstName} ${item.lastName}`}</p>
                <p className="card-text">{item.writeup}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
