import React from "react";

export default function PopupWithForm({title, name, children, isOpen, onClose}) {

    const popupOpened = isOpen ? 'popup_opened' : '';

    return (
        <div className={`popup popup_type-${name} ${popupOpened}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-btn" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}`} className="form form_type-profile" noValidate>
                    {children}
                </form>
            </div>
        </div>
    )
}