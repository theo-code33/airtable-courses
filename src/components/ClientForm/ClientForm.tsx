import React, { useState } from "react";
import { ClientDto, Clients } from "../../utils/types/client";
import { createClient } from "../../utils/airtable";

const ClientForm = ({
  setClients,
}: {
  setClients: React.Dispatch<React.SetStateAction<Clients>>;
}) => {
  const [formData, setFormData] = useState<ClientDto>({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Création du nouveau client");
    createClient(formData, setClients);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFormData((previousFormData) => {
      return {
        ...previousFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstname"
        placeholder="Votre Prénom"
        required
        onChange={handleChange}
        value={formData.firstname}
      />
      <input
        type="text"
        name="lastname"
        placeholder="Votre Nom"
        required
        onChange={handleChange}
        value={formData.lastname}
      />
      <input
        type="email"
        name="email"
        placeholder="Votre Email"
        required
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Votre Numéro de Téléphone"
        required
        onChange={handleChange}
        value={formData.phoneNumber}
      />
      <button type="submit">Créer le nouveau client</button>
    </form>
  );
};

export default ClientForm;
