import {IUserCard, IUserData} from "../../types";

export const initialUserData = {
    id: 0,
    firstName: '',
    lastName: '',
    middleName: '',
    yearsOld: 0,
    location: '',
    card: {
        biography: '',
        workPlace: '',
        position: '',
        education: '',
        rating: 0,
        gender: null,
        sexualPreference: null,
        tags: [],
    },
    match: false,
}

export const initialState = {
    account: initialUserData,
    users: [],
    likeUsers: [],
};

export const tagsArray = ['Настольные игры', 'Геймер(ша)', 'Скалолазание', 'Бег', 'Блогинг',
    'Танцы', 'Караоке', 'Спортсмен(ка)', 'Сериалы', 'Волонтерство',
    'Мода', 'Йога', 'Тусовки', 'Растительное питание', 'Гольф',
    'Музей', 'Пропустить стаканчик', 'Клубы', 'Астрология', 'Тренировки',
    'Фотография', 'Занятия на свежем воздухе', 'Фильмы', 'Чай', 'Музыка',
    'Вино', 'Ходьба', 'Гурман(ка)', 'Футбол', 'Самодельничество',
    'Покупки', 'Поэзия', 'Бранч', 'Рыбалка', 'Выпечка',
    'Instagram', 'Языковой обмен', 'Садоводство', 'Видеоблогинг', 'Комедия',
    'Велоспорт', 'Крафотовое пиво', 'Пеший туризм', 'Netflix'];

export const getArrayWithNewEl = (mass: any, newEl: any) => {
    if (mass.length > 0) {
        if (mass.includes(newEl)) {
            return mass;
        }
    }
    mass.push(newEl);
    return mass;
}

export const setLikeUser = (likeUsers: IUserData[], user: IUserData) => {
    likeUsers.push(user);
    return likeUsers
}

export const giveNextUsers = (likeUsers: IUserData[]) => {
    likeUsers.shift();
    return likeUsers
}