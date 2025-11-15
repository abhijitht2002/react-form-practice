const baseURL = "http://localhost:8000/forms";

export const addForm = async (formData) => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("failed to add");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding form:", error);
    throw error;
  }
};

export const getForm = async () => {
  try {
    const res = await fetch(`${baseURL}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("error fetching form: ", error);
    throw error;
  }
};

export const updateForm = async (id, newData) => {
  const res = await fetch(`${baseURL}/update/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newData),
  });

  return await res.json();
};

export const deleteForm = async (id) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  return await res.json()
};
