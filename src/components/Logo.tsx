type Props = {};
import Image from 'next/image';
import logo from '../../public/barun-white-logo.png';
export default function Logo() {
  return <Image src={logo} alt='logo' className='opacity-50' />;
}
