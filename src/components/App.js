import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import '../pages/index.css';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

    const [currentUser, setCurrentUser] = React.useState({
        "name": '',
        "about": '',
        "avatar": '',
        "_id": '',
        "cohort": ''
      });
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setEditPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    
    React.useEffect(() => {
        Promise.all([
        api.getAllCards(),
        api.getProfileInformation()])
            .then(([initialCard, res]) => {
                setCards(initialCard);
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err); 
            });
    }, []);

    function handleUpdateUser(userInfo) {
        api.changeProfileInformation(userInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleUpdateAvatar(avatar) {
        api.changeAvatar(avatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleAddPlaceSubmit(place) {
        api.addNewCard(place)
            .then((newPlace) => {
                setCards((cards) => [newPlace, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
            .catch((err) => {
                console.log(err); 
            });
    }

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
    <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
            <div className="page">
                <Header />
                <Main cards={cards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
            </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
