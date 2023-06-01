import Link from "next/link";
import styles from '../../styles/home.module.css'

const Header = () => {

    return(
        <div className={styles.header}>
        {/* <Link href='uploadFile' style={{color: 'white'}}>Subir archivo</Link> */}
          <div className={styles.row_title}>
            <h1 className={styles.title}>Rolemaster</h1>
          </div>
          {/* <Link href='uploadFile' style={{color: 'white'}}>Subir archivo</Link> */}
          
        </div>
    )

}


export default Header;