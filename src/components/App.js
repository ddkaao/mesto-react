import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import '../pages/index.css';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    

    function handleEditAvatarClick() {
        setAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setAvatarPopupOpen(false);
        setEditPopupOpen(false);
        setAddPopupOpen(false);
        setSelectedCard(null);
    }

  return (
    <div className="container">
        <div className="page">
            <Header />
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
            <Footer />
            <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input name="avatar" type="url" placeholder="Ссылка на картинку" className="form__text form__text_type_avatar" id="avatar-input" required></input>
                <span className="form__input-error avatar-input-error"></span>
            </PopupWithForm>

            <PopupWithForm title='Редактировать профиль' name='edit' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input name="name" type="text" placeholder="Имя" className="form__text form__text_type_name" id="name-input" required minLength="2" maxLength="40"></input>
                <span className="form__input-error name-input-error"></span>
                <input name="description" type="text" placeholder="О себе" className="form__text form__text_type_about" id="about-input" required minLength="2" maxLength="200"></input>
                <span className="form__input-error about-input-error"></span>
            </PopupWithForm>

            <PopupWithForm title='Новое место' name='add' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input name="name" type="text" placeholder="Название" className="form__text form__text_type_label" id="label-input" required minLength="2" maxLength="30"></input>
                <span className="form__input-error label-input-error"></span>
                <input name="link" type="url" placeholder="Ссылка на картинку" className="form__text form__text_type_link" id="link-input" required></input>
                <span className="form__input-error link-input-error"></span>
            </PopupWithForm>

            <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        </div>
    </div>
  );
}

export default App;
