import StarIcon from '~/components/icons/star'
import cn from 'classnames'

const Stars = ({ onChange, onClick, disabled }) => (
  <div className="rating-stars">
    <form id="rating-form" onClick={onClick}>
      <fieldset className="rating-container" disabled={disabled}>
        <div className={cn('rating', { disabled })}>
          <input
            name="rating"
            type="radio"
            id="rating5"
            value="5"
            onChange={onChange}
          />
          <label htmlFor="rating5" title="5 stars">
            <StarIcon />
          </label>

          <input
            name="rating"
            type="radio"
            id="rating4"
            value="4"
            onChange={onChange}
          />
          <label htmlFor="rating4" title="4 stars">
            <StarIcon />
          </label>

          <input
            name="rating"
            type="radio"
            id="rating3"
            value="3"
            onChange={onChange}
          />
          <label htmlFor="rating3" title="3 stars">
            <StarIcon />
          </label>

          <input
            name="rating"
            type="radio"
            id="rating2"
            value="2"
            onChange={onChange}
          />
          <label htmlFor="rating2" title="2 stars">
            <StarIcon />
          </label>

          <input
            name="rating"
            type="radio"
            id="rating1"
            value="1"
            onChange={onChange}
          />
          <label htmlFor="rating1" title="1 stars">
            <StarIcon />
          </label>
        </div>
      </fieldset>
    </form>
    <style jsx>{`
      .rating-container {
        border: 0;
        padding: 0;
        margin: 0;
        position: relative;
        z-index: 200;
      }

      .rating {
        display: flex;
        flex-direction: row-reverse;
        font-size: 1.5em;
        text-align: center;
        justify-content: flex-end;
      }

      .rating input {
        display: none;
      }

      .rating label {
        display: inline-block;
        padding-right: 8px;
        cursor: pointer;
      }

      .rating label :global(svg) {
        fill: #fff;
        stroke: #999999;
        transition: fill 0.12s ease-in, stroke 0.12s ease-in;
      }

      .rating input:checked ~ label :global(svg),
      .rating input:checked + label :global(svg) {
        fill: #f5a623;
        stroke: #f5a623;
      }

      .rating:not(.disabled)
        input:not(:checked)
        + label:hover
        ~ input
        + label
        :global(svg),
      .rating:not(.disabled) input:not(:checked) + label:hover :global(svg) {
        stroke: #222;
        fill: transparent;
      }
    `}</style>
  </div>
)

export default Stars
