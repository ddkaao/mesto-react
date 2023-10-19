import React from "react";

export default function Card({card, onCardClick}) {

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <div className="element">
            <button type="button" aria-label="Удалить" className="element__trash element__trash_disabled"></button>
            <img src={card.link} onClick={handleCardClick} alt="" className="element__image"></img>
            <div className="element__caption">
                <h2 className="element__name">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" aria-label="Лайкнуть" className="element__like"></button>
                    <p className="element__counter">{card.likes.length}</p>
                </div>
            </div>
        </div>    
    )
}