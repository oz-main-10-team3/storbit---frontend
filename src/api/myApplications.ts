import { api } from './mainApi';

export const cancelApplication = async (studyId: number) => {
  const response = await api.delete(`/api/v1/my/studies/applied/${studyId}`);
  return response.data;
};
