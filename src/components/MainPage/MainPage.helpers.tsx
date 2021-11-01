import {IPhotos, IUserCard, IUserData} from "../../types";

export const initialUserData = {
  id: 0,
  firstName: '',
  lastName: '',
  middleName: '',
  birthday: '',
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
    photos: [
      {
        content: '',
        format: '',
        // name: '',
        action: 'save' as 'save',
        number: '1',
        main: false

      },
      {
        content: '',
        format: '',
        // name: '',
        action:'save' as 'save',
        number: '2',
        main: false


      },
      {
        content: '',
        format: '',
        name: '',
        action: 'save' as 'save',
        number: '3',
        main: false


      },
      {
        content: '',
        format: '',
        name: '',
        action: 'save' as 'save',
        number: '4',
        main: false


      },
      {
        content: '',
        format: '',
        name: '',
        action: 'save' as 'save',
        number: '5',
        main: false


      }
    ]
  },
  match: false
}

export const initialUserFilter = {
  ageBy: '',
  ageTo: '',
  rating: '',
  commonTagsCount: ''
}

export const initialState = {
  account: initialUserData,
  changeAccountSetting: {
    newEmail: '',
    isValidPrevEmail: true, //null
    isValidNewEmail: null, //null
    // linkData: {
    //   id: null,
    //   token: '',
    //   linkId: null
    // }
    isConfirmNewEmail: null, //null
    isValidEmailPassLink: null,
    isChangePass: null
  },
  users: [],
  likeUsers: [],
  userFilters: initialUserFilter
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
  likeUsers.length > 0 && likeUsers.push(user);
  return likeUsers
}

export const giveNextUsers = (likeUsers: IUserData[]) => {
  likeUsers.length > 0 && likeUsers.shift();
  return likeUsers
}

export const setPhotoParamHelp = (photos: IPhotos[] | undefined, payload: { number: number, name: string, format: string }) => {
  photos?.push(
    {

      content: '',
      format: payload.format,
      // name: payload.name,
      action: 'save',
      main: payload?.number === 0,
      number: String(payload?.number + 1)

    }
  );
  return photos;
}