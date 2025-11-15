import React, { useEffect, useState } from "react";
import { addForm, deleteForm, getForm } from "./api";

function App() {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState({
    text: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    hobbies: [],
    country: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const fetchForms = async () => {
    const res = await getForm();
    setForms(res);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const er = {};
    if (!form.text.trim()) er.text = "Text is required";
    else if (form.text.trim().length < 3)
      er.text = "Minimum 3 characters required";
    if (!form.email.trim()) er.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) er.email = "Email is invalid";
    if (!form.password.trim()) er.password = "Password is required";
    else if (form.password.trim().length < 6)
      er.password = "Minimum 6 characters required";
    if (!form.confirmPassword.trim())
      er.confirmPassword = "Confirm your password";
    else if (form.confirmPassword !== form.password)
      er.confirmPassword = "Invalid confirmation";
    if (!form.country) er.country = "select a country";
    if (form.hobbies.length === 0) er.hobbies = "choose atleast one hobby";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const res = await addForm(form);
        alert("form successfully submitted");
        console.log("server response : ", res);
      } catch (error) {
        alert("something went wrong");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteForm(id);
      fetchForms()
    }
     catch (error) {
      console.error("error: ", error);
      throw error;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Text: </label>
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={handleChange}
          />
          {errors.text && <p>{errors.text}</p>}
        </div>

        <div>
          <label>Email: </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div>
          <label>Confirm Password: </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        <div>
          <label>phone: </label>
          <input
            type="number"
            name="number"
            value={form.number}
            onChange={handleChange}
          />
          {errors.number && <p>{errors.number}</p>}
        </div>

        <div>
          <label>country: </label>
          <select name="country" value={form.country} onChange={handleChange}>
            <option value="">select</option>
            <option value="india">india</option>
            <option value="japan">japan</option>
            <option value="russia">russia</option>
          </select>

          {errors.country && <p>{errors.country}</p>}
        </div>

        <div>
          <label>Hobbies: </label>

          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="football"
              onChange={handleChange}
            />
            football
          </label>

          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="cricket"
              onChange={handleChange}
            />
            cricket
          </label>

          <label>
            <input
              type="checkbox"
              name="hobbies"
              value="hockey"
              onChange={handleChange}
            />
            hockey
          </label>

          {errors.hobbies && <p>{errors.hobbies}</p>}
        </div>

        <div>
          <label>Gender</label>
          <label>
            <input
              name="gender"
              type="radio"
              value="male"
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              name="gender"
              type="radio"
              value="female"
              onChange={handleChange}
            />
            Female
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>

      <div>
        {forms.map((f, index) => (
          <div key={index}>
            <p>{f.text}</p>
            <p>{f.email}</p>
            <p>{f.country}</p>
            <p>{f.gender}</p>

            <button
              onClick={() => {
                handleDelete(f.id);
              }}
            >delete</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
