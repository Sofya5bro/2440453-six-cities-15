import { ChangeEventHandler } from 'react';

type TRatingInputProps = {
  title: string;
  value: string;
  checked: boolean;
  dis: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;

}
function RatingInput({value, title, checked, dis, onChange}: TRatingInputProps): JSX.Element {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} disabled={dis} type="radio" checked={checked} onChange={onChange}/>
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingInput;
