import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import AppHeader from "../../components/AppHeader/AppHeader";
import Button from "../../components/Button/Button";
import "./profile.css";
import Cookies from 'js-cookie';

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
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    email: user.email,
    phone: "",
    dateOfBirth: "",
    points: 0,
    icon: "",
  });

  const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`http://localhost:5000/profile/getProfileByUserId?userId=${user.userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: ''
          });

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData);
            setIsLoaded(true);
          } else {
            console.error('Failed to fetch profile', user.userId);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
    fetchProfile();
  }, []);

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
          {isLoaded ? (
            <>
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
                    value={user.email}
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
              </form>
              <Button Text='Lag profil' onClick={onCreateProfile} />
            </>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
