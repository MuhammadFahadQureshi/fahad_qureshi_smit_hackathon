"use client"
import React, { useState } from 'react';
import Modal from './modal';
import { useCardContext } from '@/components/CardContext';

const Cources = () => {
  const { cards, removeCard } = useCardContext();
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
    document.getElementById('my_modal_3').showModal();
  };

  const closeModal = () => {
    setSelectedCard(null);
    document.getElementById('my_modal_3').close();
  };

  return (
    <div className="overflow-x-auto lg:px-20 mt-6">
      <div className="flex items-center gap-6 my-6">
        <h1 className="text-4xl text-black">Courses</h1>
        <button className="btn btn-active" onClick={() => openModal(null)}>
          Add Course
        </button>
        <Modal cardToEdit={selectedCard} closeModal={closeModal} />
      </div>
      <table className="table text-black lg:table-lg table-xs">
        <thead>
          <tr className="text-black">
            <th></th>
            <th>Course</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, ind) => (
            <tr key={card.id}>
              <th>{ind + 1}</th>
              <td>
                <div className="flex lg:flex-row lg:items-center items-start flex-col gap-3">
                  <div className="avatar">
                    <div className="mask h-20 w-28">
                      <img src={card.imageURL} alt="Course Image" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{card.name}</div>
                    <div className="text-sm opacity-80">{card.Teacher}</div>
                  </div>
                </div>
              </td>
              <td>{card.startDate}</td>
              <td>{card.endDate}</td>
              <td>
                <button className="btn btn-active" onClick={() => openModal(card)}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeCard(card.id);
                  }}
                  className="btn btn-active btn-neutral"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cources;
