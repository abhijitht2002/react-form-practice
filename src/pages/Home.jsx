import React, { useEffect, useState } from "react";
import { getForm } from "../api";

function Home() {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    const res = await getForm();
    setForms(res);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteForm(id);
      fetchForms();
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  };

  return (
    <div>
      {forms.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        forms.map((f) => (
          <div key={f.id}>
            <p>Text: {f.text}</p>
            <p>Email: {f.email}</p>
            <p>Country: {f.country}</p>
            <p>Gender: {f.gender}</p>
            <button onClick={() => handleDelete(f.id)}>Delete</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
