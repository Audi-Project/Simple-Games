import { AiOutlineClose } from 'react-icons/ai';
import IconWrapper from './IconWrapper';

export default function CloseIcon({ onClose }: { onClose: () => void }) {
  return (
    <IconWrapper width="48" height="48" isButton={true} onClick={onClose}>
      <AiOutlineClose />
    </IconWrapper>
  );
}
