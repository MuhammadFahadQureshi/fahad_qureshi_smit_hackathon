import { useCardContext } from "./CardContext";
import { useEffect, useState } from "react";

const CardForm = ({ cardToEdit, closeModal }) => {
  const { addCard, editCard } = useCardContext();
  const [name, setName] = useState('');
  const [Teacher, setTeacher] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // If editing, populate the fields with the current card data
  useEffect(() => {
    if (cardToEdit) {
      setName(cardToEdit.name);
      setTeacher(cardToEdit.Teacher);
      setStartDate(cardToEdit.startDate);
      setEndDate(cardToEdit.endDate);
      setImageFile(null); // Reset file input to handle new images if uploaded
    }
  }, [cardToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCard = {
      id: cardToEdit ? cardToEdit.id : Date.now(), // Keep ID for editing
      name,
      Teacher,
      startDate,
      endDate,
      imageURL: imageFile ? URL.createObjectURL(imageFile) : cardToEdit?.imageURL, // Use existing image if no new file
      enrolled: cardToEdit ? cardToEdit.enrolled : false, // Preserve enrolled state if editing
    };

    if (cardToEdit) {
      editCard(newCard); // Update existing card
    } else {
      addCard(newCard); // Add a new card
    }

    closeModal(); // Close modal after submission
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setTeacher('');
    setStartDate('');
    setEndDate('');
    setImageFile(null);
  };

  return (
    <>
      <form className="px-10" method="dialog" onSubmit={handleSubmit}>
        <input
          className="w-full input input-bordered mb-4"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course"
          required
        />
        <input
          className="input w-full input-bordered mb-4"
          type="text"
          value={Teacher}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="Teacher"
          required
        />
        <input
          className="input w-full input-bordered mb-4"
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
          required
        />
        <input
          className="input w-full input-bordered mb-4"
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
          required
        />
        <input
          className="input w-full input-bordered mb-4"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          placeholder="Upload Image"
        />
        <div>
          <button className="btn" type="submit">
            {cardToEdit ? 'Save Changes' : 'Add Card'}
          </button>
        </div>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
          ✕
        </button>
      </form>
    </>
  );
};

export default CardForm;
