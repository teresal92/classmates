import SideBar from './SideBar';
import TopBar from './TopBar';
import styles from '../../utils/styles/NavLayoutStyles/NavLayout.module.css';

import { useAuthContext } from '../../utils/context/AuthProvider';

export default function NavLayout({ children }) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <>
        {children}
      </>
    )
  }

  return (
    <div className={styles.loggedInView}>
      <SideBar></SideBar>
      <div>
        <TopBar />
        <section>{children}</section>
      </div>
    </div>
  )
}