"use client"
import React, { useState } from 'react';
import CardForm from '@/components/Form';
import { useCardContext } from '@/components/CardContext';

const Modal = ({ cardToEdit, closeModal }) => {
  return (
    <dialog id="my_modal_3" className="modal ">
      <div className="modal-box ">
        <CardForm cardToEdit={cardToEdit} closeModal={closeModal}/>
      <p className="py-4">Press ESC key or click on ✕ button to close</p>
    </div>
    
    </dialog>
  );
};

export default Modal;
