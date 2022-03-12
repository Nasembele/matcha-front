import {ICurrentUserMessages, IMessage, INotification, IUserData} from "./types";

export const actionDataForPhoto = 'data:jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRgVFRUYGBgYGBgYEhgYGBEYGBIYGBgZGRgVGBgcIS4lHB4rHxgYJjgmKy8xNTU2GiQ7QDszPy40NTEBDAwMEA8QHxISHjQrISsxNDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDY0NDQ0NDQ0NDQxNDQ0ND80NDQ0NP/AABEIASsAqAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAQIDBAYABwj/xAA5EAACAQMDAgQEBAMIAwEAAAABAgADBBEFEiExQQZRYXETIoGRMkKhsVLB0RQjcoKi4fDxU2KSFf/EABoBAAMBAQEBAAAAAAAAAAAAAAIDBAEABQb/xAApEQADAAICAgMAAQMFAQAAAAAAAQIDERIhBDETQVEyImGBIzNCcaEF/9oADAMBAAIRAxEAPwD1SLEnRg84xpj4hE44jIjTHkRhE04YY0x5EidsTgiOs8hQZMjr1YylXmbC0ETwJVt+Wjalz8srWt2M9Ynmnk0BrsMTpAl0DJlYGPO0LGu4UZPSOLAcnoIGubk1n2L07+kj8nyvj1ErdP0jC+7h0yDxAgfYxhU4Rdo6CBKzfPCyNpS69/YaXZf/ALZgSrU1TEmFIEcmRtbpG8hq19ld9Z2zpI9mhHQTpvNh/wBH4bKLEiwyQ6cZ06ccNIjGkpla4fE44jqvKbvmKW3SOu+BBqg0ivVIHUys9wo7wNrGq7OAYM0y7arUA7dTE1kU+yyPGpxyfo1terhYKpPknmXb9wqH2gexBZpJivllbFRO9sumpUXkciEdL1fe2w9e84KFXmDKjLTDPjk9PQSnNn+KdgVS12gvqmos7CnT6nqZZo0xRTHc/iMxWla8iu2Tz0Bl/UtfBGAYnxsWt5re2/8AxGxgphupdA9+ID1C9APEB3Gu54Bg241HdzmHmrkuit+K5nbNK+sEDrIl1kk9ZjLjUD5ytT1Eg9Z0U9GxMOdnp9pf7u86ZDS9SzxmdG8gKxrZ7jFiRZQecdOnRC04452wIFvLjnAhC8rgCZulV3uT5TK6QyZ32FqfSVdRB2nElWpHOAwizk9M81vqTu5GDCuioKfvNI+lKTnEUaag5xJ7w8ix+VuOIA1Wu78KDiJYbk6iaI26CVqqp2mY/HmO9iVeukiBSXGW/CP1mc8SajwVU+kOa1dCmm1es8/1e5yeJP8A7ttv0gvGx/LXJ+kNsBkyXU3KiUtMf5oT1SnlJQvR6GuFGdNUxVrGV2HM4QdG1k5dMlqcyJqJ6ywiy6tMYE5Vo8/bmmiPSVORFlixOHnRuxib0fQ04mJK9epiVnnDnq4lOvd4kFavngSlWpkzHWgloq6vq4AxmUtMr5GfODdfTZzIdKu+Iqr29F0418e0ala8nS5gT+0xtS7wOs0T8ew496BKtbUR5zP1L0nvKlS79YLobPjhyrqHrF0995ZyflQfqekyNzqOO80O40bZAfxON7+Yz0H2kvk5eMPX2dnhRHXt9AHxHqXzHn2mUquWOTJr643uW7Z49pUzF41xlI9Hx8ax40vsvacMGFrt8pA1m+ISqPlY5Myp7AFRfmMno0d0hrn5pd02qMjMZK2iPJXGi3TtCBnEgqnBhx6ybZnruuMnmDw7FvVdi29TBzOlL4k6GafTDniCNQuNoMKVzxMj4hudolT9EcTyeialdDqY9rsTKtqGB1kSanzjMTsf8DHeJ624GZqzvCpxDeot8QGZmvTIMVf8i/Gko0aejfZHWR3N76zOLcsshq3hMx0csa9hh9RlOtqGYKaoTEUZg7HzKCelUjc10p9mYbv8I5b9AZovF2o43BT1+RfQd/0lPwdS+GK1ww/CmxD6ty36AfeAdYumd+e3P3klrnlS+kRZP9TOp+kUokQmIDH6L+RIrYltbn5ZQLSN3hSgLpJHXFTmV0uCDEqNK5MoldHlZ63QRbUGIxmQfEJldTCemWRqEccTKalbCwTWSuKLOl6c9ZgAJ09S8MaMtNA2OZ0Hi32WN48b462bdqm5czB+MHwJo7e6KMUbt+H1Ep6rpgrdZRNqpPMw0prbPNTckyP4jg5wZ6Rb+H6K/lEsnRKRH4R9oriVPPJg7WrkcyvfU1m1uvDa4+TiZTVdMennPIg0mMx3NPpmcrpiDmaXrpGEGtxFFe2kLmKr4kReLSUuyoOrMFHuTgfvN0LeVI3FBhTtKSnq5NRvZumf8oWYy4rb2ZvMk/TtNV4lqbAQvCogRMevyA/YTGZk+Cd7r9ZHgrdVT+2Slo3dGZjC0p4lFZCYvIWaNLxhaEp0JvNsXbmRMuDiXaOMSvXOTGJkld9i2tIuw/Wej+FdIBIOJkdEtRwT3nqfh2iEQGK3yo9jDj+Dx+T/AJM0FFAgAnSu9yBOjSHjT7ItVI3bl6iD7nWNiyvf6hjjtBddhUU4kWe6xZOS9P2LnFx1Vei5U1s9cwzpWobwCTPMbq4am20+cP6FqWSFzKseTkPzYZ47R6Qr5EpX9org5Emtegi3D4Eaeem0+jzXxBp3wyTMnc05v/FtQbZ5/XeIpaZ7GGnUdlGpxCPhunvuE4zs3Of8ill/1BfvEt9OeqQqAknyBP7TZaL4Za1V6rqQzLsUsR+ZgSQo6fhH3g2+MNkmd632Z3xJXLAIoJy2ehJ4H9SIDWxqnpTf/wCTPRNP0StVQ1ECkFm/Fwe3A9O30lun4fuh+RPq/T+szDOoWkKxOVPs8z//ADa3/jb7SGpaVF4KtPRr7TrpOqDHcgr/ADmXuchvmznvmN7Q3UtezMMCODxGTSV6aOMMOexEGXWmMvK/MP1hJiah/RR3RaIywHrI2lnTly06nqWzsU88kz/c1+hWe5h5CbtKwRQBMFp178OHqF7vGcxGOlo+h8nFVa/EGKlzmdA1S5xyTOjORL8L/Ctq9cjMj8OVjUOD7RdZpE5xIfCtNlq47GT+StyA4VYGENc0I1BlBzK/h3SHWoNwxjrN0y4HAklsgUbiADM8Sa136PM+euHFlxMKog6+ugAZFfaiF7zMarqmAeZc6Ax4nTAvii+3NgQfoOiPduB0Xnnzx1PsJWRGuawQdzyfIdzPU9HsltqfQBiAMfwgdF+n7kwEuT2V5L+OeK9ljSNKo2aYUZb8znqf6D0lTxZe/wByNvdipPkMcn9MfWVdQ1HrzAvie5It6a55YMx+4Yf6WivJf9Kn9ZDkhpbftml8NXgW2pr5gsfXezP+xELvfoi7mYADqTMJpd3tRVBztVVH0AH8pp9MQ1WAOCqYL55y3VVx6Dn6rHxpJJB1i4rbC64qLnnB8wR+kAa1olOoCcYPmPP+c0zwXfHgwhMN7PI7+2am5Q9jJdNCs+13K+uAR9eRLviDh+Rny6wEzHIxFP2ehMrWzSaj4PLjcpBOOqjB+q9x7TKUbR6NQq4wR9iPMHuJu9F1M00UMeg6nylXxG9GsN6MN6/jXGCCfzD0PcfWDf8AF6NwTrKm/p+wCGktK5ZOhlbMQtI1tM+kdJrss1rxm7zpTZ50LbFckj0y40rcOZWsNOKv8s0FSrk7RIK1daY46y6omvZ85Oe+LlfZZasEHPWB7/VMdDKV7f57zM6pqPBGZzanpHRg+2W9T1oDvM1c6g1Q9eJUrVCx5kun2/xHx2HJ9ewX6kgQG9jkuBtvAejnJquOmNvqxGQPoDn3Imk1Wqwz5e8I6VZCjRRPIfMfNjyx+8pajb7z1EYp0iF5OV7Zj7y5xkntE8WH+8ROgARBnAx8uw5+w+0OJpiVGKqpqHoQuNqn/wBmPA9uvpCj+FUrOXuNpJOcLk45zgsevOegHWJvHVUn9IPNU0kl9GDWilN/kL5BOFUhgw9xwJotK1ypSAVkAHVuuTnuZsrewpUl2oiqB0wB+/WUr+mjDlR9hGzPFezXlV9NElPUUqLuU/7SjdXAweYJr0aan5cj2JEDanfJSBOee3JJ/Wa3o6cSb6BviaqN4x65meVst9R9Y+8ujUYsfp/SMtnG9STgZ+kB9jm9dGgeqFTc3Hknt0zAYqZPuZPqlbLKM/l/nB+6DSHYq12W0ftHFpVWpyDJWaIqdM9CM25FZp0hZp03iLrJ2es19SQDgiZ7UdZAzzM7UruON0qNz1OY902Jjx5jtly51Vm6QZVctyZMuBGsRA0wnr6KphrTF2KjdC7bsnsqHC/rn7QQV3MFHUkAe5OJpLKxNzcCihwiDYT5KnBb6n94UpkuatLQe0m/r1X+VTVYdCzFadMeZAGM/rNDS0yo3Nw4bP5EyiD0J/E31P0li1ppQQIi4UfcnzJ7mQXN/wCscl+kG3T6QTSslNQqgKo6BQAB7CRVNUUTP178wfVvZzYycO/YfudV9YGu9T9YHvNSCjrM9eaq7dOBB5DpxKQxqOr7R6zM3N0ahyT/ALSN3J5PMrsYO9hN69DtxMeORiQq0mSaIqha75Vc9RkftiQbpYSnu3D2I9+mJUPE7R02TBpIKkgVpKtPIzAaX2UxdP8AicWnSMiLO4nc2F1qbpFUbEo0a+JJUq5mj/lVIVq0aXMiLRpadrYt3oJaGu64p8ZwwbHnt5/lNh4JdQlV/wAzPg+eAMj9SZi9Eq7ayt5ZI94Qo3LWtVwvQMRjoGXPH6QpehTXNG+uL6Crm97kwS+sKwznHp/KCbu9Z8+Xaa6MUaDFzqajvB1XU89P+4Hc7j3ktGiT3gBpi1nZzkmVHaXKlsw6SjUpsDyJyOqvwQGMaSLTPlFakfKFoQ2QCWKa5kaUSe0tCkR0+s4Wx9PCn95QuVwxlteJVuTkzl7M9EIMv2xyv1MHGELbhR9f3g5fRV4j/r/wR1VnR9SdAT6HXPZRJj1Jmy03wW7jLR1/4WekMhc/SMp9ehOLByrTpIx+0y/o+jvdVNqlUUDNSo2QlJeeWPrjAHf7yw9vjjGIe025S1tn3plqg3ICeGPIVT5cAke8RWVr0uyjN4nBbbNBpvg3TU+EzVXZiw2/PTK1ORjKbD8pIxj1j/GHhSip+IuUUDnDoFz5fMCSfQTzqpWcncCVPHGT8voIWqai9dF31XP5SpY7d/XOO5I7/SBxyN+xCw1D2t6/uA6wO8heQDjsP2ki0eOuJzKUdh9YuZSloJsetIeYkylRKwaMZpugHRaasB3lZ7wdhmV7huJWDTdAUwgt4p6iOauILcxUcjiboW2EGuPSRm4Mrl5Gz9pugdklSpIGOTEzOmHdDVXnEvpwAPSVEHzSfdAtb6HeP/S2x7GJEUEnE6BxKOZ9C0LcCTPRQjBAMqm5AjWvlEpPPSpsG6vpFsqM7oMAZPrMItm12HrH5aasVoqOhKjBI9AOPfPlDPjjVWfZb0z8zkD3LHAz6DrOuqyW9FaSn5UXaOnPmx9SST9ZK5VU6fpdIrwO6pJvejE16W0keUh2EAkdO/lJrmruYmRfEIGPOK9M9qtNdjDXzgN+Jeh/iXuD6/0i1V2nH/DOWmr5UnB/Kf5H0kD1Dt2MOV/Ce4/qJTFbR5OaXNf2JGb0kLv6GclyOh6x7sCIRM6KdV8yEmTuoMgaboBsaTEzOJiZmi2yRnjRGEzgZxmyYsI0tI8xRN0cqJlMnpUWboM+fkPUnoJDTWXabcY7eXaJp6LcGPl7JaFtt53ZPkOn3M6T0EyQOk6I5M9ePGjj6PTby9KEqeCOoMGVNRJIAPJP2Hc/QZmluLW31GiCj84/u3Q/Mp/hIPUean9Jiq2iVrNqj1TuUJim45V9xwT/AOp2gjB/i79Ybzbnr2eTjyY+L5dUvpgZr8G4aq35MhP8TDGftn7iRanqAqdJQfnJ8ySfrK7TO0tFeCVEJ/b7HM0YXjCZGTNUm3lJ90jqtmIGnbSegmytMVdckNVkfhjtPn2P9IjIV/N+sa9sRyYxljuiCpr7RznPlITFIjDCSFV0LmJmJOnAbFJiTsTsTQezo5BExHLMDldk6S9QSUqQhezpFugJ9hJ8jPY8OU3tl/TrNnZVA6nE6a3wbp7A72GQDwPI+c6ZOPoqzef8dcZ9GO0zVKts2+m20/mB5Vh5Mvf9/LE9L0nXkuqCCsigVAy7GIIfaSDtz188dftPIHeaLVam20oIP4FP1JLH9TAtb1r2ef5sS9PXf6FfEfgtkBq2uXTqaecunop/MPTr7zLaZplS5qCjTTLnrngIAcEv5AEgeeSB1IE0fhPxNcZ2MrOi9agDllwpO1iB85IHHf3m9sWoVf76mUDupBdcfNlSvLDncASBnkZMKXxeqJ35GSJ4vv8AGedVvCNGmqu13vVwxT4VPdvKqzFVLMBjCN8x8uky9a0+bap3HuADlee/n7za65oTLQprUyaiK1PYGyoRXZ/jIxUE9Rn6eRy3TrWl8FTU1CuFU/gVgpU8gjdgnHJ7zquU/Zk5nrb7IfD/AIHephq3yjy5zNpaeHLekBtpqx7lsH68yhaeIbW3QIK7ui/h3tvfH8IbaOPfz69BHp4vt2PG8jH4gufp1jJyzremLyZrfXpGP8eW5VwSAA2dgAACqOgHr3PuJjagnq2q31hc4+MGfGcbSyMufMKR+sHWHhKjXfciMlMfxFiW+5M6b5PpMbOROe1/k89oWD1D8qk+whm28IV3Gdh+s9jsNFo0QAqDj0lxlA7R2hfySn0t/wDZ42PBtTGcQZc6O1P8S4ns9amB0gu+sUqAgrAqPxlmLLH/AClaPIzZjykT2Gek12raOaZJXpAhES3Uv2egvFw5J2kAatsy9RGCaB0zKbWi7h5Z59oc5fpkWf8A+c57hlW3XM2Ph+iQoHcnMG2mmAMMHI9B2mt0pUTp1/5zN47YM1wnj9mg08imgXp3PvOlL42OuJ0aBw32eUNDN/dgrT7hVAI9oGeKtfAweZKltjvJnkui9aaw9EOtPADkMQegIBGR68jn0Es6V4mrUGyoU7sZGCATnqQDgnr1556wIq5PEM6TpTVKgVcdMknooHeM4r89ksRvqvR6jYajSvaQWrTK5HIcHBz3R/8Ao+kyOueDbi2b4lqwqUxyaTqrlRjkYYYcfrCn9lRMF3LkDCjoq+yiXrDX9h2Ocr2PUr7+YmPG57RPeNy9z6/DG0vFFBPxWdMsOo2U1AI7EFcxKvimtVytK0p9eMU9+36YxNlqfhi2vSaikK/Xcp4f/F/WARpFWg2xdy88jghh5j/aFNbGTUP67HeHtKqV3D1+SOwVFA9NqACegUEVAABiDbCiKaAd+8me4jUtA1un16CDVJWepKjXMhe4nGziLL1JWqvIHuJUrXM7ZRGJkd6oYHMw+oU9rnE1dxczLalUBfiIyNHq+JLnopGJtz7xSYivg5k++yy/Rb0692HDQuNVRDjvKTWq1VBXhsQZeWrgYYcjoZRFNHm5omu17NbT1BX5BnTB0bpkPBiw+QjU/owmOpUw3WIyyPkQUjbYatqaL1hzRay097jq3A9piC7ecOpX2InqghroTK5bDN5qGMkmBLnU3bgcDt5yC4uC3WVHadsxpIMaL4irWr7lO5T+NCThvbyM39rqouyrgEKB3658p5TbjcwHXM9J0pRTpAek5St7E1MvvXYYqV5XevKFSvIjcQ2x2PF0X2qyF68qGvKte5xBdFMYi5VuJSq3EF3OpAdOYPq3rGKrIiuMDL1/e9gYHZpzNmMJiKrkVTKlaRxMYTFYxhMxICqCml18cQ4qrUUqR7TI0qpU5mhsbjODHwyLMvtGX1i2NNyJ0PeJqIZQ3eJGdHn3LbAjrISIRubN1PSUmQjtC4tB1RXYQvUOadP/AAY+0EsD5QjbHdSx3Qn7HmdoGK1RAxleo+JM5lWrOBughogy+fLE3dO5ygmJ0BeGMItqLIMCc3ofixO0g89aRF4AXU3jWvnMS8iL4wMPPchRyYGvL0ucDpKj1GbqYzMVWTfopjGp7Z2YhM4mITFhtnZjSYhMaTC0LdHExpMQmNJhJCKodmXNPuSrYlANHo2CDGShN1tB/VDupzpWrV808ek6GTmgubfPaCbiz9Jq66DylGqg8pe5TJ09mSq2fpGUaRRvQ8H2mjqUx5Ss1MeUByDrvZnbqltP7SjWWaDUkGOkBVYlrTMsNaDRPwXftnA9T3/56yu5movaQp29IINo+EpwPNgrE/ck/WZWp1i29rZd4j62cEkqKO8iSTRXFHoyyf4anpIatvjpGzt585zlG7aK5jCZNUkBi2tGUxCY0mKYwzkIps4tGExY2HoTTOk6LxIBJ16Q5QDJC/GJ0jadDFNn/9k=';

export const regexForPassword = new RegExp(/(?=.*[0-9])(?=.*[!;$%&])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!;$%&]{8,}/g);
// export const regexForLogin = new RegExp(/^[0-9A-Za-z@\.-]+$/);
export const regexForEmail = new RegExp(/^[А-Яа-яёЁ()0-9A-Za-z@\.-]+$/);

export const forbiddenForAuthPassword = new RegExp(/[А-Яа-яёЁ()'"<>=+]/u);
// export const russianLetter = new RegExp(/^[A-Яа-я-() ]/g);
export const russianLetter = new RegExp(/[А-Яа-яёЁ()-]/u);
export const englishLetter = new RegExp(/[A-Za-z]/);
export const forbiddenForLocation = new RegExp(/^[$%@#/^&*!?.0-9А-Яа-яёЁ()'"<>=+]$/u);
export const forbiddenForText = new RegExp(/[0-9A-Za-z@'"<>=+?\/]/u);


export const getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}


export const prepareDateToSendServer = (date: string) => {
  const parsedDate = date.split('-');
  return `${parsedDate[2]}.${parsedDate[1]}.${parsedDate[0]}`;
}

export const addNewFirstPack = (arr: ICurrentUserMessages[], newEl: {
                                  messages: {
                                    chatId: number,
                                    messageAnswer: IMessage[]
                                  }
                                }
) => {
  const messagesWithId = {
    messages: {
      chatId: newEl.messages.chatId,
      messageAnswer: newEl.messages.messageAnswer.reverse()
    },
    oldestMessagesId: newEl.messages.messageAnswer[0]?.id,
    freshMessagesId: newEl.messages.messageAnswer[newEl.messages.messageAnswer.length - 1]?.id
  }

  // const ind = arr.findIndex((el) => el.messages.chatId === newEl.messages.chatId);
  // if (ind !== -1) {
  //     arr.splice(ind, 1);
  // }
  //     arr.push(messagesWithId);
  return arr;
}

export const addElemInArray = (elem: any, array: any) => {
  array.push(elem);
  return array;
}

export const closeNotificationAboutMessage = (messageId: number, array: any) => {
  const ind = array.findIndex((el: any) => el.messageId === messageId);
  array[ind].isShow = false;
  return array;
}

export const prepareNotificationForSave = (notification: any): INotification | undefined => {
  if (notification.transportMessage?.messageNotification) {
    return {
      action: 'NEW_MESSAGE',
      fromUsr: notification.transportMessage?.messageNotification.senderId,
      messageId: notification.transportMessage?.messageNotification.messageId,
      chatId: notification.transportMessage?.chatId,
      isPrepareForShow: false,
      isCanShow: true
    }
  } else if (notification.likeAction) {
    return {
      action: notification.likeAction?.action,
      fromUsr: notification.likeAction?.fromUsr,
      isPrepareForShow: false,
      isCanShow: true
    }
  }
}

export const setUserFiInLastNotificationHelp = (notifications: INotification[], user: {firstName: string, lastName: string}) => {
  notifications[notifications.length - 1].fromUsrFI = `${user.firstName} ${user.lastName}`;
  notifications[notifications.length - 1].isPrepareForShow = true;
  return notifications;
}

export const getNotificationTitleByAction = (action: string) => {
 switch (action) {
   case 'NEW_MESSAGE':
     return 'Новое сообщение';
   case 'VISIT':
     return 'Новый визит';
   case 'LIKE':
     return 'Новый лайк';
   case 'MATCH':
     return 'Новый матч';
   case 'TAKE_LIKE':
     return 'Забрали лайк';
 }
}

export const getDescriptionByAction = (action: string, fromFI?: string, title?: string) => {
  let description;
  switch (action) {
    case 'NEW_MESSAGE':
      description = 'прислал(а) сообщение';
      break;
    case 'VISIT':
      description = 'просматривал(а) Ваш профиль';
      break;
    case 'LIKE':
      description = 'поставил(а) Вам лайк';
      break;
    case 'MATCH':
      description = 'поставил(а) Вам лайк в ответ, у вас матч';
      break;
    case 'TAKE_LIKE':
      description = 'забрал(а) свой лайк';
      break;
  }
  return `${fromFI || ''} ${description}`
}

export const setIsShowFalseInLastNotification = (notifications: INotification[]) => {
  notifications[notifications.length - 1].isCanShow = false;
  return notifications;
}

export const addNewElemInArray = (users: IUserData[], user: IUserData, isLikeHistory: boolean) => {
  if (users[0]?.isUserFromLikeHistory || users[0]?.isUserFromVisitHistory) {
    users = users.slice(1);
  }
  users.unshift({
    ...user,
    isUserFromLikeHistory: isLikeHistory,
    isUserFromVisitHistory: !isLikeHistory
  });
  return users;
}

export const parseDate = (date: string) => {
  const arr = date.split('.');
  return `${arr[2]}-${arr[1]}-${arr[0]}`
}