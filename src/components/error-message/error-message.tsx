import { useAppSelector } from '../../hooks';
import { getError } from '../../store';
import './error-message.scss';

function ErrorMessage() : JSX.Element | null {
  const error = useAppSelector(getError);
  return (
    error ? <div className="error-message">{error}</div> : null
  );
}

export default ErrorMessage;

