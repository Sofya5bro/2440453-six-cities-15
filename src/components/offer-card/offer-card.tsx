import { Link, useNavigate } from 'react-router-dom';
import { TCardSizes, TOffer } from '../../types';
import { calcRaitingPersent, calcBookmarkActiveClass, calcHiddenPremiumClass, changeFirstSym } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus, RouteList } from '../../consts';
import { getAuthStatus, updateFavoriteStatus } from '../../store';

type TOfferCardProps = {
  offer: TOffer;
  prefixClass: string;
  cardSizes: TCardSizes;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}
function OfferCard({offer, prefixClass, cardSizes, onMouseEnter, onMouseLeave}: TOfferCardProps): JSX.Element {
  const {title, id, isFavorite, isPremium, previewImage, price, rating, type} = offer;
  const {width, height} = cardSizes;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthStatus);
  const ratPersent = calcRaitingPersent(rating);
  const classNamePremium = calcHiddenPremiumClass(isPremium, 'place-card__mark');
  const classNameActive = calcBookmarkActiveClass(isFavorite && authStatus === AuthorizationStatus.Auth ? isFavorite : false, 'place-card__bookmark-button');

  const onClick = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      dispatch(updateFavoriteStatus({id: id, status: isFavorite ? 0 : 1}));
    } else {
      navigate(RouteList.Login);
    }
  };
  return (
    <article className={`${prefixClass}__card place-card`} data-id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className={classNamePremium}>
        <span>Premium</span>
      </div>
      <div className={`${prefixClass}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={width} height={height} alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${classNameActive} button`} type="button" onClick={onClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratPersent}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{changeFirstSym(type)}</p>
      </div>
    </article>
  );
}

export default OfferCard;
