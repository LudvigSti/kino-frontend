import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import AppHeader from "../../components/AppHeader/AppHeader";
import Button from "../../components/Button/Button";
import "./profile.css";
import Cookies from 'js-cookie';
import { profileEnd } from 'console';

interface Profile {
  profileId: number | null;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  points: number;
  icon: string;
}

const Profile: React.FC = () => {
  const userCookie = Cookies.get('user');
  const user = userCookie ? JSON.parse(userCookie) : null;
  const [profile, setProfile] = useState<Profile>({
    profileId: null,
    firstName: "",
    lastName: "",
    email: user,
    dateOfBirth: "",
    points: 0,
    icon: "",
  });
  const [profileName, setProfileName] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

 useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const response = await fetch(`http://localhost:5000/profile/getProfileByEmail?email=${user}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: ''
          });

          if (response.ok) {
            const profileData = await response.json();
            setProfile(profileData);
            setProfileName(profileData.firstName + ' ' + profileData.lastName);
            setIsLoaded(true);
          } else {
            console.error('Failed to fetch profile', user);
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

  const onCreateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/profile/${profile.profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
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

  return (
    <>
      <AppHeader />
      <div className='profile-page'>
        <div className='profile-container'>
          <div className='profile-info'>
            <img src='/images/profile_vector.png' alt='Profile Icon' />
            <h2>{profileName}</h2>
            <p>Score: {profile.points}</p>
          </div>
          <h2>Endre Profil</h2>
          {isLoaded ? (
            <div className='profile-change'>
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
                    value={user}
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
              <Button Text='Endre profil' onClick={onCreateProfile} />
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
