import Cookies from 'js-cookie';
import { userProfile } from '../../pages/Profile/profile';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './purchase-info-selection.css';

interface PurchaseInfoSelectionProps {
    onContinueClick: ( profile: userProfile ) => void;
}

const PurchaseInfoSelection = ({ onContinueClick }: PurchaseInfoSelectionProps) => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const [profile, setProfile] = useState<userProfile>({
        profileId: null,
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        points: 0,
        icon: "",
    });
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
                    setProfile({
                        profileId: profileData.profileId,
                        firstName: profileData.firstName,
                        lastName: profileData.lastName,
                        email: user,
                        dateOfBirth: profileData.dateOfBirth,
                        points: profileData.points,
                        icon: profileData.icon,
                    });
                } else {
                    console.error('Failed to fetch profile', user);
                }
                } catch (error) {
                console.error('Error:', error);
                }
            }
        };
        fetchProfile();
        setIsLoaded(true);
    }, []);

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const onNextClick = (event: FormEvent<HTMLFormElement>) => {
        onContinueClick(profile);
    };

    if (!user) {
        return ( 
            <div className='profile-info'>
                <h1>Skriv inn brukerinfo</h1>
                    <form className='profile-form' onSubmit={onNextClick}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            value={profile.email}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            value={profile.firstName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            value={profile.lastName}
                            onChange={onInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='dateOfBirth'>Date of Birth</label>
                        <input
                            type='date'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            value={profile.dateOfBirth}
                            onChange={onInputChange}
                        />
                    </div>
                    <p>Betalingsinfo kommer snart....</p>
                    <button type='submit'>Kjøp billetter</button>
                </form>
            </div>
        );
    }

    console.log(profile);

    return (
        <div className='profile-info'>
            <h1>Skriv inn brukerinfo</h1>
            {isLoaded ? (
                <form className='profile-form' onSubmit={onNextClick}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        name='email'
                        id='email'
                        value={profile.email}
                        onChange={onInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        value={profile.firstName}
                        onChange={onInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        value={profile.lastName}
                        onChange={onInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='dateOfBirth'>Date of Birth</label>
                    <input
                        type='date'
                        name='dateOfBirth'
                        id='dateOfBirth'
                        value={profile.dateOfBirth}
                        onChange={onInputChange}
                    />
                </div>
                <p>Betalingsinfo kommer snart....</p>
                <button type='submit'>Kjøp billetter</button>
            </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default PurchaseInfoSelection;