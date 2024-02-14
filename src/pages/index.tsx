import styles from './index.module.css';
import Link from '@docusaurus/Link';
import KakarotLogo from './kakarot.svg';
import DiscordLogo from './discord.svg';
import Bg1 from './bg1.svg';
import Bg2 from './bg2.svg';
import Bg3 from './bg3.svg';

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Bg1 className={styles.lottie} />
      <Bg2 className={`${styles.lottie} ${styles.backwards}`} />
      <Bg3 className={styles.lottie} />
      <div className={styles.content}>
        <div className={styles.principal}>
          <h1 className={styles.title}>
            Navigate the Kakarot{' '}
            <span className={styles.accent}>Ecosystem</span>
          </h1>
          <p className={styles.paragraph}>
            Discover Kakarot zkEVM, a zkRollup where great developer experience
            meets a user-first approach: 100% Ethereum compatiblity plus
            UX-driven new features (account abstraction, multicall, new EIPs).
            Start building the future of Ethereum, today.
          </p>
          <Link className={styles.button} to='/quick-start'>
            Access the Docs
          </Link>
        </div>
        <footer className={styles.footer}>
          <a
            href='https://kakarot.org'
            className={styles.footeritem}
            target='_blank'
          >
            <KakarotLogo className={styles.icon} />
            <span className={styles.kakarotlink}>kakarot.org</span>
          </a>
          <a
            href='https://discord.gg/kakarotzkevm'
            className={styles.footeritem}
            target='_blank'
          >
            <DiscordLogo className={`${styles.discord} ${styles.icon}`} />
            <div className={styles.footerdiv}>
              {' '}
              <span className={styles.medium}>Question ? </span>
              <span className={styles.small}>Join our discord</span>
            </div>
          </a>
        </footer>
      </div>
    </div>
  );
}
