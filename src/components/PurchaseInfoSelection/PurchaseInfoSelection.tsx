import Cookies from 'js-cookie';
import UserProfile from '../../pages/Profile/profile';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import './purchase-info-selection.css';

const PurchaseInfoSelection = () => {
    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const [profile, setProfile] = useState<UserProfile>({
        profileId: null,
        firstName: "",
        lastName: "",
        email: user,
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
                    setProfile(profileData);
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

    const onNextClick = async (event: FormEvent<HTMLFormElement>) => {
        alert('Ticket(s) bought for:' + JSON.stringify(profile));
    };

    if (!user) {
        return <div>User form</div>;
    }

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
                        value={user}
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