import { IPloomesContact } from '../apis/ploomes/interfaces';

export const ListContactsSerializer = (contact: IPloomesContact) => {
  return {
    id: contact.Id,
    name: contact.Name,
    email: contact.Email,
    cpf: contact.CPF,
    dataNascimento: contact.Birthday,
    avatarUrl: contact.AvatarUrl,
    createAt: contact.CreateDate,
    updateAt: contact.LastUpdateDate,
  };
};
