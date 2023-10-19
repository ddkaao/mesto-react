import React from "react";
import Card from "./Card.js";
import api from "../utils/Api.js";

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

    const [userName, setName] = React.useState('');
    const [userDescription, setDescription] = React.useState('');
    const [userAvatar, setAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.getProfileInformation(), 
            api.getAllCards()])
            .then(([profileInformation, initialCard]) => {
                setName(profileInformation.name);
                setDescription(profileInformation.about);
                setAvatar(profileInformation.avatar);
                setCards(initialCard);
            })
            .catch((err) => {
                console.log(err); 
            });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__content">
                    <button type="button" aria-label="Редактировать" className="profile__avatar-btn" onClick={onEditAvatar}></button>
                    <img src={userAvatar} alt="Аватар" className="profile__avatar"></img>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{userName}</h1>
                            <p className="profile__description">{userDescription}</p>
                        </div>
                        <button type="button" aria-label="Редактировать" className="profile__edit-btn" onClick={onEditProfile}></button>
                    </div>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-btn" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                    {cards.map((item) => {
                        return (
                            <Card card={item} key={item._id} onCardClick={onCardClick}></Card>
                        )
                    })}       
            </section>
        </main>
    )
}