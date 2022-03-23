import { useState, useEffect } from 'react';
import { getUserInfo } from '../../utils/api/apiCalls.js';

import { Avatar } from '@mui/material';

import styles from '../../utils/styles/Profiles.module.css';
import {defaultProfilePic, defaultProfilePicDims} from '../../utils/constants';

// word-wrap normal in the global page
// add user type: teacher or student

export default function MyProfile() {
  const [userType, setUserType] = useState('Mentor');
  const [userID, setUserID] = useState('51');
  const [currentUserProfileInfo, setCurrentUserProfileInfo] = useState({
    fullName: 'Current User',
    location: '',
    description: '',
    endorsements: 0
  })

  // refactor later
  useEffect(() => {
    fetchUserInfo();
  }, [])

  const fetchUserInfo = () => {
    getUserInfo(userID).then(res => {
      setCurrentUserProfileInfo({
        fullName: res.name.first_name + ' ' + res.name.last_name,
        location: res.location,
        description: res.description,
        endorsements: res.endorsements
      })

      setUserType(res.account_type)
    }).catch(err => {
      console.log('Error getting user data')
    })
  }

  return (
    <div className="pageData">
      <div className={styles.profileContainer}>
          <div className={styles.profilePic}>
            <Avatar
              className="my-profile-view-avatar"
              alt="My Profile Picture"
              src={defaultProfilePic}
              sx={defaultProfilePicDims}
            /></div>
        <div className={styles.profileDescription}>
          <h2>{currentUserProfileInfo.fullName}</h2>
          <h3>{currentUserProfileInfo.location}</h3>
          <p>{currentUserProfileInfo.description}</p>
        </div>
      </div>
        {userType === 'Mentor' && <div>Recommended: {currentUserProfileInfo.endorsements}</div>}
    </div>
  )
}
