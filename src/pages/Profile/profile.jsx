import AppHeader from "../../components/AppHeader/AppHeader";
import Button from "../../components/Button/Button";
import { useState } from "react";
import "./profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    points: 0,
    icon: "",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const onCreateProfile = (event) => {
    event.preventDefault();

    console.log("First name:", profile.firstName);
    console.log("Last name:", profile.lastName);
    console.log("Email:", profile.email);
    console.log("Phone:", profile.phone);
    console.log("Date of birth:", profile.dateOfBirth);
  };

  return (
    <>
      <AppHeader />
      <div className='profile-page'>
        <div className='profile-container'>
          <h2>Lag Profil</h2>
          <form className='profile-form'>
            <div className='form-group'>
              <label htmlFor='firstName'>Fornavn</label>
              <input
                type='text'
                name='firstName'
                placeholder='Fornavn'
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Etternavn</label>
              <input
                type='text'
                name='lastName'
                placeholder='Etternavn'
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>E-post</label>
              <input
                type='email'
                name='email'
                placeholder='E-post'
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Telefon</label>
              <input
                type='tel'
                name='phone'
                placeholder='Telefon'
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='dob'>Fødselsdato</label>
              <input
                type='date'
                name='dateOfBirth'
                placeholder='Fødselsdato'
                onChange={onInputChange}
              />
            </div>
          </form>
          <Button Text='Lag profil' onClick={onCreateProfile} />
        </div>
      </div>
    </>
  );
};

export default Profile;
