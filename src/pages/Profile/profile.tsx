import React, { useState, ChangeEvent, FormEvent } from 'react';
import AppHeader from "../../components/AppHeader/AppHeader";
import Button from "../../components/Button/Button";
import "./profile.css";

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  points: number;
  icon: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    points: 0,
    icon: "",
  });

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const onCreateProfile = (event: FormEvent<HTMLFormElement>) => {
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
          <form className='profile-form' onSubmit={onCreateProfile}>
            <div className='form-group'>
              <label htmlFor='firstName'>Fornavn</label>
              <input
                type='text'
                name='firstName'
                placeholder='Fornavn'
                value={profile.firstName}
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Etternavn</label>
              <input
                type='text'
                name='lastName'
                placeholder='Etternavn'
                value={profile.lastName}
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>E-post</label>
              <input
                type='email'
                name='email'
                placeholder='E-post'
                value={profile.email}
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone'>Telefon</label>
              <input
                type='tel'
                name='phone'
                placeholder='Telefon'
                value={profile.phone}
                onChange={onInputChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='dateOfBirth'>Fødselsdato</label>
              <input
                type='date'
                name='dateOfBirth'
                placeholder='Fødselsdato'
                value={profile.dateOfBirth}
                onChange={onInputChange}
              />
            </div>
            <Button Text='Lag profil' onClick={onCreateProfile} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
