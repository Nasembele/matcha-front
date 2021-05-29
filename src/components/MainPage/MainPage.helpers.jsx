export const initialState = {
    account: {
        rating: 'Cамый красивый',
        education: '',
        workPlace: '',
        position: '',
        biography: '',
        tags: [],
    },
    users: {
        us: []
    },
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

export const getArrayWithNewEl = (mass, newEl) => {
    if (mass.length > 0) {
        if (mass.includes(newEl)) {
            return mass;
        }
    }
    mass.push(newEl);
    return mass;
}

export const setLikeUser = (likeUsers, user) => {
    likeUsers.push(user);
    return likeUsers
}

export const giveNextUsers = (likeUsers) => {
    likeUsers.shift();
    return likeUsers
}