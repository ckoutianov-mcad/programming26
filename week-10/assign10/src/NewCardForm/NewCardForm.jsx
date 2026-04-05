import { useForm } from "react-hook-form";
import "./NewCardForm.css";
export function NewCardForm(props) {
    const {addCardFn} = props;
     const { register, handleSubmit, formState: {errors} } = useForm();
    //reset cards
    const refreshPage = () => {
         window.location.reload();
       };

    return (
      <div className="form-wrapper">
        <h4> Add your own fragrance: </h4>
        <form onSubmit={handleSubmit(addCardFn)}>
          <div className="form-group">
            <label>Name</label>
            <input {...register("name", { required: true })} />
            {errors.name && <p className="error"> * Name is required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="image">Image </label>
            <input {...register("image", { required: true })} />
            {errors.image && <p className="error"> * An image is required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes </label>
            <textarea id="notes" {...register("notes", { required: true })} />
            {errors.notes && <p className="error"> * Notes entry required.</p>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <p className="error"> * Description is required.</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="isLayerable">Layerable? </label>
            <input
              id="isLayerable"
              type="checkbox"
              {...register("isLayerable", { required: true })}
            />
            {errors.isLayerable && (
              <p className="error"> * Selection is required.</p>
            )}
          </div>

          <button type="submit">Add Fragrance Card</button>
            <button className="resetButton" onClick={refreshPage}>
              Reset Cards 💫
            </button>
        </form>
      </div>
    );
}